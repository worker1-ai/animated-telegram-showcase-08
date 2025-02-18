
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phone, LogOut, History } from "lucide-react";

type PhoneNumber = {
  id: string;
  phone_number: string;
  name: string | null;
  status: "answered" | "no_answer" | "rejected" | null;
  assigned_to: string | null;
};

type CallHistory = {
  phone_number: string;
  name: string | null;
  status: "answered" | "no_answer" | "rejected";
  called_at: string;
};

const Dashboard = () => {
  const [currentNumber, setCurrentNumber] = useState<PhoneNumber | null>(null);
  const [callHistory, setCallHistory] = useState<CallHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/auth");
          return;
        }

        setUserId(session.user.id);

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profile) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{ id: session.user.id }]);

          if (insertError) throw insertError;
        } else {
          setIsAdmin(profile.is_admin || false);
        }

        // Fetch initial phone number and history
        await fetchNextNumber(session.user.id);
        await fetchCallHistory(session.user.id);
        
        // Subscribe to realtime updates
        setupRealtimeSubscription(session.user.id);
      } catch (error: any) {
        console.error('Dashboard initialization error:', error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();

    return () => {
      supabase.removeAllChannels();
    };
  }, [navigate]);

  const setupRealtimeSubscription = (userId: string) => {
    const channel = supabase
      .channel('phone_numbers_channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'phone_numbers',
        },
        async (payload) => {
          if (payload.new.assigned_to === userId) {
            await fetchNextNumber(userId);
          }
        }
      )
      .subscribe();
  };

  const fetchNextNumber = async (userId: string) => {
    try {
      // Get a random unassigned number
      const { data, error } = await supabase
        .from("phone_numbers")
        .select("id, phone_number, name, status, assigned_to")
        .is("status", null)
        .is("assigned_to", null)
        .limit(1)
        .order('RANDOM()');

      if (error) throw error;

      if (data && data.length > 0) {
        // Assign the number to the current operator
        const { error: updateError } = await supabase
          .from("phone_numbers")
          .update({ assigned_to: userId })
          .eq("id", data[0].id);

        if (updateError) throw updateError;

        setCurrentNumber(data[0]);
      } else {
        setCurrentNumber(null);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchCallHistory = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("phone_numbers")
        .select("phone_number, name, status, called_at")
        .eq("assigned_to", userId)
        .not("status", "is", null)
        .order("called_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setCallHistory(data as CallHistory[]);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const updateStatus = async (id: string, status: PhoneNumber["status"]) => {
    if (!userId || !currentNumber) return;

    try {
      const { error } = await supabase
        .from("phone_numbers")
        .update({ 
          status,
          called_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        description: "Call status updated successfully",
      });

      // Fetch next number and update history
      await fetchNextNumber(userId);
      await fetchCallHistory(userId);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg mb-2">Loading...</div>
          <div className="text-sm text-gray-500">Please wait while we fetch your data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Call Dashboard</h1>
          <div className="flex gap-2">
            {isAdmin && (
              <Button variant="outline" onClick={() => navigate("/admin")}>
                Admin Panel
              </Button>
            )}
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {currentNumber ? (
            <Card className="p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{currentNumber.name || "Unknown"}</h2>
                  <div className="flex items-center justify-center gap-2 text-gray-500 mt-2">
                    <Phone className="w-4 h-4" />
                    <span>{currentNumber.phone_number}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button 
                    variant="default"
                    onClick={() => handleCall(currentNumber.phone_number)}
                  >
                    Call Now
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-green-100"
                    onClick={() => updateStatus(currentNumber.id, "answered")}
                  >
                    ✅ Answered
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-red-100"
                    onClick={() => updateStatus(currentNumber.id, "no_answer")}
                  >
                    ❌ No Answer
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-red-100"
                    onClick={() => updateStatus(currentNumber.id, "rejected")}
                  >
                    ❌ Rejected
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">No Numbers Available</h2>
              <p className="text-gray-500">There are no phone numbers to call at the moment.</p>
            </Card>
          )}

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Call History</h2>
            </div>
            <div className="space-y-4">
              {callHistory.length === 0 ? (
                <p className="text-center text-gray-500">No call history available</p>
              ) : (
                callHistory.map((call, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{call.name || "Unknown"}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="w-4 h-4" />
                        <span>{call.phone_number}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        call.status === "answered" 
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {call.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(call.called_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

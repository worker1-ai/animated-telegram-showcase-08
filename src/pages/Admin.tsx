import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, User } from "lucide-react";

type PhoneNumber = {
  id: string;
  phone_number: string;
  status: "answered" | "no_answer" | "rejected" | null;
  called_at: string | null;
  notes: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
};

const Admin = () => {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdmin();
    fetchPhoneNumbers();
  }, []);

  const checkAdmin = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", session.user.id)
      .maybeSingle();

    if (!profile) {
      const { error: createError } = await supabase
        .from("profiles")
        .insert([{ id: session.user.id, is_admin: false }]);

      if (createError) {
        console.error("Error creating profile:", createError);
        navigate("/dashboard");
        return;
      }
    }

    if (!profile?.is_admin) {
      navigate("/dashboard");
      return;
    }

    setIsAdmin(true);
  };

  const fetchPhoneNumbers = async () => {
    try {
      const { data, error } = await supabase
        .from("phone_numbers")
        .select("*")
        .order("created_at");

      if (error) throw error;

      const formattedData: PhoneNumber[] = (data || []).map(item => ({
        id: item.id,
        phone_number: item.phone_number,
        status: item.status,
        called_at: item.called_at,
        notes: item.notes,
        assigned_to: item.assigned_to,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));

      setPhoneNumbers(formattedData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVcfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    if (!file.name.toLowerCase().endsWith('.vcf')) {
      toast({
        title: "Error",
        description: "Please upload a .vcf file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^\x00-\x7F]/g, '').replace(/\s+/g, '_');
      const fileName = `${timestamp}-${sanitizedName}`;

      const { error: uploadError } = await supabase.storage
        .from('vcf_files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const text = await file.text();
      
      const contacts = new Map<string, string>();
      const vcfEntries = text.split("BEGIN:VCARD");
      
      for (const entry of vcfEntries) {
        if (!entry.trim()) continue;
        
        const phoneMatch = entry.match(/TEL[^:]*:([\+\d\s-]+)/);
        
        if (phoneMatch) {
          const phone = phoneMatch[1].replace(/[\s-()]/g, '');
          contacts.set(phone, phone);
        }
      }

      if (contacts.size > 0) {
        const now = new Date().toISOString();
        const contactsToInsert = Array.from(contacts).map(([phone]) => ({
          phone_number: phone,
          status: null,
          called_at: null,
          notes: null,
          assigned_to: null,
          created_at: now,
          updated_at: now
        }));

        const { error: insertError } = await supabase
          .from('phone_numbers')
          .insert(contactsToInsert);

        if (insertError) throw insertError;

        toast({
          description: `Successfully imported ${contacts.size} contacts`,
        });

        fetchPhoneNumbers();
      } else {
        toast({
          title: "Warning",
          description: "No contacts found in the VCF file",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const addPhoneNumber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNumber.trim()) return;

    try {
      const newContact = {
        phone_number: newNumber.trim(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from("phone_numbers")
        .insert([newContact]);

      if (error) throw error;

      toast({
        description: "Contact added successfully",
      });
      
      setNewNumber("");
      setNewName("");
      fetchPhoneNumbers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deletePhoneNumber = async (id: string) => {
    try {
      const { error } = await supabase
        .from("phone_numbers")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setPhoneNumbers(phoneNumbers.filter(phone => phone.id !== id));
      toast({
        description: "Contact deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading || !isAdmin) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Go to Operator Dashboard
          </Button>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Import Contacts</h2>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200">
                <Input
                  type="file"
                  accept=".vcf"
                  onChange={handleVcfUpload}
                  disabled={uploading}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Upload a VCF file to import contacts with names and phone numbers
                </p>
              </div>
              {uploading && <div className="text-sm text-gray-500">Uploading...</div>}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Add Single Contact</h2>
            <form onSubmit={addPhoneNumber} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Contact name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mb-2"
                />
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">Add Contact</Button>
            </form>
          </Card>

          <div className="grid gap-4">
            {phoneNumbers.slice(0, 10).map((phone) => (
              <Card key={phone.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium">{phone.phone_number}</p>
                      <p className="text-sm text-gray-500">{phone.phone_number}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {phone.status && (
                        <span className={`px-2 py-1 rounded ${
                          phone.status === 'answered' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {phone.status}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => deletePhoneNumber(phone.id)}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {phoneNumbers.length > 10 && (
              <div className="text-center text-gray-500 p-4">
                Showing 10 of {phoneNumbers.length} contacts
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

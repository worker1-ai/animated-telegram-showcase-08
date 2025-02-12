
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideProps {
  children: ReactNode;
  active: boolean;
  className?: string;
}

export const Slide = ({ children, active, className }: SlideProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-full transition-opacity duration-500",
        active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
};

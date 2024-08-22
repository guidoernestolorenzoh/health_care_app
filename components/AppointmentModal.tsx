"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import AppointmentForm from "./forms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";

const AppointmentModal = ({ 
    type, 
    patientId,  
    userId, 
    appointment, 
}: { type: "schedule" | "cancel", 
    patientId: string, 
    userId: string, 
    appointment?: Appointment, 
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-between">
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className={`capitalize ${type === "schedule" ? "text-green-500" : 'text-red-500'} `}
          >
            {type}
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="space-y-5 mb-4">
          <DialogTitle className="capitalize">
            {type} Appointment
          </DialogTitle>
          <DialogDescription className="text-xs">
            Please fill in the following details to {type} an appointment.
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm 
            type={type} 
            userId={userId} 
            patientId={patientId} 
            appointment={appointment} 
            setOpen={setOpen}
        />

        <DialogFooter>
          <Button type="submit" className="shad-primary-btn mx-auto w-full">
            Schedule appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;

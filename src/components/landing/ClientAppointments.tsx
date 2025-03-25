
import React, { useState } from 'react';
import { useCrm } from '@/context/CrmContext';
import AppointmentsSection from './appointments/AppointmentsSection';
import CancelAppointmentDialog from './appointments/CancelAppointmentDialog';
import AppointmentNotesDialog from './appointments/AppointmentNotesDialog';

interface ClientAppointmentsProps {
  clientId: string;
}

const ClientAppointments: React.FC<ClientAppointmentsProps> = ({ clientId }) => {
  const { getClient, getClientAppointments, updateAppointment, deleteAppointment } = useCrm();
  const client = getClient(clientId);
  const appointments = getClientAppointments(clientId);
  
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null);
  
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [appointmentToAddNotes, setAppointmentToAddNotes] = useState<string | null>(null);
  const [appointmentNotes, setAppointmentNotes] = useState('');

  // Handle appointment cancellation
  const handleCancelAppointment = () => {
    if (appointmentToCancel) {
      deleteAppointment(appointmentToCancel);
      setAppointmentToCancel(null);
      setShowCancelDialog(false);
    }
  };

  // Handle notes submission
  const handleSubmitNotes = () => {
    if (appointmentToAddNotes) {
      const appointment = appointments.find(a => a.id === appointmentToAddNotes);
      
      if (appointment) {
        updateAppointment({
          ...appointment,
          notes: appointmentNotes
        });
        
        setAppointmentToAddNotes(null);
        setAppointmentNotes('');
        setShowNotesDialog(false);
      }
    }
  };

  // Open cancel dialog
  const openCancelDialog = (appointmentId: string) => {
    setAppointmentToCancel(appointmentId);
    setShowCancelDialog(true);
  };

  // Open notes dialog
  const openNotesDialog = (appointmentId: string) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (appointment) {
      setAppointmentToAddNotes(appointmentId);
      setAppointmentNotes(appointment.notes || '');
      setShowNotesDialog(true);
    }
  };

  // Group appointments by upcoming/past
  const upcomingAppointments = appointments.filter(a => a.date > new Date());
  const pastAppointments = appointments.filter(a => a.date <= new Date());

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">I tuoi appuntamenti</h2>
      
      {/* Upcoming appointments */}
      <AppointmentsSection 
        title="Appuntamenti futuri"
        appointments={upcomingAppointments}
        emptyMessage="Non hai appuntamenti futuri"
        onCancelClick={openCancelDialog}
        onNotesClick={openNotesDialog}
      />
      
      {/* Past appointments */}
      {pastAppointments.length > 0 && (
        <AppointmentsSection 
          title="Appuntamenti passati"
          appointments={pastAppointments}
          isPast={true}
        />
      )}
      
      {/* Cancel dialog */}
      <CancelAppointmentDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        onConfirm={handleCancelAppointment}
      />
      
      {/* Notes dialog */}
      <AppointmentNotesDialog
        open={showNotesDialog}
        onOpenChange={setShowNotesDialog}
        notes={appointmentNotes}
        onNotesChange={setAppointmentNotes}
        onSave={handleSubmitNotes}
      />
    </div>
  );
};

export default ClientAppointments;

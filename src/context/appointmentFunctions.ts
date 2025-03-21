
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Appointment } from './types';

// Appointment functions
export const createAppointmentFunctions = (
  appointments: Appointment[],
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>,
  getClient: (id: string) => any
) => {
  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString()
    };
    setAppointments([...appointments, newAppointment]);
    toast.success('Appuntamento aggiunto con successo');
  };

  const updateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === updatedAppointment.id ? updatedAppointment : appointment
    ));
    toast.success('Appuntamento aggiornato con successo');
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
    toast.success('Appuntamento eliminato con successo');
  };

  const getClientAppointments = (clientId: string) => {
    return appointments.filter(appointment => appointment.clientId === clientId)
      .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date, most recent first
  };

  // WhatsApp integration
  const sendWhatsAppReminder = (clientId: string, appointmentId: string) => {
    const client = getClient(clientId);
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (!client || !appointment) {
      toast.error('Impossibile inviare il promemoria: dati non trovati');
      return;
    }
    
    const formattedDate = format(appointment.date, "d MMMM yyyy 'alle' HH:mm");
    const message = `Gentile ${client.firstName} ${client.lastName}, le ricordiamo il suo appuntamento per ${appointment.treatment} previsto per il ${formattedDate} con ${appointment.doctor}. Cordiali saluti, Studio Dermatologico.`;
    
    // Format the phone number
    let phoneNumber = client.phone.replace(/\s+/g, '');
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = '+39' + phoneNumber;
    }
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open in a new tab
    window.open(whatsappUrl, '_blank');
    
    toast.success('Messaggio WhatsApp pronto per essere inviato');
  };

  return {
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getClientAppointments,
    sendWhatsAppReminder
  };
};

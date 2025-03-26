
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
    const newAppointmentId = Date.now().toString();
    const newAppointment: Appointment = {
      ...appointment,
      id: newAppointmentId
    };
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
    toast.success('Appuntamento aggiunto con successo');
    return newAppointmentId;
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

  // Check available time slots for a specific date
  const getAvailableTimeSlots = (date: Date, duration: number = 30) => {
    // Business hours (9:00 - 18:00)
    const businessHours = {
      start: 9, // 9:00
      end: 18   // 18:00
    };
    
    // Create time slots (30 minutes each by default)
    const slots = [];
    const appointmentsOnDate = appointments.filter(app => 
      app.date.getFullYear() === date.getFullYear() &&
      app.date.getMonth() === date.getMonth() &&
      app.date.getDate() === date.getDate()
    );
    
    // Generate all possible time slots
    for (let hour = businessHours.start; hour < businessHours.end; hour++) {
      for (let minute = 0; minute < 60; minute += duration) {
        if (hour === businessHours.end - 1 && minute + duration > 60) continue;
        
        const slotTime = new Date(date);
        slotTime.setHours(hour, minute, 0, 0);
        
        // Check if the slot is already booked
        const isBooked = appointmentsOnDate.some(app => {
          const appTime = app.date.getTime();
          const slotStartTime = slotTime.getTime();
          const slotEndTime = slotStartTime + duration * 60 * 1000;
          
          return appTime >= slotStartTime && appTime < slotEndTime;
        });
        
        if (!isBooked) {
          slots.push({
            time: slotTime,
            isAvailable: true
          });
        }
      }
    }
    
    return slots;
  };

  // Book appointment for new client
  const bookAppointmentForNewClient = (
    clientData: { firstName: string; lastName: string; phone: string; email: string },
    appointmentData: { date: Date; treatment: string; doctor: string; notes: string },
    addClient: (client: any) => string
  ) => {
    // Create new client
    const clientId = addClient({
      ...clientData,
      birthDate: new Date(), // default birthdate
      address: "",
      medicalNotes: appointmentData.notes || ""
    });
    
    // Verify that client was created successfully
    if (!clientId) {
      toast.error('Errore durante la creazione del profilo paziente');
      throw new Error('Failed to create client');
    }
    
    // Create appointment with explicit client ID reference
    const appointment: Omit<Appointment, 'id'> = {
      clientId,
      date: appointmentData.date,
      treatment: appointmentData.treatment as any,
      doctor: appointmentData.doctor as any,
      notes: appointmentData.notes || ''
    };
    
    // Add appointment and get the ID
    const appointmentId = addAppointment(appointment);
    
    if (!appointmentId) {
      toast.error('Errore durante la creazione dell\'appuntamento');
      throw new Error('Failed to create appointment');
    }
    
    toast.success('Paziente e appuntamento creati con successo');
    
    return { clientId, appointmentId };
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
    getAvailableTimeSlots,
    bookAppointmentForNewClient,
    sendWhatsAppReminder
  };
};

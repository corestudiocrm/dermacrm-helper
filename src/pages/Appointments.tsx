
import React from 'react';
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import AppointmentsList from '@/components/appointments/AppointmentsList';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import AppointmentsHeader from '@/components/appointments/header/AppointmentsHeader';
import AppointmentDetails from '@/components/appointments/details/AppointmentDetails';
import { useCrm } from '@/context/CrmContext';

const Appointments: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { appointments, getClient, deleteAppointment, sendWhatsAppReminder } = useCrm();
  const navigate = useNavigate();
  
  // Parse the path to determine action
  const isNewPath = location.pathname.includes('/appointments/new');
  const isEditPath = location.pathname.includes('/edit');
  
  const appointment = id 
    ? appointments.find(a => a.id === id) 
    : undefined;
  
  // Redirect if appointment not found
  if (id && !appointment && !isNewPath && !isEditPath) {
    navigate('/appointments');
    return null;
  }
  
  // Get client for appointment
  const client = appointment 
    ? getClient(appointment.clientId) 
    : undefined;
  
  // Handle delete appointment
  const handleDeleteAppointment = () => {
    if (appointment) {
      deleteAppointment(appointment.id);
      navigate('/appointments');
    }
  };
  
  // Handle WhatsApp message
  const handleWhatsAppReminder = () => {
    if (appointment && client) {
      sendWhatsAppReminder(client.id, appointment.id);
    }
  };
  
  // Check if we have a date query parameter
  React.useEffect(() => {
    if (!id && !isNewPath && !isEditPath) {
      const dateParam = searchParams.get('date');
      if (dateParam) {
        const dateObj = new Date(dateParam);
        // The date parameter is used in the AppointmentsList component
        // We don't need to do anything here, it will be handled by the filter components
      }
    }
  }, [searchParams, id, isNewPath, isEditPath]);
  
  // Render content based on current route
  const renderContent = () => {
    if (!id && !isNewPath) {
      // Appointments list view
      return (
        <>
          <AppointmentsHeader 
            title="Appuntamenti" 
            description="Gestisci gli appuntamenti con i tuoi pazienti"
          />
          <AppointmentsList />
        </>
      );
    } else if (isNewPath) {
      // New appointment form
      return (
        <>
          <AppointmentsHeader 
            title="Nuovo Appuntamento" 
            description="Programma un nuovo appuntamento"
          />
          <AppointmentForm />
        </>
      );
    } else if (isEditPath) {
      // Edit appointment form
      return (
        <>
          <AppointmentsHeader 
            title="Modifica Appuntamento" 
            description="Aggiorna i dettagli dell'appuntamento"
          />
          <AppointmentForm appointment={appointment} />
        </>
      );
    } else {
      // Appointment details view
      return (
        <AppointmentDetails 
          appointment={appointment!}
          client={client}
          onDelete={handleDeleteAppointment}
          onSendWhatsApp={handleWhatsAppReminder}
        />
      );
    }
  };
  
  return (
    <PageTransition>
      <div className="space-y-6">
        {renderContent()}
      </div>
    </PageTransition>
  );
};

export default Appointments;

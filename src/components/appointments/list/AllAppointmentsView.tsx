
import React from 'react';
import { motion } from 'framer-motion';
import { Appointment } from '@/context/types';
import AppointmentCard from './AppointmentCard';
import { useCrm } from '@/context/CrmContext';

interface AllAppointmentsViewProps {
  appointments: Appointment[];
}

const AllAppointmentsView: React.FC<AllAppointmentsViewProps> = ({ appointments }) => {
  const { getClient } = useCrm();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {appointments.map(appointment => {
        const client = getClient(appointment.clientId);
        if (!client) return null;
        
        return (
          <AppointmentCard 
            key={appointment.id}
            appointment={appointment}
            client={client}
          />
        );
      })}
    </div>
  );
};

export default AllAppointmentsView;

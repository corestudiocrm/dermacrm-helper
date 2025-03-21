
import React from 'react';
import { motion } from 'framer-motion';
import { format, isSameDay } from 'date-fns';
import { Appointment } from '@/context/types';
import AppointmentCard from './AppointmentCard';
import { useCrm } from '@/context/CrmContext';

interface DailyViewProps {
  appointments: Appointment[];
}

const DailyView: React.FC<DailyViewProps> = ({ appointments }) => {
  const { getClient } = useCrm();
  
  // Group appointments by hour
  const groupAppointmentsByHour = (appointments: Appointment[]) => {
    const groups: Record<string, Appointment[]> = {};
    
    appointments.forEach(appointment => {
      const hour = format(new Date(appointment.date), 'HH:00');
      if (!groups[hour]) {
        groups[hour] = [];
      }
      groups[hour].push(appointment);
    });
    
    return groups;
  };
  
  const appointmentsByHour = groupAppointmentsByHour(appointments);

  return (
    <>
      {Object.entries(appointmentsByHour)
        .sort(([hourA], [hourB]) => hourA.localeCompare(hourB))
        .map(([hour, hourAppointments]) => (
          <div key={hour} className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{hour}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hourAppointments.map(appointment => {
                const client = getClient(appointment.clientId);
                if (!client) return null;
                
                return (
                  <AppointmentCard 
                    key={appointment.id}
                    appointment={appointment}
                    client={client}
                    isDaily={true}
                  />
                );
              })}
            </div>
          </div>
        ))}
    </>
  );
};

export default DailyView;

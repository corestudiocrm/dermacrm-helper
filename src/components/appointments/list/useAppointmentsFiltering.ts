
import { useState } from 'react';
import { 
  startOfDay, 
  addDays, 
  subDays, 
  isSameDay
} from 'date-fns';
import { Appointment } from '@/context/types';
import { useCrm } from '@/context/CrmContext';

export const useAppointmentsFiltering = () => {
  const { appointments, getClient } = useCrm();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
  const [viewMode, setViewMode] = useState<'day' | 'all'>('day');

  // Navigate to previous/next day
  const handlePreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(startOfDay(new Date()));
  };

  // Filter appointments based on search query and selected date
  const filteredAppointments = appointments.filter(appointment => {
    // Filter by date if in day view
    if (viewMode === 'day' && !isSameDay(new Date(appointment.date), currentDate)) {
      return false;
    }
    
    // Get client for this appointment
    const client = getClient(appointment.clientId);
    if (!client) return false;
    
    // Filter by search query
    if (searchQuery) {
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      const query = searchQuery.toLowerCase();
      
      return fullName.includes(query) || 
             appointment.treatment.toLowerCase().includes(query) || 
             appointment.doctor.toLowerCase().includes(query);
    }
    
    return true;
  });

  // Sort appointments by date and time
  const sortedAppointments = [...filteredAppointments].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return {
    searchQuery,
    setSearchQuery,
    currentDate,
    viewMode,
    setViewMode,
    handlePreviousDay,
    handleNextDay,
    handleToday,
    sortedAppointments,
    isToday: isSameDay(currentDate, new Date())
  };
};

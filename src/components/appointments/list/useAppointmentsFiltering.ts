
import { useState } from 'react';
import { 
  startOfDay, 
  addDays, 
  subDays, 
  isSameDay,
  isAfter,
  isBefore
} from 'date-fns';
import { Appointment } from '@/context/types';
import { useCrm } from '@/context/CrmContext';

export type AppointmentStatus = 'all' | 'upcoming' | 'completed';

export const useAppointmentsFiltering = () => {
  const { appointments, getClient, doctors } = useCrm();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
  const [viewMode, setViewMode] = useState<'day' | 'all'>('day');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus>('all');

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

  // Filter appointments based on search query, selected date, doctor, and status
  const filteredAppointments = appointments.filter(appointment => {
    // Filter by date if in day view
    if (viewMode === 'day' && !isSameDay(new Date(appointment.date), currentDate)) {
      return false;
    }
    
    // Filter by doctor
    if (selectedDoctorId !== 'all' && appointment.doctor !== selectedDoctorId) {
      return false;
    }
    
    // Filter by status
    if (selectedStatus !== 'all') {
      const now = new Date();
      const isUpcoming = isAfter(new Date(appointment.date), now);
      
      if (selectedStatus === 'upcoming' && !isUpcoming) {
        return false;
      }
      
      if (selectedStatus === 'completed' && isUpcoming) {
        return false;
      }
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
    isToday: isSameDay(currentDate, new Date()),
    selectedDoctorId,
    setSelectedDoctorId,
    selectedStatus,
    setSelectedStatus,
    doctorsOptions: [
      { id: 'all', name: 'Tutti i dottori' },
      ...doctors.map(doctor => ({ id: doctor, name: doctor }))
    ]
  };
};

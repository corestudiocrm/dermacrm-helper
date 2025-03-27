
import { useState } from 'react';
import { 
  startOfDay, 
  addDays, 
  subDays, 
  isSameDay,
  isAfter,
  isBefore,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval
} from 'date-fns';
import { Appointment } from '@/context/types';
import { useCrm } from '@/context/CrmContext';

export type AppointmentStatus = 'all' | 'upcoming' | 'completed';
export type CalendarViewMode = 'day' | 'week' | 'month';

export const useAppointmentsFiltering = () => {
  const { appointments, getClient, doctors } = useCrm();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
  const [viewMode, setViewMode] = useState<'day' | 'all'>('all'); // Default to 'all' view
  const [calendarViewMode, setCalendarViewMode] = useState<CalendarViewMode>('month');
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

  // Get date range based on calendar view mode
  const getDateRange = () => {
    switch (calendarViewMode) {
      case 'day':
        return {
          start: startOfDay(currentDate),
          end: addDays(startOfDay(currentDate), 1)
        };
      case 'week':
        return {
          start: startOfWeek(currentDate, { weekStartsOn: 1 }),
          end: endOfWeek(currentDate, { weekStartsOn: 1 })
        };
      case 'month':
      default:
        return {
          start: startOfMonth(currentDate),
          end: endOfMonth(currentDate)
        };
    }
  };

  // Filter appointments based on search query, selected date, doctor, and status
  const filteredAppointments = appointments.filter(appointment => {
    // Filter by date ONLY if in day view mode
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
    
    // If we're here, the appointment passed all filters
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
    setCurrentDate,
    viewMode,
    setViewMode,
    calendarViewMode,
    setCalendarViewMode,
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
    ],
    getDateRange
  };
};

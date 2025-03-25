
import React, { useState, useMemo } from 'react';
import {
  format,
  startOfDay,
  endOfDay,
  isSameDay,
  eachDayOfInterval,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  isBefore
} from 'date-fns';
import { it } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useCrm } from '@/context/CrmContext';
import { 
  AppointmentStatus, 
  CalendarViewMode,
} from './useAppointmentsFiltering';
import { DayView, WeekView, MonthView } from './views';

interface CalendarViewProps {
  selectedDoctorId: string;
  onDoctorChange: (value: string) => void;
  selectedStatus: AppointmentStatus;
  onStatusChange: (value: AppointmentStatus) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDoctorId,
  onDoctorChange,
  selectedStatus,
  onStatusChange
}) => {
  const navigate = useNavigate();
  const { appointments, getClient, doctors } = useCrm();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarViewMode, setCalendarViewMode] = useState<CalendarViewMode>('month');
  
  const doctorsOptions = [
    { id: 'all', name: 'Tutti i dottori' },
    ...doctors.map(doctor => ({ id: doctor, name: doctor }))
  ];
  
  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    // Filter by doctor
    if (selectedDoctorId !== 'all' && appointment.doctor !== selectedDoctorId) {
      return false;
    }
    
    // Filter by status
    if (selectedStatus !== 'all') {
      const now = new Date();
      const isUpcoming = isBefore(now, new Date(appointment.date));
      
      if (selectedStatus === 'upcoming' && !isUpcoming) {
        return false;
      }
      
      if (selectedStatus === 'completed' && isUpcoming) {
        return false;
      }
    }
    
    return true;
  });

  // Get date ranges based on calendar view mode
  const dateRange = useMemo(() => {
    switch (calendarViewMode) {
      case 'day':
        return {
          start: startOfDay(currentDate),
          end: endOfDay(currentDate)
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
  }, [currentDate, calendarViewMode]);

  // Get days for the current month/week/day view
  const daysInView = useMemo(() => {
    return eachDayOfInterval({
      start: dateRange.start,
      end: dateRange.end,
    });
  }, [dateRange]);

  // Navigation functions
  const navigatePrevious = () => {
    switch (calendarViewMode) {
      case 'day':
        setCurrentDate(addDays(currentDate, -1));
        break;
      case 'week':
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      case 'month':
        setCurrentDate(subMonths(currentDate, 1));
        break;
    }
  };

  const navigateNext = () => {
    switch (calendarViewMode) {
      case 'day':
        setCurrentDate(addDays(currentDate, 1));
        break;
      case 'week':
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case 'month':
        setCurrentDate(addMonths(currentDate, 1));
        break;
    }
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  const getDayAppointments = (day: Date) => {
    return filteredAppointments.filter(appointment => 
      isSameDay(new Date(appointment.date), day)
    );
  };

  // Select a day when clicked
  const handleSelectDay = (day: Date) => {
    navigate(`/appointments?date=${format(day, 'yyyy-MM-dd')}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Select value={calendarViewMode} onValueChange={(value) => setCalendarViewMode(value as CalendarViewMode)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Visualizzazione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Giorno</SelectItem>
              <SelectItem value="week">Settimana</SelectItem>
              <SelectItem value="month">Mese</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={navigatePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={navigateToToday}>
              Oggi
            </Button>
            <Button variant="outline" size="icon" onClick={navigateNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <h3 className="text-lg font-medium">
            {calendarViewMode === 'day' && format(currentDate, 'd MMMM yyyy', { locale: it })}
            {calendarViewMode === 'week' && `${format(dateRange.start, 'd', { locale: it })} - ${format(dateRange.end, 'd MMMM yyyy', { locale: it })}`}
            {calendarViewMode === 'month' && format(currentDate, 'MMMM yyyy', { locale: it })}
          </h3>
        </div>

        <div className="flex gap-2">
          <Select value={selectedDoctorId} onValueChange={onDoctorChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtra per dottore" />
            </SelectTrigger>
            <SelectContent>
              {doctorsOptions.map((doctorOption) => (
                <SelectItem key={doctorOption.id} value={doctorOption.id}>
                  {doctorOption.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={selectedStatus} 
            onValueChange={(value) => onStatusChange(value as AppointmentStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtra per stato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti gli appuntamenti</SelectItem>
              <SelectItem value="upcoming">Prossimi appuntamenti</SelectItem>
              <SelectItem value="completed">Appuntamenti completati</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {calendarViewMode === 'day' && (
        <DayView 
          currentDate={currentDate}
          appointments={getDayAppointments(currentDate)}
          getClient={getClient}
        />
      )}

      {calendarViewMode === 'week' && (
        <WeekView 
          days={daysInView}
          appointments={filteredAppointments}
          getClient={getClient}
          onSelectDay={handleSelectDay}
        />
      )}

      {calendarViewMode === 'month' && (
        <MonthView 
          days={daysInView}
          currentDate={currentDate}
          appointments={filteredAppointments}
          getClient={getClient}
          onSelectDay={handleSelectDay}
        />
      )}
    </div>
  );
};

export default CalendarView;

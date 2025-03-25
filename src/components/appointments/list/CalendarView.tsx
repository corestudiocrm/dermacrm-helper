
import React, { useState, useMemo } from 'react';
import {
  format,
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
  isToday,
  eachDayOfInterval,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  parseISO,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks
} from 'date-fns';
import { it } from 'date-fns/locale';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  User,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Appointment } from '@/context/types';
import { useCrm } from '@/context/CrmContext';
import { 
  AppointmentStatus, 
  CalendarViewMode,
  useAppointmentsFiltering 
} from './useAppointmentsFiltering';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

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
      const isUpcoming = isAfter(new Date(appointment.date), now);
      
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

// Day View Component
interface DayViewProps {
  currentDate: Date;
  appointments: Appointment[];
  getClient: (id: string) => any;
}

const DayView: React.FC<DayViewProps> = ({ currentDate, appointments, getClient }) => {
  const navigate = useNavigate();
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8AM to 9PM
  
  // Group appointments by hour
  const appointmentsByHour: { [hour: number]: Appointment[] } = {};
  
  hours.forEach(hour => {
    appointmentsByHour[hour] = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.getHours() === hour;
    });
  });
  
  const handleAppointmentClick = (appointment: Appointment) => {
    navigate(`/appointments/${appointment.id}`);
  };
  
  return (
    <Card className="border rounded-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          {format(currentDate, 'EEEE d MMMM yyyy', { locale: it })}
        </CardTitle>
        <CardDescription>
          {appointments.length} appuntamenti programmati
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-12 min-h-[60px] border-t py-1">
              <div className="col-span-1 text-sm text-muted-foreground pt-2 font-medium">
                {hour}:00
              </div>
              <div className="col-span-11 pl-2">
                {appointmentsByHour[hour].length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {appointmentsByHour[hour].map(appointment => {
                      const client = getClient(appointment.clientId);
                      return (
                        <div
                          key={appointment.id}
                          className="rounded-md bg-derma-100 p-2 text-sm cursor-pointer hover:bg-derma-200 transition-colors"
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <div className="font-medium">
                            {format(new Date(appointment.date), 'HH:mm')} - {client.firstName} {client.lastName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {appointment.treatment} con {appointment.doctor}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Week View Component
interface WeekViewProps {
  days: Date[];
  appointments: Appointment[];
  getClient: (id: string) => any;
  onSelectDay: (day: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ days, appointments, getClient, onSelectDay }) => {
  const navigate = useNavigate();
  
  const getDayAppointments = (day: Date) => {
    return appointments.filter(appointment => 
      isSameDay(new Date(appointment.date), day)
    );
  };
  
  const handleAppointmentClick = (appointment: Appointment) => {
    navigate(`/appointments/${appointment.id}`);
  };
  
  return (
    <Card className="border rounded-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Settimana dal {format(days[0], 'd MMMM', { locale: it })} al {format(days[days.length-1], 'd MMMM yyyy', { locale: it })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {days.map(day => (
            <div 
              key={day.toString()}
              className={`border rounded-md p-2 min-h-[120px] hover:bg-muted/50 cursor-pointer transition-colors ${
                isToday(day) ? 'bg-muted border-primary' : ''
              }`}
              onClick={() => onSelectDay(day)}
            >
              <div className="font-medium text-sm mb-1">
                {format(day, 'EEEE', { locale: it })}
              </div>
              <div className={`text-xl mb-2 font-bold ${isToday(day) ? 'text-primary' : ''}`}>
                {format(day, 'd', { locale: it })}
              </div>
              
              {getDayAppointments(day).length > 0 ? (
                <ScrollArea className="h-[180px]">
                  <div className="space-y-1">
                    {getDayAppointments(day).map(appointment => {
                      const client = getClient(appointment.clientId);
                      return (
                        <div
                          key={appointment.id}
                          className="rounded-md bg-derma-100 p-1 text-xs cursor-pointer hover:bg-derma-200 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAppointmentClick(appointment);
                          }}
                        >
                          <div className="font-medium">
                            {format(new Date(appointment.date), 'HH:mm')}
                          </div>
                          <div className="truncate">
                            {client.firstName} {client.lastName}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-xs text-muted-foreground">
                  Nessun appuntamento
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Month View Component
interface MonthViewProps {
  days: Date[];
  currentDate: Date;
  appointments: Appointment[];
  getClient: (id: string) => any;
  onSelectDay: (day: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ days, currentDate, appointments, getClient, onSelectDay }) => {
  const navigate = useNavigate();
  
  const handleAppointmentClick = (appointmentId: string) => {
    navigate(`/appointments/${appointmentId}`);
  };
  
  // Get current month start and end
  const currentMonthStart = startOfMonth(currentDate);
  const currentMonthEnd = endOfMonth(currentDate);
  
  // Add days from previous month to complete first week
  const startDayOfWeek = currentMonthStart.getDay() || 7; // Convert Sunday (0) to 7
  const daysToAdd = startDayOfWeek - 1; // Number of days needed from previous month
  
  const startDate = addDays(currentMonthStart, -daysToAdd);
  
  // Add days to complete 6 weeks (42 days) if needed
  const endDate = addDays(startDate, 41);
  
  const allDaysInCalendar = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  
  const weeks = [];
  for (let i = 0; i < allDaysInCalendar.length; i += 7) {
    weeks.push(allDaysInCalendar.slice(i, i + 7));
  }
  
  // Get appointments for a day
  const getDayAppointments = (day: Date) => {
    return appointments.filter(appointment => 
      isSameDay(new Date(appointment.date), day)
    );
  };
  
  return (
    <Card className="border rounded-md">
      <CardContent className="pt-6">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
          {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((day, i) => (
            <div key={i} className="font-medium text-sm text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="space-y-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {week.map((day) => {
                const dayAppointments = getDayAppointments(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                
                return (
                  <div
                    key={day.toString()}
                    className={`
                      border rounded-md p-1 min-h-[100px] 
                      ${isToday(day) ? 'bg-muted border-primary' : ''} 
                      ${!isCurrentMonth ? 'opacity-40' : ''}
                      hover:bg-muted/50 cursor-pointer transition-colors
                    `}
                    onClick={() => onSelectDay(day)}
                  >
                    <div className={`text-right text-sm ${isToday(day) ? 'font-bold text-primary' : ''}`}>
                      {format(day, 'd')}
                    </div>
                    
                    {dayAppointments.length > 0 ? (
                      <div className="mt-1">
                        {dayAppointments.length <= 3 ? (
                          <div className="space-y-1">
                            {dayAppointments.slice(0, 3).map(appointment => {
                              const client = getClient(appointment.clientId);
                              return (
                                <HoverCard key={appointment.id}>
                                  <HoverCardTrigger asChild>
                                    <div 
                                      className="truncate text-xs bg-derma-100 rounded px-1 py-0.5 cursor-pointer hover:bg-derma-200"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAppointmentClick(appointment.id);
                                      }}
                                    >
                                      {format(new Date(appointment.date), 'HH:mm')} {client?.firstName} {client?.lastName}
                                    </div>
                                  </HoverCardTrigger>
                                  <HoverCardContent side="right" className="w-80">
                                    <div className="space-y-2">
                                      <div className="flex items-start gap-2">
                                        <User className="h-4 w-4 mt-0.5" />
                                        <div>
                                          <h4 className="font-medium">{client?.firstName} {client?.lastName}</h4>
                                          <p className="text-xs text-muted-foreground">{client?.phone}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <Clock className="h-4 w-4 mt-0.5" />
                                        <div>
                                          <p className="text-sm">{format(new Date(appointment.date), 'HH:mm')} - {appointment.treatment}</p>
                                          <p className="text-xs text-muted-foreground">Con {appointment.doctor}</p>
                                        </div>
                                      </div>
                                      {appointment.notes && (
                                        <p className="text-xs text-muted-foreground border-t pt-1 mt-1">
                                          {appointment.notes.length > 100 
                                            ? `${appointment.notes.substring(0, 100)}...` 
                                            : appointment.notes}
                                        </p>
                                      )}
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              );
                            })}
                          </div>
                        ) : (
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <div className="text-xs bg-derma-100 rounded px-1 py-0.5 text-center">
                                {dayAppointments.length} appuntamenti
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent side="right" className="w-80">
                              <ScrollArea className="h-[200px]">
                                <div className="space-y-2 py-1">
                                  {dayAppointments.map(appointment => {
                                    const client = getClient(appointment.clientId);
                                    return (
                                      <div 
                                        key={appointment.id} 
                                        className="text-sm p-2 border-b last:border-0 hover:bg-muted rounded cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleAppointmentClick(appointment.id);
                                        }}
                                      >
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline" className="whitespace-nowrap">
                                            {format(new Date(appointment.date), 'HH:mm')}
                                          </Badge>
                                          <div className="font-medium">{client?.firstName} {client?.lastName}</div>
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                          {appointment.treatment} con {appointment.doctor}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </ScrollArea>
                            </HoverCardContent>
                          </HoverCard>
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;

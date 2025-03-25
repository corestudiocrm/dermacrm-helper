
import React from 'react';
import { format, isSameDay, isSameMonth, isToday, addDays, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import { it } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { User, Clock } from 'lucide-react';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Appointment } from '@/context/types';

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

export default MonthView;

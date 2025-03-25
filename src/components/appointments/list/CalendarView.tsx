
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay, 
  isToday, 
  isSameDay, 
  isAfter 
} from 'date-fns';
import { it } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useCrm } from '@/context/CrmContext';
import { AppointmentStatus } from './useAppointmentsFiltering';

interface CalendarViewProps {
  selectedDoctorId?: string;
  onDoctorChange?: (doctorId: string) => void;
  selectedStatus?: AppointmentStatus;
  onStatusChange?: (status: AppointmentStatus) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDoctorId = 'all',
  onDoctorChange,
  selectedStatus = 'all',
  onStatusChange
}) => {
  const navigate = useNavigate();
  const { appointments, getClient, doctors } = useCrm();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    // Filter by doctor
    if (selectedDoctorId !== 'all') {
      const doctorObject = doctors.find(d => d.id === selectedDoctorId);
      if (!doctorObject) return false;
      if (appointment.doctor !== doctorObject.name) return false;
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
  
  // Navigate to previous/next month
  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };
  
  // Days of the month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });
  
  // Get the day of week (0-6) for the first day of month
  const firstDayOfMonth = getDay(startOfMonth(currentMonth));
  
  // Weekday names
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  
  // Get appointments for a specific day
  const getAppointmentsForDay = (day: Date) => {
    return filteredAppointments.filter(appointment => 
      isSameDay(new Date(appointment.date), day)
    );
  };
  
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            {format(currentMonth, 'MMMM yyyy', { locale: it })}
          </CardTitle>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => setCurrentMonth(new Date())}
            >
              Oggi
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          {/* Doctor filter */}
          <Select 
            value={selectedDoctorId} 
            onValueChange={onDoctorChange}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filtra per dottore" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti i dottori</SelectItem>
              {doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Status filter */}
          <Select 
            value={selectedStatus}
            onValueChange={(value) => onStatusChange?.(value as AppointmentStatus)}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filtra per stato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti gli stati</SelectItem>
              <SelectItem value="upcoming">Programmati</SelectItem>
              <SelectItem value="completed">Completati</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
          {/* Weekday headers */}
          {weekDays.map((day, index) => (
            <div 
              key={index} 
              className="bg-background h-10 flex items-center justify-center text-sm font-medium"
            >
              {day}
            </div>
          ))}
          
          {/* Empty cells for days before the first day of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="bg-background p-2 h-32" />
          ))}
          
          {/* Days of the month */}
          {daysInMonth.map((day) => {
            const dayAppointments = getAppointmentsForDay(day);
            const hasAppointments = dayAppointments.length > 0;
            
            return (
              <div 
                key={day.toISOString()} 
                className={`bg-background p-2 h-32 overflow-hidden transition-colors ${
                  isToday(day) ? "bg-derma-50" : ""
                } hover:bg-muted/50 cursor-pointer`}
                onClick={() => {
                  const queryParams = new URLSearchParams();
                  queryParams.append('date', format(day, 'yyyy-MM-dd'));
                  navigate(`/appointments?${queryParams.toString()}`);
                }}
              >
                <div className="font-medium text-sm mb-1 sticky top-0 bg-background">
                  {format(day, 'd')}
                </div>
                
                {hasAppointments ? (
                  <div className="space-y-1">
                    {dayAppointments.slice(0, 3).map((appointment) => {
                      const client = getClient(appointment.clientId);
                      const isCompleted = new Date(appointment.date) < new Date();
                      
                      return (
                        <HoverCard key={appointment.id}>
                          <HoverCardTrigger asChild>
                            <div 
                              className={`text-xs px-1 py-0.5 rounded truncate ${
                                isCompleted ? "bg-muted text-muted-foreground" : "bg-derma-100 text-derma-800"
                              }`}
                            >
                              {format(new Date(appointment.date), 'HH:mm')} - {client?.lastName || ''}
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80 p-0">
                            <div className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">{appointment.treatment}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {format(new Date(appointment.date), 'HH:mm')}
                                  </div>
                                </div>
                                <Badge variant={isCompleted ? "outline" : "default"}>
                                  {isCompleted ? "Completato" : "Programmato"}
                                </Badge>
                              </div>
                              
                              <Separator className="my-2" />
                              
                              {client && (
                                <div className="flex items-center space-x-2 text-sm">
                                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span>{client.firstName} {client.lastName}</span>
                                </div>
                              )}
                              
                              <div className="flex items-center space-x-2 text-sm mt-1">
                                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{appointment.doctor}</span>
                              </div>
                              
                              <Button 
                                variant="link" 
                                className="px-0 h-auto text-sm mt-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/appointments/${appointment.id}`);
                                }}
                              >
                                Visualizza dettagli
                              </Button>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      );
                    })}
                    
                    {dayAppointments.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayAppointments.length - 3} altri appuntamenti
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;

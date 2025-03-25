
import React from 'react';
import { format, isToday, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Appointment } from '@/context/types';

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

export default WeekView;

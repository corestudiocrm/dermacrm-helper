
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { Appointment } from '@/context/types';

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

export default DayView;


import React from 'react';
import { format, isSameDay, addDays } from 'date-fns';
import { Calendar, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Appointment, Client } from '@/context/types';

interface AppointmentsListProps {
  appointments: Appointment[];
  getClient: (id: string) => Client | undefined;
  title: string;
  description: string;
  emptyMessage: string;
  today?: Date;
  type: 'today' | 'upcoming';
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  appointments,
  getClient,
  title,
  description,
  emptyMessage,
  today = new Date(),
  type
}) => {
  const navigate = useNavigate();

  return (
    <Card className="col-span-1 hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          <Calendar className="mr-2 h-5 w-5 text-core-600" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-6">
              <Calendar className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {emptyMessage}
              </p>
            </div>
          ) : (
            appointments.map(appointment => {
              const client = getClient(appointment.clientId);
              if (!client) return null;
              
              const isUpcomingDays = isSameDay(
                new Date(appointment.date),
                addDays(today, 1)
              ) || isSameDay(
                new Date(appointment.date),
                addDays(today, 2)
              );
              
              return (
                <div 
                  key={appointment.id}
                  className="flex items-center justify-between p-3 rounded-md border cursor-pointer hover:shadow-sm transition-shadow bg-white"
                  onClick={() => navigate(`/appointments/${appointment.id}`)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="min-w-[44px] h-10 flex flex-col items-center justify-center rounded-md bg-core-50 text-core-700">
                      {type === 'today' ? (
                        <div className="text-sm font-medium">
                          {format(new Date(appointment.date), "HH:mm")}
                        </div>
                      ) : (
                        <>
                          <div className="text-xs text-muted-foreground">
                            {isUpcomingDays 
                              ? format(new Date(appointment.date), "EEE") 
                              : format(new Date(appointment.date), "dd/MM")}
                          </div>
                          <div className="text-sm font-medium">
                            {format(new Date(appointment.date), "HH:mm")}
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div>
                      <div className="font-medium">
                        {client.firstName} {client.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        {type === 'today' && <User className="mr-1 h-3 w-3" />}
                        {type === 'today' ? `${appointment.doctor}, ${appointment.treatment}` : appointment.treatment}
                      </div>
                    </div>
                  </div>
                  
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              );
            })
          )}
        </div>
      </CardContent>
      {appointments.length > 0 && (
        <CardFooter className="pb-4">
          <Button 
            variant="ghost" 
            className="w-full text-core-700 hover:text-core-800 hover:bg-core-50"
            onClick={() => navigate('/appointments')}
          >
            Visualizza tutti gli appuntamenti
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AppointmentsList;

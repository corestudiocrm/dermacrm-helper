
import React from 'react';
import { format, isBefore, isSameDay } from 'date-fns';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Appointment, Client } from '@/context/types';

interface AppointmentCardProps {
  appointment: Appointment;
  client: Client;
  isDaily?: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  client, 
  isDaily = false 
}) => {
  const navigate = useNavigate();
  const isPast = isBefore(new Date(appointment.date), new Date());
  const isToday = isSameDay(new Date(appointment.date), new Date());
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      <Card 
        className={`cursor-pointer hover:shadow-md transition-shadow duration-200 ${
          isPast ? 'bg-muted/30' : ''
        }`}
        onClick={() => navigate(`/appointments/${appointment.id}`)}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">
                {isDaily
                  ? format(new Date(appointment.date), "HH:mm")
                  : isToday 
                    ? `Oggi, ${format(new Date(appointment.date), "HH:mm")}` 
                    : format(new Date(appointment.date), "dd MMM yyyy, HH:mm")}
              </p>
              <p className="text-muted-foreground text-sm">
                {appointment.treatment}
              </p>
            </div>
            <Badge variant={isPast ? "outline" : "default"}>
              {isPast ? "Completato" : "In programma"}
            </Badge>
          </div>
          
          <Separator className="my-3" />
          
          <div className="space-y-1">
            <div className="flex items-center">
              <User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              <p className="text-sm font-medium">
                {client.firstName} {client.lastName}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {appointment.doctor}
            </p>
            
            {appointment.notes && (
              <p className="text-xs text-muted-foreground mt-2 truncate max-w-[250px]">
                {appointment.notes}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AppointmentCard;

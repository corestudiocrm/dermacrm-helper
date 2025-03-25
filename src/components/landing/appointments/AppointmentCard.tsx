
import React from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Calendar, Clock, User, MessageSquare, X, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface AppointmentCardProps {
  appointment: {
    id: string;
    date: Date;
    treatment: string;
    doctor: string;
    notes?: string;
  };
  isPast?: boolean;
  onCancelClick?: (appointmentId: string) => void;
  onNotesClick?: (appointmentId: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  isPast = false,
  onCancelClick,
  onNotesClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg border p-4 shadow-sm ${isPast ? 'opacity-70' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold">{appointment.treatment}</h4>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {format(appointment.date, "EEEE d MMMM yyyy", { locale: it })}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              {format(appointment.date, "HH:mm", { locale: it })}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="h-4 w-4 mr-2" />
              {appointment.doctor}
            </div>
          </div>
        </div>
        
        {!isPast && onCancelClick && onNotesClick && (
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onNotesClick(appointment.id)}
                  >
                    {appointment.notes ? (
                      <Edit className="h-4 w-4" />
                    ) : (
                      <MessageSquare className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {appointment.notes ? 'Modifica note' : 'Aggiungi note'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onCancelClick(appointment.id)}
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Cancella appuntamento
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      
      {appointment.notes && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-sm text-muted-foreground">{appointment.notes}</p>
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentCard;

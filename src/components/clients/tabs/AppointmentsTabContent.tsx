
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Plus, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Appointment, Client, useCrm } from '@/context/CrmContext';

interface AppointmentsTabContentProps {
  client: Client;
}

const AppointmentsTabContent: React.FC<AppointmentsTabContentProps> = ({ client }) => {
  const navigate = useNavigate();
  const { getClientAppointments, sendWhatsAppReminder } = useCrm();
  const appointments = getClientAppointments(client.id);

  const handleWhatsAppReminder = (appointment: Appointment) => {
    sendWhatsAppReminder(client.id, appointment.id);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">{appointments.length} appuntamenti totali</p>
        <Button 
          size="sm" 
          onClick={() => navigate(`/appointments/new?clientId=${client.id}`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Prenota
        </Button>
      </div>
      
      {appointments.length === 0 ? (
        <div className="text-center py-6">
          <Calendar className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Nessun appuntamento programmato
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => navigate(`/appointments/new?clientId=${client.id}`)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Prenota appuntamento
          </Button>
        </div>
      ) : (
        <div className="space-y-3 max-h-[350px] overflow-auto">
          {appointments.map((appointment) => {
            const isPast = new Date(appointment.date) < new Date();
            
            return (
              <motion.div
                key={appointment.id}
                className="rounded-md border p-3"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center justify-between">
                  <Badge variant={isPast ? "outline" : "default"}>
                    {format(new Date(appointment.date), "dd/MM/yyyy")}
                  </Badge>
                  
                  {!isPast && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-7 w-7" 
                      onClick={() => handleWhatsAppReminder(appointment)}
                      title="Invia promemoria WhatsApp"
                    >
                      <MessageSquare className="h-4 w-4 text-derma-600" />
                    </Button>
                  )}
                </div>
                
                <div className="mt-2">
                  <div className="font-medium">
                    {format(new Date(appointment.date), "HH:mm")} - {appointment.treatment}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {appointment.doctor}
                  </div>
                  
                  {appointment.notes && (
                    <div className="mt-1 text-xs text-muted-foreground truncate">
                      {appointment.notes}
                    </div>
                  )}
                </div>
                
                <div className="mt-2 flex justify-end">
                  <Button 
                    variant="link" 
                    size="sm"
                    className="p-0 h-auto"
                    onClick={() => navigate(`/appointments/${appointment.id}`)}
                  >
                    Dettagli
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AppointmentsTabContent;

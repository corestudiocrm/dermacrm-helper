
import React, { useState } from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Calendar, Clock, MapPin, User, MessageSquare, X, Edit, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCrm } from '@/context/CrmContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ClientAppointmentsProps {
  clientId: string;
}

const ClientAppointments: React.FC<ClientAppointmentsProps> = ({ clientId }) => {
  const { getClient, getClientAppointments, updateAppointment, deleteAppointment } = useCrm();
  const client = getClient(clientId);
  const appointments = getClientAppointments(clientId);
  
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null);
  
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [appointmentToAddNotes, setAppointmentToAddNotes] = useState<string | null>(null);
  const [appointmentNotes, setAppointmentNotes] = useState('');

  // Handle appointment cancellation
  const handleCancelAppointment = () => {
    if (appointmentToCancel) {
      deleteAppointment(appointmentToCancel);
      setAppointmentToCancel(null);
      setShowCancelDialog(false);
    }
  };

  // Handle notes submission
  const handleSubmitNotes = () => {
    if (appointmentToAddNotes) {
      const appointment = appointments.find(a => a.id === appointmentToAddNotes);
      
      if (appointment) {
        updateAppointment({
          ...appointment,
          notes: appointmentNotes
        });
        
        setAppointmentToAddNotes(null);
        setAppointmentNotes('');
        setShowNotesDialog(false);
      }
    }
  };

  // Open cancel dialog
  const openCancelDialog = (appointmentId: string) => {
    setAppointmentToCancel(appointmentId);
    setShowCancelDialog(true);
  };

  // Open notes dialog
  const openNotesDialog = (appointmentId: string) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (appointment) {
      setAppointmentToAddNotes(appointmentId);
      setAppointmentNotes(appointment.notes);
      setShowNotesDialog(true);
    }
  };

  // Group appointments by upcoming/past
  const upcomingAppointments = appointments.filter(a => a.date > new Date());
  const pastAppointments = appointments.filter(a => a.date <= new Date());

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">I tuoi appuntamenti</h2>
      
      {/* Upcoming appointments */}
      <div>
        <h3 className="text-lg font-medium mb-4">Appuntamenti futuri</h3>
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border p-4 shadow-sm"
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
                  
                  <div className="flex space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openNotesDialog(appointment.id)}
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
                            onClick={() => openCancelDialog(appointment.id)}
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
                </div>
                
                {appointment.notes && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 rounded-lg p-6 text-center">
            <p className="text-muted-foreground">Non hai appuntamenti futuri</p>
            <Button className="mt-4" variant="outline" asChild>
              <a href="/landing/new">Prenota un appuntamento</a>
            </Button>
          </div>
        )}
      </div>
      
      {/* Past appointments */}
      {pastAppointments.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Appuntamenti passati</h3>
          <div className="space-y-4">
            {pastAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border p-4 shadow-sm opacity-70"
              >
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
                
                {appointment.notes && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* Cancel dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancella appuntamento</DialogTitle>
          </DialogHeader>
          <p className="py-4">Sei sicuro di voler cancellare questo appuntamento?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Annulla
            </Button>
            <Button variant="destructive" onClick={handleCancelAppointment}>
              Cancella appuntamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Notes dialog */}
      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Note per l'appuntamento</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={appointmentNotes}
              onChange={(e) => setAppointmentNotes(e.target.value)}
              placeholder="Aggiungi note, domande o informazioni aggiuntive per il dottore"
              className="min-h-[150px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotesDialog(false)}>
              Annulla
            </Button>
            <Button onClick={handleSubmitNotes}>
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientAppointments;

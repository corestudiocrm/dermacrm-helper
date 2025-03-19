
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { UsersIcon, MessageCircle, Trash2, Edit, ArrowLeftCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import PageTransition from '@/components/layout/PageTransition';
import AppointmentsList from '@/components/appointments/AppointmentsList';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import { useCrm } from '@/context/CrmContext';

const Appointments: React.FC = () => {
  const { id, action } = useParams();
  const { appointments, getClient, deleteAppointment, sendWhatsAppReminder } = useCrm();
  const navigate = useNavigate();
  
  const appointment = id 
    ? appointments.find(a => a.id === id) 
    : undefined;
  
  // Redirect if appointment not found
  if (id && !appointment && action !== 'new') {
    navigate('/appointments');
    return null;
  }
  
  // Get client for appointment
  const client = appointment 
    ? getClient(appointment.clientId) 
    : undefined;
  
  // Handle delete appointment
  const handleDeleteAppointment = () => {
    if (appointment) {
      deleteAppointment(appointment.id);
      navigate('/appointments');
    }
  };
  
  // Handle WhatsApp message
  const handleWhatsAppReminder = () => {
    if (appointment && client) {
      sendWhatsAppReminder(client.id, appointment.id);
    }
  };
  
  return (
    <PageTransition>
      <div className="space-y-6">
        {!id ? (
          // Appointments list
          <>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Appuntamenti</h1>
              <p className="text-muted-foreground mt-1">
                Gestisci gli appuntamenti con i tuoi pazienti
              </p>
            </div>
            <AppointmentsList />
          </>
        ) : action === 'new' ? (
          // New appointment form
          <>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Nuovo Appuntamento</h1>
              <p className="text-muted-foreground mt-1">
                Programma un nuovo appuntamento
              </p>
            </div>
            <AppointmentForm />
          </>
        ) : action === 'edit' ? (
          // Edit appointment form
          <>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Modifica Appuntamento</h1>
              <p className="text-muted-foreground mt-1">
                Aggiorna i dettagli dell'appuntamento
              </p>
            </div>
            <AppointmentForm appointment={appointment} />
          </>
        ) : (
          // Appointment details
          <>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Dettagli Appuntamento
                </h1>
                <p className="text-muted-foreground mt-1">
                  {format(new Date(appointment!.date), "EEEE d MMMM yyyy, HH:mm")}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/appointments')}
                >
                  <ArrowLeftCircle className="h-4 w-4 mr-2" />
                  Indietro
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informazioni Appuntamento</CardTitle>
                  <CardDescription>
                    Dettagli dell'appuntamento programmato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Stato</p>
                      <Badge 
                        variant={new Date(appointment!.date) < new Date() ? "outline" : "default"}
                        className="mt-1"
                      >
                        {new Date(appointment!.date) < new Date() ? "Completato" : "In programma"}
                      </Badge>
                    </div>
                    
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/appointments/edit/${appointment!.id}`)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Modifica
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Elimina
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Eliminare l'appuntamento?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Questa azione non può essere annullata.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annulla</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAppointment}>
                              Conferma
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm font-medium">Data e Ora</p>
                    <p className="text-base">
                      {format(new Date(appointment!.date), "dd/MM/yyyy")} alle {format(new Date(appointment!.date), "HH:mm")}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Trattamento</p>
                    <p className="text-base">{appointment!.treatment}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Medico</p>
                    <p className="text-base">{appointment!.doctor}</p>
                  </div>
                  
                  {appointment!.notes && (
                    <div>
                      <p className="text-sm font-medium">Note</p>
                      <p className="text-base whitespace-pre-line">
                        {appointment!.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {client && (
                <Card>
                  <CardHeader>
                    <CardTitle>Informazioni Paziente</CardTitle>
                    <CardDescription>
                      Dettagli del paziente associato
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-derma-100 flex items-center justify-center">
                        <UsersIcon className="h-6 w-6 text-derma-600" />
                      </div>
                      <div>
                        <p className="font-medium text-lg">
                          {client.firstName} {client.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {client.phone}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={handleWhatsAppReminder}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Invia promemoria WhatsApp
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate(`/clients/${client.id}`)}
                      >
                        Vai alla scheda paziente
                      </Button>
                    </div>
                    
                    {client.medicalNotes && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-sm font-medium">Note mediche</p>
                          <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
                            {client.medicalNotes.length > 150 
                              ? client.medicalNotes.substring(0, 150) + '...' 
                              : client.medicalNotes}
                          </p>
                          {client.medicalNotes.length > 150 && (
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-sm"
                              onClick={() => navigate(`/clients/${client.id}`)}
                            >
                              Leggi tutto
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}
      </div>
    </PageTransition>
  );
};

export default Appointments;

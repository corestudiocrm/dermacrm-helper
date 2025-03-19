
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  User, Edit, Calendar, Phone, Mail, MapPin, FileText, 
  Trash2, SquareRuler, Plus, MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
import { useCrm, Client, Appointment } from '@/context/CrmContext';
import MeasurementForm from './MeasurementForm';

interface ClientDetailsProps {
  client: Client;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client }) => {
  const { 
    deleteClient, 
    getClientAppointments, 
    sendWhatsAppReminder,
    deleteMeasurement
  } = useCrm();
  const navigate = useNavigate();
  const appointments = getClientAppointments(client.id);
  const [measurementDialogOpen, setMeasurementDialogOpen] = useState(false);

  // For deleting measurements
  const [measurementToDelete, setMeasurementToDelete] = useState<string | null>(null);

  // Handle delete client
  const handleDeleteClient = () => {
    deleteClient(client.id);
    navigate('/clients');
  };

  const handleDeleteMeasurement = () => {
    if (measurementToDelete) {
      deleteMeasurement(client.id, measurementToDelete);
      setMeasurementToDelete(null);
    }
  };
  
  const handleWhatsAppReminder = (appointment: Appointment) => {
    sendWhatsAppReminder(client.id, appointment.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <User className="h-6 w-6 mr-2 text-derma-600" />
            {client.firstName} {client.lastName}
          </h1>
          <p className="text-muted-foreground">
            Cliente dal {format(new Date(), "MMMM yyyy")}
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto justify-end">
          <Button variant="outline" onClick={() => navigate(`/clients/edit/${client.id}`)}>
            <Edit className="h-4 w-4 mr-2" />
            Modifica
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Elimina
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Eliminare il cliente?</AlertDialogTitle>
                <AlertDialogDescription>
                  Questa azione non può essere annullata. Verranno eliminati tutti i dati del cliente inclusi gli appuntamenti e le misurazioni.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annulla</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteClient}>
                  Conferma
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Client Info Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Informazioni</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <Calendar className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Data di nascita</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(client.birthDate), "dd/MM/yyyy")}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Telefono</p>
                <p className="text-sm text-muted-foreground">{client.phone}</p>
              </div>
            </div>
            
            {client.email && (
              <div className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {client.email}
                  </p>
                </div>
              </div>
            )}
            
            {client.address && (
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Indirizzo</p>
                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {client.address}
                  </p>
                </div>
              </div>
            )}
            
            <Separator />
            
            {client.medicalNotes ? (
              <div className="flex items-start">
                <FileText className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Note mediche</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {client.medicalNotes}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Nessuna nota medica registrata
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Measurements Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">Misurazioni</CardTitle>
              <CardDescription>
                Aree trattate e dimensioni
              </CardDescription>
            </div>
            <Button size="sm" onClick={() => setMeasurementDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Aggiungi
            </Button>
          </CardHeader>
          <CardContent>
            {client.measurements.length === 0 ? (
              <div className="text-center py-6">
                <SquareRuler className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Nessuna misurazione registrata
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setMeasurementDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi misurazione
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {client.measurements
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((measurement) => (
                    <div
                      key={measurement.id}
                      className="rounded-md border p-3 flex justify-between items-center"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{measurement.area}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(measurement.date), "dd/MM/yyyy")}
                          </span>
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="font-medium">{measurement.size} cm²</span>
                          <span className="text-muted-foreground ml-2">
                            {measurement.treatment}
                          </span>
                        </div>
                      </div>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => setMeasurementToDelete(measurement.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Eliminare la misurazione?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Questa azione non può essere annullata.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setMeasurementToDelete(null)}>
                              Annulla
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteMeasurement}>
                              Conferma
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Appointments Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">Appuntamenti</CardTitle>
              <CardDescription>
                {appointments.length} appuntamenti in totale
              </CardDescription>
            </div>
            <Button 
              size="sm" 
              onClick={() => navigate(`/appointments/new?clientId=${client.id}`)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Prenota
            </Button>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
      
      {/* Measurement Form Dialog */}
      <MeasurementForm
        clientId={client.id}
        open={measurementDialogOpen} 
        onOpenChange={setMeasurementDialogOpen}
      />
    </div>
  );
};

export default ClientDetails;

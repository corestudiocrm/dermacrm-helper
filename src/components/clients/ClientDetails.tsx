
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  User, Edit, Calendar, Phone, Mail, MapPin, FileText, 
  Trash2, Ruler, Plus, MessageSquare, Upload, Paperclip,
  Receipt, Shield, ImageIcon, FileType, Download, CheckCircle, 
  XCircle
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCrm, Client, Appointment, Attachment, Invoice, Consent } from '@/context/CrmContext';
import MeasurementForm from './MeasurementForm';
import BodyAreaVisualization from './BodyAreaVisualization';

interface ClientDetailsProps {
  client: Client;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client }) => {
  const { 
    deleteClient, 
    getClientAppointments, 
    sendWhatsAppReminder,
    deleteMeasurement,
    uploadClientAvatar,
    uploadAttachment,
    deleteAttachment,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    addConsent,
    updateConsent,
    deleteConsent
  } = useCrm();
  const navigate = useNavigate();
  const appointments = getClientAppointments(client.id);
  const [measurementDialogOpen, setMeasurementDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("appointments");

  // File upload refs
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  // For deleting measurements
  const [measurementToDelete, setMeasurementToDelete] = useState<string | null>(null);
  const [attachmentToDelete, setAttachmentToDelete] = useState<string | null>(null);
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);
  const [consentToDelete, setConsentToDelete] = useState<string | null>(null);

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

  // Handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadClientAvatar(client.id, file);
    }
  };

  // Handle attachment upload
  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAttachment(client.id, file);
    }
  };

  // Handle attachment delete
  const handleDeleteAttachment = () => {
    if (attachmentToDelete) {
      deleteAttachment(client.id, attachmentToDelete);
      setAttachmentToDelete(null);
    }
  };

  // Handle invoice delete
  const handleDeleteInvoice = () => {
    if (invoiceToDelete) {
      deleteInvoice(client.id, invoiceToDelete);
      setInvoiceToDelete(null);
    }
  };

  // Handle consent delete
  const handleDeleteConsent = () => {
    if (consentToDelete) {
      deleteConsent(client.id, consentToDelete);
      setConsentToDelete(null);
    }
  };

  // Function to get file icon based on type
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    return <FileType className="h-4 w-4" />;
  };

  // Example invoice for demo (to be removed in production)
  const addExampleInvoice = () => {
    addInvoice(client.id, {
      number: `${Math.floor(Math.random() * 1000) + 1}`,
      date: new Date(),
      amount: Math.floor(Math.random() * 500) + 100,
      paid: Math.random() > 0.5,
      description: 'Trattamento estetico'
    });
  };

  // Example consent for demo
  const addExampleConsent = () => {
    addConsent(client.id, {
      name: 'Consenso al trattamento dei dati personali',
      signed: Math.random() > 0.3,
      date: new Date(),
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) // 1 year
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="flex items-center gap-4">
          {/* Client Avatar */}
          <div className="relative group">
            <Avatar className="h-16 w-16 border-2 border-derma-100">
              {client.avatarUrl ? (
                <AvatarImage src={client.avatarUrl} alt={`${client.firstName} ${client.lastName}`} />
              ) : (
                <AvatarFallback className="bg-derma-100 text-derma-800 text-xl">
                  {client.firstName.charAt(0)}{client.lastName.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-0 right-0 h-6 w-6 bg-derma-100 hover:bg-derma-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => avatarInputRef.current?.click()}
              title="Carica foto"
            >
              <Upload className="h-3 w-3" />
            </Button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              {client.firstName} {client.lastName}
            </h1>
            <p className="text-muted-foreground">
              Cliente dal {format(new Date(), "MMMM yyyy")}
            </p>
          </div>
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

            {/* Attachments Section */}
            <Separator />
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Allegati</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2"
                  onClick={() => attachmentInputRef.current?.click()}
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Carica
                </Button>
                <input
                  ref={attachmentInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleAttachmentUpload}
                />
              </div>
              
              {(!client.attachments || client.attachments.length === 0) ? (
                <p className="text-sm text-muted-foreground">Nessun allegato</p>
              ) : (
                <div className="space-y-2">
                  {client.attachments.map((attachment) => (
                    <div 
                      key={attachment.id} 
                      className="flex items-center justify-between p-2 bg-muted/50 rounded-md text-sm"
                    >
                      <div className="flex items-center">
                        {getFileIcon(attachment.type)}
                        <span className="ml-2 truncate max-w-[160px]">{attachment.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                          <a href={attachment.url} download={attachment.name} title="Scarica">
                            <Download className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-muted-foreground hover:text-destructive"
                              onClick={() => setAttachmentToDelete(attachment.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Eliminare l'allegato?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Questa azione non può essere annullata.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setAttachmentToDelete(null)}>
                                Annulla
                              </AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteAttachment}>
                                Conferma
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
                <Ruler className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
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
        
        {/* Tabs Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-0">
            <Tabs defaultValue="appointments" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="appointments">Appuntamenti</TabsTrigger>
                <TabsTrigger value="invoices">Fatture</TabsTrigger>
                <TabsTrigger value="consents">Consensi</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="pt-4">
            <TabsContent value="appointments" className="mt-0">
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
            </TabsContent>
            
            <TabsContent value="invoices" className="mt-0">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">
                  {client.invoices?.length || 0} fatture emesse
                </p>
                <Button 
                  size="sm" 
                  onClick={addExampleInvoice}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi
                </Button>
              </div>
              
              {!client.invoices || client.invoices.length === 0 ? (
                <div className="text-center py-6">
                  <Receipt className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Nessuna fattura emessa
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={addExampleInvoice}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Crea fattura
                  </Button>
                </div>
              ) : (
                <div className="max-h-[350px] overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Num.</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Importo</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {client.invoices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.number}</TableCell>
                          <TableCell>{format(new Date(invoice.date), "dd/MM/yyyy")}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>€{invoice.amount.toFixed(2)}</span>
                              {invoice.paid ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Pagata</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Da pagare</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-7 w-7"
                                  onClick={() => setInvoiceToDelete(invoice.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Eliminare la fattura?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Questa azione non può essere annullata.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setInvoiceToDelete(null)}>
                                    Annulla
                                  </AlertDialogCancel>
                                  <AlertDialogAction onClick={handleDeleteInvoice}>
                                    Conferma
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="consents" className="mt-0">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">
                  {client.consents?.length || 0} consensi totali
                </p>
                <Button 
                  size="sm" 
                  onClick={addExampleConsent}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi
                </Button>
              </div>
              
              {!client.consents || client.consents.length === 0 ? (
                <div className="text-center py-6">
                  <Shield className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Nessun consenso registrato
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={addExampleConsent}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Aggiungi consenso
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[350px] overflow-auto">
                  {client.consents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((consent) => (
                    <div
                      key={consent.id}
                      className="rounded-md border p-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {consent.signed ? (
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          ) : (
                            <XCircle className="h-4 w-4 text-amber-600 mr-2" />
                          )}
                          <span className="font-medium text-sm">{consent.name}</span>
                        </div>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={() => setConsentToDelete(consent.id)}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Eliminare il consenso?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Questa azione non può essere annullata.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setConsentToDelete(null)}>
                                Annulla
                              </AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteConsent}>
                                Conferma
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      
                      <div className="mt-2 text-xs text-muted-foreground">
                        <div>Firmato il: {format(new Date(consent.date), "dd/MM/yyyy")}</div>
                        {consent.expiryDate && (
                          <div>Scadenza: {format(new Date(consent.expiryDate), "dd/MM/yyyy")}</div>
                        )}
                      </div>
                      
                      {consent.documentUrl && (
                        <div className="mt-2 flex justify-end">
                          <Button 
                            variant="link" 
                            size="sm"
                            className="p-0 h-auto"
                            asChild
                          >
                            <a href={consent.documentUrl} target="_blank" rel="noopener noreferrer">
                              Visualizza documento
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Card>
      </div>
      
      {/* Body Area Visualization */}
      {client.measurements.length > 0 && (
        <BodyAreaVisualization client={client} />
      )}
      
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

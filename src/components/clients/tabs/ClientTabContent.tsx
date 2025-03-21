
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Calendar, Plus, MessageSquare, Receipt, Shield, 
  Trash2, CheckCircle, XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { Client, Appointment, useCrm } from '@/context/CrmContext';

interface ClientTabContentProps {
  activeTab: string;
  client: Client;
}

const ClientTabContent: React.FC<ClientTabContentProps> = ({ activeTab, client }) => {
  const navigate = useNavigate();
  const { 
    getClientAppointments, 
    sendWhatsAppReminder,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    addConsent,
    updateConsent,
    deleteConsent
  } = useCrm();
  
  const appointments = getClientAppointments(client.id);
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);
  const [consentToDelete, setConsentToDelete] = useState<string | null>(null);

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

  const handleWhatsAppReminder = (appointment: Appointment) => {
    sendWhatsAppReminder(client.id, appointment.id);
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

  if (activeTab === "appointments") {
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
  }

  if (activeTab === "invoices") {
    return (
      <>
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
      </>
    );
  }

  if (activeTab === "consents") {
    return (
      <>
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
      </>
    );
  }

  return null;
};

export default ClientTabContent;

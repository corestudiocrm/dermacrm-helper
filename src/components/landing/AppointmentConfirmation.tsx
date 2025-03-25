
import React from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { CheckCircle2, Copy } from 'lucide-react';
import { useCrm } from '@/context/CrmContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface AppointmentConfirmationProps {
  clientId: string;
  appointmentId: string;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  clientId,
  appointmentId
}) => {
  const { getClient, appointments } = useCrm();
  
  const client = getClient(clientId);
  const appointment = appointments.find(a => a.id === appointmentId);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(clientId);
    toast.success('Codice cliente copiato negli appunti');
  };
  
  if (!client || !appointment) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 font-medium">Impossibile trovare i dettagli della prenotazione</p>
        <p className="text-sm text-muted-foreground mt-2">ID Cliente: {clientId}</p>
        <p className="text-sm text-muted-foreground">ID Appuntamento: {appointmentId}</p>
        <div className="mt-4">
          <Link to="/landing/new">
            <Button variant="outline">Torna alla pagina di prenotazione</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto p-6 space-y-6 text-center">
      <div className="mb-6 flex justify-center">
        <CheckCircle2 className="h-16 w-16 text-primary" />
      </div>
      
      <h1 className="text-2xl font-semibold text-center">Appuntamento Confermato!</h1>
      
      <div className="space-y-4 text-left">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Nome</p>
          <p className="font-medium">{client.firstName} {client.lastName}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Data e Ora</p>
          <p className="font-medium">
            {format(appointment.date, "EEEE d MMMM yyyy 'alle' HH:mm", { locale: it })}
          </p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Trattamento</p>
          <p className="font-medium">{appointment.treatment}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Dottore</p>
          <p className="font-medium">{appointment.doctor}</p>
        </div>
      </div>
      
      <div className="bg-primary/10 p-4 rounded-md mt-6">
        <p className="text-sm font-medium">Codice Cliente Univoco</p>
        <div className="flex items-center justify-center mt-1 space-x-2">
          <p className="text-primary text-lg font-semibold">{clientId}</p>
          <button onClick={copyToClipboard} className="text-muted-foreground hover:text-primary">
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Conserva con cura questo codice. Ti servirà per accedere e gestire i tuoi appuntamenti in futuro
        </p>
      </div>
      
      <div className="flex flex-col space-y-2 pt-4">
        <Link to="/landing/login">
          <Button className="w-full" variant="outline">
            Accedi con il tuo codice cliente
          </Button>
        </Link>
        
        <Link to="/landing/new">
          <Button className="w-full" variant="ghost">
            Prenota un altro appuntamento
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;

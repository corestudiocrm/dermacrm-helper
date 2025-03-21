
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Edit, Trash2, Upload } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Client, useCrm } from '@/context/CrmContext';

interface ClientHeaderProps {
  client: Client;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ client }) => {
  const { deleteClient, uploadClientAvatar } = useCrm();
  const navigate = useNavigate();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Handle delete client
  const handleDeleteClient = () => {
    deleteClient(client.id);
    navigate('/clients');
  };

  // Handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadClientAvatar(client.id, file);
    }
  };

  return (
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
  );
};

export default ClientHeader;

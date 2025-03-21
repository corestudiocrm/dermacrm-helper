
import React, { useRef } from 'react';
import { format } from 'date-fns';
import { Calendar, Phone, Mail, MapPin, FileText, Upload, Paperclip, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Client, Attachment, useCrm } from '@/context/CrmContext';

interface ClientInfoCardProps {
  client: Client;
}

const ClientInfoCard: React.FC<ClientInfoCardProps> = ({ client }) => {
  const { uploadAttachment, deleteAttachment } = useCrm();
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const [attachmentToDelete, setAttachmentToDelete] = React.useState<string | null>(null);

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

  // Function to get file icon based on type
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Paperclip className="h-4 w-4" />;
    return <Paperclip className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
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
            <Upload className="h-3.5 w-3.5 mr-1" />
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
    </div>
  );
};

export default ClientInfoCard;

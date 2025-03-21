
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Shield, Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Client, useCrm } from '@/context/CrmContext';

interface ConsentsTabContentProps {
  client: Client;
}

const ConsentsTabContent: React.FC<ConsentsTabContentProps> = ({ client }) => {
  const { addConsent, deleteConsent } = useCrm();
  const [consentToDelete, setConsentToDelete] = useState<string | null>(null);

  // Example consent for demo
  const addExampleConsent = () => {
    addConsent(client.id, {
      name: 'Consenso al trattamento dei dati personali',
      signed: Math.random() > 0.3,
      date: new Date(),
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) // 1 year
    });
  };

  // Handle consent delete
  const handleDeleteConsent = () => {
    if (consentToDelete) {
      deleteConsent(client.id, consentToDelete);
      setConsentToDelete(null);
    }
  };

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
};

export default ConsentsTabContent;

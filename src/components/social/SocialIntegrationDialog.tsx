
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Facebook } from 'lucide-react';

interface SocialIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SocialIntegrationDialog: React.FC<SocialIntegrationDialogProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState(1);
  const [fbPageId, setFbPageId] = useState('');
  const [fbAccessToken, setFbAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (step === 1 && !fbPageId) {
      toast.error('Inserisci un ID della Pagina Facebook');
      return;
    }
    
    if (step === 2 && !fbAccessToken) {
      toast.error('Inserisci un token di accesso');
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete integration
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        toast.success('Integrazione Facebook completata con successo!');
        setIsLoading(false);
        resetAndClose();
      }, 1500);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setFbPageId('');
    setFbAccessToken('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Integra i tuoi social</DialogTitle>
          <DialogDescription>
            Collega i tuoi profili social per una gestione integrata.
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <Facebook className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-medium">Facebook Lead Forms</h3>
                <p className="text-sm text-muted-foreground">Collega i form di contatto della tua pagina Facebook</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fb-page-id">ID Pagina Facebook</Label>
              <Input 
                id="fb-page-id" 
                value={fbPageId}
                onChange={(e) => setFbPageId(e.target.value)}
                placeholder="Es. 123456789012345"
              />
              <p className="text-xs text-muted-foreground">
                Puoi trovare l'ID della pagina nelle impostazioni della tua pagina Facebook
              </p>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <Facebook className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-medium">Accesso API Facebook</h3>
                <p className="text-sm text-muted-foreground">Inserisci il token di accesso per l'API di Facebook</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fb-token">Token di accesso</Label>
              <Input 
                id="fb-token" 
                value={fbAccessToken}
                onChange={(e) => setFbAccessToken(e.target.value)}
                placeholder="Inserisci il token di accesso"
                type="password"
              />
              <p className="text-xs text-muted-foreground">
                Genera un token di accesso dal Facebook Developers Dashboard
              </p>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <Facebook className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-medium">Conferma integrazione</h3>
                <p className="text-sm text-muted-foreground">Rivedi i dati e conferma l'integrazione</p>
              </div>
            </div>
            
            <div className="rounded-md bg-muted p-4 space-y-2">
              <div>
                <span className="text-sm font-medium">ID Pagina Facebook:</span>
                <span className="text-sm ml-2">{fbPageId}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Token di accesso:</span>
                <span className="text-sm ml-2">••••••••••••••••</span>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
          {step > 1 && (
            <Button 
              variant="outline" 
              onClick={() => setStep(step - 1)}
              className="mb-2 sm:mb-0"
            >
              Indietro
            </Button>
          )}
          
          <Button onClick={handleNext} disabled={isLoading}>
            {isLoading ? (
              "Integrazione in corso..."
            ) : step < 3 ? (
              "Continua"
            ) : (
              "Completa integrazione"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SocialIntegrationDialog;

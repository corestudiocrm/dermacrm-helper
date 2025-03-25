
import React, { useState } from 'react';
import { useCrm } from '@/context/CrmContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, User, MessageSquare, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClientCodeFinder: React.FC = () => {
  const { clients } = useCrm();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundClient, setFoundClient] = useState<null | {
    id: string;
    firstName: string;
    lastName: string;
  }>(null);
  const [notFound, setNotFound] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setNotFound(false);
    setFoundClient(null);
    
    // Simulate search delay
    setTimeout(() => {
      const matchedClient = clients.find(client => {
        const firstNameMatch = client.firstName.toLowerCase() === firstName.toLowerCase();
        const lastNameMatch = client.lastName.toLowerCase() === lastName.toLowerCase();
        const phoneMatch = client.phone === phone;
        
        // Match needs to have phone + at least one name
        return phoneMatch && (firstNameMatch || lastNameMatch);
      });
      
      if (matchedClient) {
        setFoundClient({
          id: matchedClient.id,
          firstName: matchedClient.firstName,
          lastName: matchedClient.lastName
        });
      } else {
        setNotFound(true);
      }
      
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div>
      {!showChat ? (
        <Button 
          variant="outline" 
          onClick={() => setShowChat(true)}
          className="w-full flex items-center justify-center"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Non ricordi il tuo codice cliente?
        </Button>
      ) : (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border rounded-lg p-4 bg-card shadow-sm"
        >
          <div className="mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            <h3 className="text-md font-medium">Trova il tuo codice cliente</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto" 
              onClick={() => setShowChat(false)}
            >
              Chiudi
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Inserisci le tue informazioni per recuperare il tuo codice cliente.
          </p>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="firstName">Nome</Label>
              <Input 
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Mario"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName">Cognome</Label>
              <Input 
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Rossi"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Numero di telefono</Label>
              <Input 
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="123456789"
              />
            </div>
            
            <Button 
              onClick={handleSearch} 
              disabled={!firstName || !lastName || !phone || isSearching}
              className="w-full"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Ricerca in corso...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Trova il mio codice
                </>
              )}
            </Button>
          </div>
          
          <AnimatePresence>
            {foundClient && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3 bg-primary/10 rounded-md border border-primary/20"
              >
                <div className="flex items-center">
                  <User className="h-5 w-5 text-primary mr-2" />
                  <span className="font-medium">Cliente trovato!</span>
                </div>
                <p className="text-sm mt-2">
                  {foundClient.firstName} {foundClient.lastName}, il tuo codice cliente è:
                </p>
                <div className="mt-1 p-2 bg-white rounded border font-mono text-center font-medium">
                  {foundClient.id}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Usa questo codice per accedere alla tua area personale.
                </p>
              </motion.div>
            )}
            
            {notFound && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3 bg-destructive/10 rounded-md border border-destructive/20"
              >
                <p className="text-sm">
                  Non abbiamo trovato un cliente con queste informazioni. Verifica che i dati inseriti siano corretti o contatta lo studio.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 w-full"
                  asChild
                >
                  <a href="/landing/new">
                    Prenota come nuovo cliente
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default ClientCodeFinder;

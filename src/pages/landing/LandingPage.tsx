
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserPlus, User, ArrowRight } from 'lucide-react';

import LandingHeader from '@/components/landing/LandingHeader';
import ClientCodeFinder from '@/components/landing/ClientCodeFinder';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <LandingHeader title="Benvenuto a CoreStudio CRM" />
      
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Banner per accesso operatori */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Button 
              asChild 
              variant="outline" 
              className="w-full bg-primary/10 hover:bg-primary/20 rounded-lg p-4 shadow-sm border border-primary/20"
            >
              <Link to="/" className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-primary-foreground">Area Operatori</h2>
                  <p className="text-sm text-muted-foreground">
                    
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary hover:text-primary/80">
                  Clicca qui per accedere all'esperienza Operatore Studio
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm border p-8"
          >
            <h2 className="text-2xl font-semibold text-center mb-8">
              Come possiamo aiutarti oggi?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-primary/5 hover:bg-primary/10 transition-colors rounded-lg p-6 border border-primary/20">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <UserPlus className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Nuovo Paziente</h3>
                  <p className="text-muted-foreground mb-6">
                    Non hai ancora un codice paziente? Prenota il tuo primo appuntamento e crea un nuovo profilo.
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <Link to="/landing/new" className="flex items-center justify-center">
                      Nuovo Appuntamento
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted hover:bg-muted/80 transition-colors rounded-lg p-6 border">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-muted-foreground/20 flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Già Paziente</h3>
                  <p className="text-muted-foreground mb-6">
                    Hai già un codice paziente? Accedi alla tua area personale per visualizzare o prenotare appuntamenti.
                  </p>
                  <Button variant="outline" asChild size="lg" className="w-full">
                    <Link to="/landing/login" className="flex items-center justify-center">
                      Accedi all'Area Pazienti
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <div className="mt-6 w-full">
                    <ClientCodeFinder />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t">
        <p>© {new Date().getFullYear()} Core Studio. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

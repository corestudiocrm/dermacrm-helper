
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Bell } from 'lucide-react';

import LandingHeader from '@/components/landing/LandingHeader';
import ClientVerification from '@/components/landing/ClientVerification';
import ClientAppointments from '@/components/landing/ClientAppointments';
import { useCrm } from '@/context/CrmContext';

const ExistingClientLanding: React.FC = () => {
  const [verifiedClientId, setVerifiedClientId] = useState<string | null>(null);
  const { getClient } = useCrm();
  
  const client = verifiedClientId ? getClient(verifiedClientId) : null;
  
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <LandingHeader title="Area Clienti" />
      
      <main className="flex-1 py-6 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {!verifiedClientId ? (
            <div className="bg-white rounded-lg shadow-sm border p-6 max-w-md mx-auto">
              <ClientVerification onVerificationSuccess={setVerifiedClientId} />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {client && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">
                          {client.firstName} {client.lastName}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Codice cliente: {client.id}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="bg-white rounded-lg shadow-sm border p-6">
                        <ClientAppointments clientId={client.id} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
                        <div>
                          <h3 className="text-lg font-medium flex items-center">
                            <Bell className="h-5 w-5 mr-2 text-primary" />
                            Promemoria
                          </h3>
                          
                          <div className="mt-4">
                            <div className="rounded-md bg-primary/10 p-4">
                              <p className="text-sm">
                                Ricorda di portare con te tutti i referti medici precedenti al tuo prossimo appuntamento.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-primary" />
                            Suggerimenti
                          </h3>
                          
                          <div className="mt-4">
                            <div className="rounded-md bg-muted p-4">
                              <p className="text-sm">
                                In base ai tuoi trattamenti precedenti, potrebbe interessarti un check-up completo della pelle. 
                              </p>
                              <a
                                href="/landing/new"
                                className="text-sm text-primary hover:underline mt-2 inline-block"
                              >
                                Prenota ora
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t">
        <p>© {new Date().getFullYear()} Studio Dermatologico. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

export default ExistingClientLanding;

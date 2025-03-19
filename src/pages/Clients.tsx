
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useCrm } from '@/context/CrmContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import PageTransition from '@/components/layout/PageTransition';
import ClientsList from '@/components/clients/ClientsList';
import ClientForm from '@/components/clients/ClientForm';
import ClientDetails from '@/components/clients/ClientDetails';

const Clients: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const { clients, getClient } = useCrm();
  const navigate = useNavigate();
  
  // Parse the path to determine action
  const isNewPath = location.pathname.includes('/clients/new');
  const isEditPath = location.pathname.includes('/edit');
  
  const client = id ? getClient(id) : undefined;
  
  // Redirect if client not found (except for "new" path)
  if (id && !client && !isNewPath) {
    navigate('/clients');
    return null;
  }
  
  return (
    <PageTransition>
      <div className="space-y-6">
        {!id && !isNewPath ? (
          // Client list
          <>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Clienti</h1>
              <p className="text-muted-foreground mt-1">
                Gestisci l'anagrafica e la storia clinica dei tuoi pazienti
              </p>
            </div>
            <ClientsList />
          </>
        ) : isNewPath ? (
          // New client form
          <>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Nuovo Cliente</h1>
              <p className="text-muted-foreground mt-1">
                Aggiungi un nuovo paziente al sistema
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Dati cliente</CardTitle>
                <CardDescription>
                  Inserisci i dati anagrafici e le note mediche del paziente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClientForm />
              </CardContent>
            </Card>
          </>
        ) : isEditPath ? (
          // Edit client form
          <>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Modifica Cliente</h1>
              <p className="text-muted-foreground mt-1">
                Aggiorna i dati del paziente
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Dati cliente</CardTitle>
                <CardDescription>
                  Modifica i dati anagrafici e le note mediche del paziente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ClientForm client={client} />
              </CardContent>
            </Card>
          </>
        ) : (
          // Client details
          <ClientDetails client={client!} />
        )}
      </div>
    </PageTransition>
  );
};

export default Clients;

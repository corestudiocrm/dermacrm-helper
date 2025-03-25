
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, User, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCrm, Client } from '@/context/CrmContext';
import { format } from 'date-fns';

const ClientsList: React.FC = () => {
  const { clients, getClientAppointments } = useCrm();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter clients based on search query
  const filteredClients = clients.filter(client => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || 
           client.email?.toLowerCase().includes(query) || 
           client.phone.includes(query) ||
           client.id.toLowerCase().includes(query);
  });

  // Sort clients by creation date (assuming id is timestamp-based)
  const sortedClients = [...filteredClients].sort((a, b) => {
    return parseInt(b.id) - parseInt(a.id); // Sort by id (descending)
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cerca cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Button onClick={() => navigate('/clients/new')} className="shrink-0">
          <UserPlus className="h-4 w-4 mr-2" />
          Nuovo Cliente
        </Button>
      </div>

      {sortedClients.length === 0 ? (
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">Nessun cliente trovato</h3>
          <p className="text-muted-foreground mt-2">
            {searchQuery 
              ? "Non ci sono clienti che corrispondono alla tua ricerca." 
              : "Inizia aggiungendo un nuovo cliente."}
          </p>
          {!searchQuery && (
            <Button 
              variant="outline" 
              onClick={() => navigate('/clients/new')} 
              className="mt-4"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Aggiungi cliente
            </Button>
          )}
        </div>
      ) : (
        <motion.div 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {sortedClients.map((client) => {
            const appointments = getClientAppointments(client.id);
            const nextAppointment = appointments.length > 0 
              ? appointments.find(a => new Date(a.date) >= new Date())
              : null;
            
            return (
              <motion.div key={client.id} variants={item}>
                <Card 
                  className="h-full cursor-pointer hover:shadow-md transition-shadow duration-200"
                  onClick={() => navigate(`/clients/${client.id}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{client.firstName} {client.lastName}</CardTitle>
                      <Badge variant="outline" className="text-xs font-mono">
                        ID: {client.id.substring(0, 8)}
                      </Badge>
                    </div>
                    <CardDescription>
                      {format(new Date(client.birthDate), "dd/MM/yyyy")} • {client.phone}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      {client.email && (
                        <p className="text-muted-foreground truncate">{client.email}</p>
                      )}
                      
                      {client.address && (
                        <p className="text-muted-foreground truncate">{client.address}</p>
                      )}
                      
                      <div className="flex items-center mt-2">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Appuntamenti: {appointments.length}
                        </span>
                      </div>
                      
                      {nextAppointment ? (
                        <div className="mt-3 text-xs">
                          <div className="font-medium">Prossimo appuntamento:</div>
                          <div className="text-derma-600 mt-1">
                            {format(new Date(nextAppointment.date), "dd/MM/yyyy 'alle' HH:mm")}
                          </div>
                          <div className="text-muted-foreground">{nextAppointment.treatment} con {nextAppointment.doctor}</div>
                        </div>
                      ) : (
                        <div className="mt-3 text-xs text-muted-foreground">
                          Nessun appuntamento programmato
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default ClientsList;

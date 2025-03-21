
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrm } from '@/context/CrmContext';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronRight, List, Grid, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const ClientsOverview: React.FC = () => {
  const { clients, getClientAppointments } = useCrm();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredClients = clients.filter(client => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    return fullName.includes(searchLower) || client.email.toLowerCase().includes(searchLower);
  });

  return (
    <PageTransition>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Panoramica Clienti ({clients.length})</h1>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca cliente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          <Card>
            <CardHeader>
              <CardTitle>Lista Clienti ({filteredClients.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefono</TableHead>
                    <TableHead>Appuntamenti</TableHead>
                    <TableHead>Misurazioni</TableHead>
                    <TableHead>Fatture</TableHead>
                    <TableHead>Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map(client => {
                    const appointments = getClientAppointments(client.id);
                    return (
                      <TableRow key={client.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/clients/${client.id}`)}>
                        <TableCell className="font-mono text-xs">{client.id}</TableCell>
                        <TableCell className="font-medium">{client.firstName} {client.lastName}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{appointments.length}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{client.measurements?.length || 0}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{client.invoices?.length || 0}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/clients/${client.id}`);
                          }}>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredClients.map(client => {
              const appointments = getClientAppointments(client.id);
              return (
                <Card key={client.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/clients/${client.id}`)}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-lg">{client.firstName} {client.lastName}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{client.email}</div>
                      <div className="text-sm">{client.phone}</div>
                      <div className="flex gap-2">
                        <Badge variant="outline">
                          Appuntamenti: {appointments.length}
                        </Badge>
                        <Badge variant="outline">
                          Fatture: {client.invoices?.length || 0}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default ClientsOverview;

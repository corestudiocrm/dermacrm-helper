
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UsersIcon, 
  Calendar, 
  Clock, 
  ChevronRight, 
  User, 
  CalendarPlus, 
  UserPlus,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { format, addDays, isPast, isSameDay } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCrm } from '@/context/CrmContext';
import PageTransition from '@/components/layout/PageTransition';
import DashboardCharts from '@/components/dashboard/DashboardCharts';

const Index: React.FC = () => {
  const { clients, appointments, getClient } = useCrm();
  const navigate = useNavigate();
  
  // Get today's and upcoming appointments
  const today = new Date();
  
  const todayAppointments = appointments
    .filter(appointment => isSameDay(new Date(appointment.date), today))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const upcomingAppointments = appointments
    .filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return !isPast(appointmentDate) && !isSameDay(appointmentDate, today);
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Benvenuto nel CRM dello studio
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={() => navigate('/clients/new')}
              className="bg-core-600 hover:bg-core-700"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Nuovo cliente
            </Button>
            <Button 
              onClick={() => navigate('/appointments/new')}
              className="bg-core-600 hover:bg-core-700"
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              Nuovo appuntamento
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg font-medium">
                <UsersIcon className="mr-2 h-5 w-5 text-core-600" />
                Clienti
              </CardTitle>
              <CardDescription>Gestione anagrafica clienti</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{clients.length}</div>
              <p className="text-sm text-muted-foreground">
                Clienti registrati nel sistema
              </p>
            </CardContent>
            <CardFooter className="pb-4">
              <Button 
                variant="ghost" 
                className="w-full text-core-700 hover:text-core-800 hover:bg-core-50"
                onClick={() => navigate('/clients')}
              >
                Visualizza tutti i clienti
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg font-medium">
                <Calendar className="mr-2 h-5 w-5 text-core-600" />
                Appuntamenti
              </CardTitle>
              <CardDescription>Gestione appuntamenti</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{appointments.length}</div>
              <p className="text-sm text-muted-foreground">
                Appuntamenti programmati
              </p>
            </CardContent>
            <CardFooter className="pb-4">
              <Button 
                variant="ghost" 
                className="w-full text-core-700 hover:text-core-800 hover:bg-core-50"
                onClick={() => navigate('/appointments')}
              >
                Visualizza tutti gli appuntamenti
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg font-medium">
                <BarChart3 className="mr-2 h-5 w-5 text-core-600" />
                Performance
              </CardTitle>
              <CardDescription>Riepilogo attività</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
                <div className="text-3xl font-bold">{Math.round((appointments.length / clients.length) * 100)}%</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Tasso di appuntamenti per cliente
              </p>
            </CardContent>
            <CardFooter className="pb-4">
              <Button 
                variant="ghost" 
                className="w-full text-core-700 hover:text-core-800 hover:bg-core-50"
                onClick={() => navigate('/clients')}
              >
                Analizza clienti
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Charts section */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Analisi e statistiche</h2>
          <DashboardCharts />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1 hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg font-medium">
                <Clock className="mr-2 h-5 w-5 text-core-600" />
                Appuntamenti di oggi
              </CardTitle>
              <CardDescription>
                {todayAppointments.length === 0
                  ? "Nessun appuntamento programmato per oggi"
                  : `${todayAppointments.length} appuntamenti in programma`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.length === 0 ? (
                  <div className="text-center py-6">
                    <Calendar className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Non ci sono appuntamenti programmati per oggi
                    </p>
                  </div>
                ) : (
                  todayAppointments.map(appointment => {
                    const client = getClient(appointment.clientId);
                    if (!client) return null;
                    
                    return (
                      <div 
                        key={appointment.id}
                        className="flex items-center justify-between p-3 rounded-md border cursor-pointer hover:shadow-sm transition-shadow bg-white"
                        onClick={() => navigate(`/appointments/${appointment.id}`)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="min-w-[44px] h-10 flex flex-col items-center justify-center rounded-md bg-core-50 text-core-700">
                            <div className="text-sm font-medium">
                              {format(new Date(appointment.date), "HH:mm")}
                            </div>
                          </div>
                          
                          <div>
                            <div className="font-medium">
                              {client.firstName} {client.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <User className="mr-1 h-3 w-3" />
                              {appointment.doctor}, {appointment.treatment}
                            </div>
                          </div>
                        </div>
                        
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
            {todayAppointments.length > 0 && (
              <CardFooter className="pb-4">
                <Button 
                  variant="ghost" 
                  className="w-full text-core-700 hover:text-core-800 hover:bg-core-50"
                  onClick={() => navigate('/appointments')}
                >
                  Visualizza tutti gli appuntamenti
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            )}
          </Card>
          
          <Card className="col-span-1 hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg font-medium">
                <Calendar className="mr-2 h-5 w-5 text-core-600" />
                Prossimi appuntamenti
              </CardTitle>
              <CardDescription>
                Appuntamenti in programma nei prossimi giorni
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-6">
                    <Calendar className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Non ci sono appuntamenti programmati per i prossimi giorni
                    </p>
                  </div>
                ) : (
                  upcomingAppointments.map(appointment => {
                    const client = getClient(appointment.clientId);
                    if (!client) return null;
                    
                    const isUpcomingDays = isSameDay(
                      new Date(appointment.date),
                      addDays(today, 1)
                    ) || isSameDay(
                      new Date(appointment.date),
                      addDays(today, 2)
                    );
                    
                    return (
                      <div 
                        key={appointment.id}
                        className="flex items-center justify-between p-3 rounded-md border cursor-pointer hover:shadow-sm transition-shadow bg-white"
                        onClick={() => navigate(`/appointments/${appointment.id}`)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="min-w-[44px] h-10 flex flex-col items-center justify-center rounded-md bg-core-50 text-core-700">
                            <div className="text-xs text-muted-foreground">
                              {isUpcomingDays 
                                ? format(new Date(appointment.date), "EEE") 
                                : format(new Date(appointment.date), "dd/MM")}
                            </div>
                            <div className="text-sm font-medium">
                              {format(new Date(appointment.date), "HH:mm")}
                            </div>
                          </div>
                          
                          <div>
                            <div className="font-medium">
                              {client.firstName} {client.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {appointment.treatment}
                            </div>
                          </div>
                        </div>
                        
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
            {upcomingAppointments.length > 0 && (
              <CardFooter className="pb-4">
                <Button 
                  variant="ghost" 
                  className="w-full text-core-700 hover:text-core-800 hover:bg-core-50"
                  onClick={() => navigate('/appointments')}
                >
                  Visualizza tutti gli appuntamenti
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;

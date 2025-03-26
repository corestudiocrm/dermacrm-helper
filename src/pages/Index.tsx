
import React from 'react';
import { format, addDays, isPast, isSameDay } from 'date-fns';
import { useCrm } from '@/context/CrmContext';
import PageTransition from '@/components/layout/PageTransition';
import DashboardCharts from '@/components/dashboard/DashboardCharts';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatisticsSection from '@/components/dashboard/StatisticsSection';
import AppointmentsList from '@/components/dashboard/AppointmentsList';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const { clients, appointments, getClient } = useCrm();
  
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
        {/* Banner per accesso pazienti */}
        <Button 
          asChild 
          variant="default" 
          className="w-full bg-derma-100 hover:bg-derma-200 rounded-lg p-4 shadow-sm border border-derma-200"
        >
          <Link to="/landing" className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-derma-800">Portale Pazienti</h2>
              <p className="text-sm text-derma-700">
                I tuoi pazienti possono prenotare appuntamenti e visualizzare le loro informazioni
              </p>
            </div>
            <div className="flex items-center gap-2 text-derma-600 hover:text-derma-700">
              Clicca qui per accedere all'esperienza paziente
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </Button>
        
        <DashboardHeader />
        
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Statistiche</h2>
          <Button variant="outline" asChild>
            <Link to="/clients-overview">
              <Users className="h-4 w-4 mr-2" />
              Visualizza tutti i clienti ({clients.length})
            </Link>
          </Button>
        </div>
        
        <StatisticsSection clients={clients} appointments={appointments} />
        
        {/* Charts section */}
        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">Analisi e statistiche</h2>
          <DashboardCharts />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <AppointmentsList
            appointments={todayAppointments}
            getClient={getClient}
            title="Appuntamenti di oggi"
            description={
              todayAppointments.length === 0
                ? "Nessun appuntamento programmato per oggi"
                : `${todayAppointments.length} appuntamenti in programma`
            }
            emptyMessage="Non ci sono appuntamenti programmati per oggi"
            today={today}
            type="today"
          />
          
          <AppointmentsList
            appointments={upcomingAppointments}
            getClient={getClient}
            title="Prossimi appuntamenti"
            description="Appuntamenti in programma nei prossimi giorni"
            emptyMessage="Non ci sono appuntamenti programmati per i prossimi giorni"
            today={today}
            type="upcoming"
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;

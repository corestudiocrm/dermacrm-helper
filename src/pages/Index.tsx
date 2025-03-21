
import React from 'react';
import { format, addDays, isPast, isSameDay } from 'date-fns';
import { useCrm } from '@/context/CrmContext';
import PageTransition from '@/components/layout/PageTransition';
import DashboardCharts from '@/components/dashboard/DashboardCharts';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatisticsSection from '@/components/dashboard/StatisticsSection';
import AppointmentsList from '@/components/dashboard/AppointmentsList';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
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

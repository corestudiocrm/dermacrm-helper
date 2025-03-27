
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
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Index: React.FC = () => {
  const { clients, appointments, getClient } = useCrm();
  const isMobile = useIsMobile();
  
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
        {/* Improved banner for patient access - better mobile experience */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Link 
            to="/landing" 
            className="block w-full rounded-lg p-4 bg-primary/10 hover:bg-primary/20 border border-primary/20 shadow-sm transition-colors"
          >
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-between gap-3`}>
              <div className="text-center sm:text-left">
                <h2 className="text-lg font-semibold text-primary">Portale Pazienti</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Accesso riservato per i tuoi pazienti
                </p>
              </div>
              <div className="flex items-center mt-2 sm:mt-0 gap-2 text-primary hover:text-primary/80">
                <span>Accedi all'esperienza paziente</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </motion.div>
        
        <DashboardHeader />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
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

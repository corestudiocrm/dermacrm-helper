
import React from 'react';
import { UsersIcon, Calendar, BarChart3, TrendingUp } from 'lucide-react';
import StatisticsCard from './StatisticsCard';
import { Client, Appointment } from '@/context/types';

interface StatisticsSectionProps {
  clients: Client[];
  appointments: Appointment[];
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ clients, appointments }) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StatisticsCard
        icon={<UsersIcon className="mr-2 h-5 w-5 text-core-600" />}
        title="Clienti"
        description="Gestione anagrafica clienti"
        value={clients.length}
        valueDescription="Clienti registrati nel sistema"
        navigateTo="/clients"
        buttonText="Visualizza tutti i clienti"
      />
      
      <StatisticsCard
        icon={<Calendar className="mr-2 h-5 w-5 text-core-600" />}
        title="Appuntamenti"
        description="Gestione appuntamenti"
        value={appointments.length}
        valueDescription="Appuntamenti programmati"
        navigateTo="/appointments"
        buttonText="Visualizza tutti gli appuntamenti"
      />
      
      <StatisticsCard
        icon={<BarChart3 className="mr-2 h-5 w-5 text-core-600" />}
        title="Performance"
        description="Riepilogo attività"
        value={
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-emerald-500" />
            <span>{Math.round((appointments.length / clients.length) * 100)}%</span>
          </div>
        }
        valueDescription="Tasso di appuntamenti per cliente"
        navigateTo="/clients"
        buttonText="Analizza clienti"
      />
    </div>
  );
};

export default StatisticsSection;

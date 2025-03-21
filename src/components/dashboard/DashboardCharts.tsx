
import React from 'react';
import { useCrm } from '@/context/CrmContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WeeklyMonthlyChart from './charts/WeeklyMonthlyChart';
import TreatmentDistributionChart from './charts/TreatmentDistributionChart';
import DoctorDistributionChart from './charts/DoctorDistributionChart';

const DashboardCharts: React.FC = () => {
  const { appointments, treatments } = useCrm();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Trend degli appuntamenti</CardTitle>
          <CardDescription>Visualizzazione settimanale/mensile</CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyMonthlyChart appointments={appointments} />
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Distribuzione trattamenti</CardTitle>
          <CardDescription>Tipologie di trattamenti più frequenti</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="h-[320px] w-full">
            <TreatmentDistributionChart 
              appointments={appointments} 
              treatments={treatments} 
            />
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Distribuzione per medico</CardTitle>
          <CardDescription>Appuntamenti gestiti per medico</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <DoctorDistributionChart appointments={appointments} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;

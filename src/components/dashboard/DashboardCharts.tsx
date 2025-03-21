import React, { useMemo } from 'react';
import { format, startOfWeek, addDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { it } from 'date-fns/locale';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  PieChart,
  Pie,
  Cell
} from 'recharts';

import { useCrm } from '@/context/CrmContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

// Define the chart configuration for the appointment types chart
const appointmentTypesConfig = {
  laser: { label: 'Laser', theme: { light: '#8B5CF6', dark: '#A78BFA' } },
  chemical: { label: 'Chemical Peel', theme: { light: '#EC4899', dark: '#F472B6' } },
  micro: { label: 'Microdermabrasion', theme: { light: '#14B8A6', dark: '#2DD4BF' } },
  botox: { label: 'Botox', theme: { light: '#F59E0B', dark: '#FBBF24' } },
  filler: { label: 'Filler', theme: { light: '#06B6D4', dark: '#22D3EE' } },
  meso: { label: 'Mesotherapy', theme: { light: '#8B5CF6', dark: '#A78BFA' } },
  consultation: { label: 'Consultation', theme: { light: '#6366F1', dark: '#818CF8' } },
  followup: { label: 'Follow-up', theme: { light: '#10B981', dark: '#34D399' } },
};

// Define the chart configuration for the weekly appointments chart
const weeklyConfig = {
  appointments: { label: 'Appointments', theme: { light: '#8B5CF6', dark: '#A78BFA' } },
};

// Define the chart configuration for the doctor distribution chart
const doctorConfig = {
  rossi: { label: 'Dr. Rossi', theme: { light: '#8B5CF6', dark: '#A78BFA' } },
  bianchi: { label: 'Dr. Bianchi', theme: { light: '#EC4899', dark: '#F472B6' } },
  verdi: { label: 'Dr. Verdi', theme: { light: '#14B8A6', dark: '#2DD4BF' } },
  ferrari: { label: 'Dr. Ferrari', theme: { light: '#F59E0B', dark: '#FBBF24' } },
};

const DashboardCharts: React.FC = () => {
  const { appointments, treatments } = useCrm();

  // Function to get the current week's data
  const getWeeklyData = useMemo(() => {
    const today = new Date();
    const startWeek = startOfWeek(today, { weekStartsOn: 1 }); // Week starts on Monday
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(startWeek, i);
      const dayCount = appointments.filter(app => 
        isSameDay(new Date(app.date), day)
      ).length;
      
      weekDays.push({
        name: format(day, 'EEE', { locale: it }),
        appointments: dayCount,
        date: day,
      });
    }
    
    return weekDays;
  }, [appointments]);

  // Function to get monthly data
  const getMonthlyData = useMemo(() => {
    const today = new Date();
    const firstDay = startOfMonth(today);
    const lastDay = endOfMonth(today);
    const days = eachDayOfInterval({ start: firstDay, end: lastDay });

    const monthDays = days.map(day => {
      const dayCount = appointments.filter(app => 
        isSameDay(new Date(app.date), day)
      ).length;
      
      return {
        name: format(day, 'd'),
        appointments: dayCount,
        date: day,
      };
    });
    
    return monthDays;
  }, [appointments]);

  // Data for appointment types distribution
  const appointmentTypesData = useMemo(() => {
    const counts: Record<string, number> = {};
    
    treatments.forEach(treatment => {
      // Initialize each treatment type
      counts[treatment.toLowerCase().replace('-', '')] = 0;
    });
    
    appointments.forEach(appointment => {
      const type = appointment.treatment.toLowerCase().replace(' ', '');
      if (counts[type] !== undefined) {
        counts[type]++;
      }
    });
    
    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));
  }, [appointments, treatments]);

  // Data for doctor distribution
  const doctorDistributionData = useMemo(() => {
    const counts: Record<string, number> = {
      rossi: 0,
      bianchi: 0,
      verdi: 0,
      ferrari: 0
    };
    
    appointments.forEach(appointment => {
      const doctorName = appointment.doctor.toLowerCase().split(' ')[1];
      if (counts[doctorName] !== undefined) {
        counts[doctorName]++;
      }
    });
    
    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));
  }, [appointments]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Trend degli appuntamenti</CardTitle>
          <CardDescription>Visualizzazione settimanale/mensile</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="week" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="week">Settimanale</TabsTrigger>
              <TabsTrigger value="month">Mensile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="week" className="h-[300px]">
              <ChartContainer config={weeklyConfig}>
                <LineChart data={getWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'auto']} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent 
                        labelFormatter={(label, payload) => {
                          if (payload && payload[0]) {
                            const dataPoint = getWeeklyData.find(d => d.name === label);
                            return dataPoint ? format(dataPoint.date, 'dd MMMM yyyy', { locale: it }) : label;
                          }
                          return label;
                        }}
                      />
                    }
                  />
                  <Line 
                    type="monotone" 
                    dataKey="appointments" 
                    name="appointments"
                    activeDot={{ r: 6 }} 
                    strokeWidth={3}
                  />
                </LineChart>
              </ChartContainer>
            </TabsContent>
            
            <TabsContent value="month" className="h-[300px]">
              <ChartContainer config={weeklyConfig}>
                <BarChart data={getMonthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'auto']} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent 
                        labelFormatter={(label, payload) => {
                          if (payload && payload[0]) {
                            const dataPoint = getMonthlyData.find(d => d.name === label);
                            return dataPoint ? format(dataPoint.date, 'dd MMMM yyyy', { locale: it }) : label;
                          }
                          return label;
                        }}
                      />
                    }
                  />
                  <Bar 
                    dataKey="appointments" 
                    name="appointments"
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Distribuzione trattamenti</CardTitle>
          <CardDescription>Tipologie di trattamenti eseguiti</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="h-[300px] w-full">
            <ChartContainer config={appointmentTypesConfig}>
              <PieChart>
                <Pie
                  data={appointmentTypesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={(entry) => {
                    const treatment = entry.name.toLowerCase();
                    const config = appointmentTypesConfig[treatment as keyof typeof appointmentTypesConfig];
                    return config ? config.label : entry.name;
                  }}
                >
                  {appointmentTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent 
                      labelFormatter={(label) => {
                        if (label) {
                          const treatment = label.toString().toLowerCase();
                          const config = appointmentTypesConfig[treatment as keyof typeof appointmentTypesConfig];
                          return config ? config.label : label;
                        }
                        return label;
                      }}
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
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
            <ChartContainer config={doctorConfig}>
              <BarChart data={doctorDistributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tickFormatter={(value) => {
                    const config = doctorConfig[value as keyof typeof doctorConfig];
                    return config ? config.label : value;
                  }}
                />
                <YAxis domain={[0, 'auto']} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent 
                      labelFormatter={(label) => {
                        if (label) {
                          const config = doctorConfig[label.toString() as keyof typeof doctorConfig];
                          return config ? config.label : label;
                        }
                        return label;
                      }}
                    />
                  }
                />
                <Bar 
                  dataKey="value" 
                  name="value"
                  radius={[4, 4, 0, 0]} 
                >
                  {doctorDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;

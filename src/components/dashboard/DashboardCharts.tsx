
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
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

import { useCrm } from '@/context/CrmContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

// Enhanced color palette with better contrast
const COLORS = ['#8884d8', '#82ca9d', '#ff8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#6C5CE7'];

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
  appointments: { label: 'Appuntamenti', theme: { light: '#8B5CF6', dark: '#A78BFA' } },
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
      counts[treatment.toLowerCase().replace(' ', '')] = 0;
    });
    
    appointments.forEach(appointment => {
      const type = appointment.treatment.toLowerCase().replace(' ', '');
      if (counts[type] !== undefined) {
        counts[type]++;
      }
    });
    
    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
      label: key
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
      value: counts[key],
      label: doctorConfig[key as keyof typeof doctorConfig]?.label || key
    }));
  }, [appointments]);

  const customTooltipFormatter = (value: number, name: string) => {
    return [`${value}`, 'Appuntamenti'];
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    if (percent < 0.05) return null;
    
    const treatment = name.toLowerCase();
    const config = appointmentTypesConfig[treatment as keyof typeof appointmentTypesConfig];
    const displayName = config ? config.label : name;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#fff" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${displayName} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    formatter={customTooltipFormatter}
                    labelFormatter={(label) => {
                      const dataPoint = getWeeklyData.find(d => d.name === label);
                      return dataPoint ? format(dataPoint.date, 'dd MMMM yyyy', { locale: it }) : label;
                    }}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #f1f1f1',
                      borderRadius: '6px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="appointments" 
                    name="Appuntamenti"
                    stroke="#8B5CF6" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={3}
                    dot={{ stroke: '#8B5CF6', strokeWidth: 2, r: 4, fill: 'white' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="month" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getMonthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    formatter={customTooltipFormatter}
                    labelFormatter={(label) => {
                      const dataPoint = getMonthlyData.find(d => d.name === label);
                      return dataPoint ? format(dataPoint.date, 'dd MMMM yyyy', { locale: it }) : label;
                    }}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #f1f1f1',
                      borderRadius: '6px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="appointments" 
                    name="Appuntamenti"
                    fill="#8B5CF6" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
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
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {appointmentTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => {
                    // Fix: Check if name is a string before using toLowerCase
                    const treatment = typeof name === 'string' ? name.toLowerCase() : name;
                    const config = typeof treatment === 'string' ? 
                      appointmentTypesConfig[treatment as keyof typeof appointmentTypesConfig] : 
                      undefined;
                    return [value, config ? config.label : name];
                  }}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #f1f1f1',
                    borderRadius: '6px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                />
                <Legend
                  formatter={(value) => {
                    // Fix: Check if value is a string before using toLowerCase
                    const treatment = typeof value === 'string' ? value.toLowerCase() : value;
                    const config = typeof treatment === 'string' ? 
                      appointmentTypesConfig[treatment as keyof typeof appointmentTypesConfig] : 
                      undefined;
                    return config ? config.label : value;
                  }}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
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
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={doctorDistributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  tickFormatter={(value) => {
                    // Fix: Check if value is a string before trying to access config
                    const config = typeof value === 'string' ? 
                      doctorConfig[value as keyof typeof doctorConfig] : 
                      undefined;
                    return config ? config.label : value;
                  }}
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(value) => [`${value}`, 'Appuntamenti']}
                  labelFormatter={(label) => {
                    // Fix: Check if label is a string before trying to access config
                    const config = typeof label === 'string' ? 
                      doctorConfig[label as keyof typeof doctorConfig] : 
                      undefined;
                    return config ? config.label : label;
                  }}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #f1f1f1',
                    borderRadius: '6px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name="Appuntamenti"
                  fill="#8B5CF6" 
                  radius={[4, 4, 0, 0]} 
                >
                  {doctorDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;

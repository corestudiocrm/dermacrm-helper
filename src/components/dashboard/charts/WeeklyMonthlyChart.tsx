
import React, { useMemo } from 'react';
import { format, startOfWeek, addDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { it } from 'date-fns/locale';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart, 
  Bar
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Appointment } from '@/context/types';

interface WeeklyMonthlyChartProps {
  appointments: Appointment[];
}

const WeeklyMonthlyChart: React.FC<WeeklyMonthlyChartProps> = ({ appointments }) => {
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

  const customTooltipFormatter = (value: number, name: string) => {
    return [`${value}`, 'Appuntamenti'];
  };

  return (
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
              stroke="#0ea5e9" 
              activeDot={{ r: 8 }} 
              strokeWidth={3}
              dot={{ stroke: '#0ea5e9', strokeWidth: 2, r: 4, fill: 'white' }}
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
              fill="#0ea5e9" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  );
};

export default WeeklyMonthlyChart;


import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { Appointment } from '@/context/types';
import { COLORS, doctorConfig } from './config';

interface DoctorDistributionChartProps {
  appointments: Appointment[];
}

const DoctorDistributionChart: React.FC<DoctorDistributionChartProps> = ({ appointments }) => {
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

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={doctorDistributionData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis 
          dataKey="name" 
          tickFormatter={(value) => {
            // Check if value is a string before trying to access config
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
            // Check if label is a string before trying to access config
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
          fill="#0ea5e9" 
          radius={[4, 4, 0, 0]} 
        >
          {doctorDistributionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DoctorDistributionChart;

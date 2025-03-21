
import React, { useMemo } from 'react';
import { 
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { Treatment, Appointment } from '@/context/types';
import { COLORS, appointmentTypesConfig } from './config';

interface TreatmentDistributionChartProps {
  appointments: Appointment[];
  treatments: readonly Treatment[];
}

const TreatmentDistributionChart: React.FC<TreatmentDistributionChartProps> = ({ 
  appointments, 
  treatments 
}) => {
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

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    if (percent < 0.05) return null;
    
    // Check if name is a string before using toLowerCase
    const treatment = typeof name === 'string' ? name.toLowerCase() : String(name);
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
            // Check if name is a string before using toLowerCase
            const treatment = typeof name === 'string' ? name.toLowerCase() : String(name);
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
            // Check if value is a string before using toLowerCase
            const treatment = typeof value === 'string' ? value.toLowerCase() : String(value);
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
  );
};

export default TreatmentDistributionChart;

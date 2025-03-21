
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
import { COLORS } from './config';

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
    // Create a map to count treatments
    const counts: Record<string, number> = {};
    
    // Initialize all treatment types with zero
    treatments.forEach(treatment => {
      counts[treatment] = 0;
    });
    
    // Count occurrences of each treatment
    appointments.forEach(appointment => {
      const type = appointment.treatment;
      if (counts[type] !== undefined) {
        counts[type]++;
      } else {
        // Handle treatments that might not be in the predefined list
        counts[type] = (counts[type] || 0) + 1;
      }
    });
    
    // Convert to array format for Recharts and filter out zero counts
    return Object.entries(counts)
      .filter(([_, count]) => count > 0)
      .map(([name, value], index) => ({
        name,
        value,
        fill: COLORS[index % COLORS.length]
      }))
      .sort((a, b) => b.value - a.value); // Sort by frequency, most frequent first
  }, [appointments, treatments]);

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">
            <span className="font-medium">{data.value}</span> appuntamenti
          </p>
          <p className="text-xs text-muted-foreground">
            {((data.value / appointments.length) * 100).toFixed(1)}% del totale
          </p>
        </div>
      );
    }
    return null;
  };

  // Render a custom label inside the pie slices for larger segments
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Only show labels for segments that are at least 8% of the total
    if (percent < 0.08) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#ffffff" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (appointmentTypesData.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-muted-foreground">Nessun dato disponibile</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={appointmentTypesData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={({ chartWidth, chartHeight }) => Math.min(chartWidth, chartHeight) * 0.35}
          innerRadius={({ chartWidth, chartHeight }) => Math.min(chartWidth, chartHeight) * 0.2}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          paddingAngle={2}
        >
          {appointmentTypesData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]} 
              stroke="white"
              strokeWidth={1}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center"
          formatter={(value) => <span className="text-xs font-medium">{value}</span>}
          iconSize={8}
          iconType="circle"
          wrapperStyle={{ paddingTop: 10 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TreatmentDistributionChart;

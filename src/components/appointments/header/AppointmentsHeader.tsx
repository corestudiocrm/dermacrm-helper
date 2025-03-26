
import React from 'react';

interface AppointmentsHeaderProps {
  title: string;
  description: string;
}

const AppointmentsHeader: React.FC<AppointmentsHeaderProps> = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-1">
        {description}
      </p>
    </div>
  );
};

export default AppointmentsHeader;

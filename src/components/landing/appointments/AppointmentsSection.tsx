
import React from 'react';
import { Button } from '@/components/ui/button';
import AppointmentCard from './AppointmentCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppointmentsSectionProps {
  title: string;
  appointments: {
    id: string;
    date: Date;
    treatment: string;
    doctor: string;
    notes?: string;
  }[];
  isPast?: boolean;
  emptyMessage?: string;
  onCancelClick?: (appointmentId: string) => void;
  onNotesClick?: (appointmentId: string) => void;
}

const AppointmentsSection: React.FC<AppointmentsSectionProps> = ({
  title,
  appointments,
  isPast = false,
  emptyMessage = "Non hai appuntamenti",
  onCancelClick,
  onNotesClick,
}) => {
  const isMobile = useIsMobile();

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              isPast={isPast}
              onCancelClick={onCancelClick}
              onNotesClick={onNotesClick}
            />
          ))}
        </div>
      ) : (
        <div className={`bg-muted/30 rounded-lg p-6 text-center ${isMobile ? 'mx-1' : ''}`}>
          <p className="text-muted-foreground">{emptyMessage}</p>
          {!isPast && (
            <Button className="mt-4" variant="outline" asChild>
              <a href="/landing/new">Prenota un appuntamento</a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentsSection;

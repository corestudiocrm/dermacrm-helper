
import React from 'react';
import { CalendarIcon, CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
  isDayView: boolean;
  hasSearchQuery: boolean;
  currentDateIsToday: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  isDayView, 
  hasSearchQuery,
  currentDateIsToday
}) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-10">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <CalendarIcon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">
        {isDayView 
          ? `Nessun appuntamento ${currentDateIsToday ? 'oggi' : 'in questa data'}`
          : 'Nessun appuntamento trovato'}
      </h3>
      <p className="text-muted-foreground mt-2">
        {hasSearchQuery 
          ? "Non ci sono appuntamenti che corrispondono alla tua ricerca." 
          : "Inizia aggiungendo un nuovo appuntamento."}
      </p>
      <Button 
        variant="outline" 
        onClick={() => navigate('/appointments/new')} 
        className="mt-4"
      >
        <CalendarPlus className="h-4 w-4 mr-2" />
        Aggiungi appuntamento
      </Button>
    </div>
  );
};

export default EmptyState;

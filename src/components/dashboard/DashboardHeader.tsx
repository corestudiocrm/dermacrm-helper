
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Benvenuto nel CRM dello studio
        </p>
      </div>
      <div className="flex space-x-2">
        <Button 
          onClick={() => navigate('/clients/new')}
          className="bg-core-600 hover:bg-core-700"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Nuovo cliente
        </Button>
        <Button 
          onClick={() => navigate('/appointments/new')}
          className="bg-core-600 hover:bg-core-700"
        >
          <CalendarPlus className="mr-2 h-4 w-4" />
          Nuovo appuntamento
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;

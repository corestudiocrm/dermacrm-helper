
import React from 'react';
import { Search, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, isToday } from 'date-fns';
import { it } from 'date-fns/locale';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppointmentStatus } from './useAppointmentsFiltering';
import { useCrm } from '@/context/CrmContext';

interface SearchToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: 'day' | 'all';
  onViewModeChange: (mode: 'day' | 'all') => void;
  currentDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  selectedDoctorId?: string;
  onDoctorChange?: (doctorId: string) => void;
  selectedStatus?: AppointmentStatus;
  onStatusChange?: (status: AppointmentStatus) => void;
}

const SearchToolbar: React.FC<SearchToolbarProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  currentDate,
  onPreviousDay,
  onNextDay,
  onToday,
  selectedDoctorId = 'all',
  onDoctorChange,
  selectedStatus = 'all',
  onStatusChange
}) => {
  const { doctors } = useCrm();
  const doctorsOptions = [
    { id: 'all', name: 'Tutti i dottori' },
    ...doctors.map(doctor => ({ id: doctor, name: doctor }))
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cerca appuntamento..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button
            variant={viewMode === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('day')}
            className="flex-1 sm:flex-none"
          >
            Giorno
          </Button>
          <Button
            variant={viewMode === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('all')}
            className="flex-1 sm:flex-none"
          >
            Tutti
          </Button>
        </div>
      </div>
      
      {viewMode === 'day' && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={onPreviousDay}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className={isToday(currentDate) ? "bg-derma-50 text-derma-700" : ""}
              onClick={onToday}
            >
              <Calendar className="h-4 w-4 mr-2" />
              {isToday(currentDate) ? "Oggi" : format(currentDate, "EEEE d MMMM", { locale: it })}
            </Button>
            <Button variant="outline" size="icon" onClick={onNextDay}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Doctor filter */}
        <Select 
          value={selectedDoctorId} 
          onValueChange={onDoctorChange}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtra per dottore" />
          </SelectTrigger>
          <SelectContent>
            {doctorsOptions.map((doctorOption) => (
              <SelectItem key={doctorOption.id} value={doctorOption.id}>
                {doctorOption.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Status filter */}
        <Select 
          value={selectedStatus}
          onValueChange={(value) => onStatusChange?.(value as AppointmentStatus)}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtra per stato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti gli stati</SelectItem>
            <SelectItem value="upcoming">Programmati</SelectItem>
            <SelectItem value="completed">Completati</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchToolbar;

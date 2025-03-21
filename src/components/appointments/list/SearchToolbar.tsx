
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DateNavigator from './DateNavigator';

interface SearchToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'day' | 'all';
  onViewModeChange: (mode: 'day' | 'all') => void;
  currentDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
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
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <Select
          value={viewMode}
          onValueChange={(value: 'day' | 'all') => onViewModeChange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Visualizzazione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Giornaliera</SelectItem>
            <SelectItem value="all">Tutti gli appuntamenti</SelectItem>
          </SelectContent>
        </Select>
        
        {viewMode === 'day' && (
          <DateNavigator
            currentDate={currentDate}
            onPreviousDay={onPreviousDay}
            onNextDay={onNextDay}
            onToday={onToday}
          />
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4 w-full md:w-auto">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cerca appuntamento..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <Button onClick={() => navigate('/appointments/new')} className="shrink-0">
          <CalendarPlus className="h-4 w-4 mr-2" />
          Nuovo Appuntamento
        </Button>
      </div>
    </div>
  );
};

export default SearchToolbar;

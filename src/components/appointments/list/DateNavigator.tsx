
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isToday } from 'date-fns';

interface DateNavigatorProps {
  currentDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  currentDate,
  onPreviousDay,
  onNextDay,
  onToday,
}) => {
  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" size="icon" onClick={onPreviousDay}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button 
        variant={isToday(currentDate) ? "default" : "outline"} 
        className="min-w-[140px]"
        onClick={onToday}
      >
        {isToday(currentDate) ? "Oggi" : format(currentDate, "dd MMM yyyy")}
      </Button>
      
      <Button variant="outline" size="icon" onClick={onNextDay}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DateNavigator;


import React, { useState, useEffect } from 'react';
import { format, addDays, isToday, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCrm } from '@/context/CrmContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface AppointmentCalendarProps {
  onSelectTimeSlot: (date: Date) => void;
  selectedDate: Date | undefined;
  selectedTimeSlot: Date | undefined;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  onSelectTimeSlot,
  selectedDate,
  selectedTimeSlot
}) => {
  const { appointments } = useCrm();
  const [availableTimeSlots, setAvailableTimeSlots] = useState<{ time: Date; isAvailable: boolean }[]>([]);
  const [date, setDate] = useState<Date | undefined>(selectedDate || new Date());

  // Get available time slots when date changes
  useEffect(() => {
    if (!date) return;

    // This is a simplified version. In real app, would call an API
    const slots: { time: Date; isAvailable: boolean }[] = [];
    const businessHours = { start: 9, end: 18 };
    const bookedAppointments = appointments.filter(app => 
      app.date.getFullYear() === date.getFullYear() &&
      app.date.getMonth() === date.getMonth() &&
      app.date.getDate() === date.getDate()
    );
    
    // Generate slots every 30 minutes
    for (let hour = businessHours.start; hour < businessHours.end; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotTime = new Date(date);
        slotTime.setHours(hour, minute, 0, 0);
        
        // Check if the slot is already booked
        const isBooked = bookedAppointments.some(app => {
          const appTime = app.date.getTime();
          const slotTime30MinLater = new Date(slotTime.getTime() + 30 * 60 * 1000);
          
          return appTime >= slotTime.getTime() && appTime < slotTime30MinLater.getTime();
        });
        
        if (!isBooked) {
          slots.push({
            time: slotTime,
            isAvailable: true
          });
        }
      }
    }
    
    setAvailableTimeSlots(slots);
  }, [date, appointments]);

  // Handle date selection
  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    // Clear selected time slot when date changes
    if (selectedTimeSlot && newDate && !isSameDay(selectedTimeSlot, newDate)) {
      onSelectTimeSlot(new Date(0));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-medium">Seleziona data e orario</h3>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left w-full sm:w-auto",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: it }) : "Seleziona data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              disabled={(date) => date < new Date() || date > addDays(new Date(), 60)}
              locale={it}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {date && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Orari disponibili per {format(date, "EEEE d MMMM", { locale: it })}</h4>
          </div>

          {availableTimeSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {availableTimeSlots.map((slot, index) => (
                <Button
                  key={index}
                  variant={selectedTimeSlot && isSameDay(selectedTimeSlot, slot.time) && 
                          selectedTimeSlot.getHours() === slot.time.getHours() && 
                          selectedTimeSlot.getMinutes() === slot.time.getMinutes() 
                          ? "default" : "outline"}
                  className="w-full"
                  onClick={() => onSelectTimeSlot(slot.time)}
                >
                  {format(slot.time, "HH:mm")}
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border rounded-md">
              <p className="text-muted-foreground">Nessun orario disponibile per questa data</p>
              <p className="text-sm text-muted-foreground mt-2">Prova a selezionare un'altra data</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;

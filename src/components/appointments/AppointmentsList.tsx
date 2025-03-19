
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isSameDay, startOfDay, addDays, subDays, isToday, isBefore, isAfter } from 'date-fns';
import { 
  Search, 
  CalendarPlus, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCrm, Appointment } from '@/context/CrmContext';
import { Separator } from '@/components/ui/separator';

const AppointmentsList: React.FC = () => {
  const { appointments, clients, getClient } = useCrm();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
  const [viewMode, setViewMode] = useState<'day' | 'all'>('day');
  const navigate = useNavigate();

  // Filter appointments based on search query and selected date
  const filteredAppointments = appointments.filter(appointment => {
    // Filter by date if in day view
    if (viewMode === 'day' && !isSameDay(new Date(appointment.date), currentDate)) {
      return false;
    }
    
    // Get client for this appointment
    const client = getClient(appointment.clientId);
    if (!client) return false;
    
    // Filter by search query
    if (searchQuery) {
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      const query = searchQuery.toLowerCase();
      
      return fullName.includes(query) || 
             appointment.treatment.toLowerCase().includes(query) || 
             appointment.doctor.toLowerCase().includes(query);
    }
    
    return true;
  });

  // Sort appointments by date and time
  const sortedAppointments = [...filteredAppointments].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Navigate to previous/next day
  const handlePreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(startOfDay(new Date()));
  };

  // Group appointments by hour
  const groupAppointmentsByHour = (appointments: Appointment[]) => {
    const groups: Record<string, Appointment[]> = {};
    
    appointments.forEach(appointment => {
      const hour = format(new Date(appointment.date), 'HH:00');
      if (!groups[hour]) {
        groups[hour] = [];
      }
      groups[hour].push(appointment);
    });
    
    return groups;
  };
  
  const appointmentsByHour = groupAppointmentsByHour(sortedAppointments);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <Select
            value={viewMode}
            onValueChange={(value: 'day' | 'all') => setViewMode(value)}
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
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" onClick={handlePreviousDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button 
                variant={isToday(currentDate) ? "default" : "outline"} 
                className="min-w-[140px]"
                onClick={handleToday}
              >
                {isToday(currentDate) ? "Oggi" : format(currentDate, "dd MMM yyyy")}
              </Button>
              
              <Button variant="outline" size="icon" onClick={handleNextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cerca appuntamento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <Button onClick={() => navigate('/appointments/new')} className="shrink-0">
            <CalendarPlus className="h-4 w-4 mr-2" />
            Nuovo Appuntamento
          </Button>
        </div>
      </div>

      {sortedAppointments.length === 0 ? (
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <CalendarIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">
            {viewMode === 'day' 
              ? `Nessun appuntamento ${isToday(currentDate) ? 'oggi' : 'in questa data'}`
              : 'Nessun appuntamento trovato'}
          </h3>
          <p className="text-muted-foreground mt-2">
            {searchQuery 
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
      ) : (
        <motion.div 
          className="space-y-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {viewMode === 'day' ? (
            // Day view - grouped by hour
            Object.entries(appointmentsByHour)
              .sort(([hourA], [hourB]) => hourA.localeCompare(hourB))
              .map(([hour, hourAppointments]) => (
                <div key={hour} className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{hour}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hourAppointments.map(appointment => {
                      const client = getClient(appointment.clientId);
                      if (!client) return null;
                      
                      const isPast = isBefore(new Date(appointment.date), new Date());
                      
                      return (
                        <motion.div key={appointment.id} variants={item}>
                          <Card 
                            className={`cursor-pointer hover:shadow-md transition-shadow duration-200 ${
                              isPast ? 'bg-muted/30' : ''
                            }`}
                            onClick={() => navigate(`/appointments/${appointment.id}`)}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-lg">
                                    {format(new Date(appointment.date), "HH:mm")}
                                  </p>
                                  <p className="text-muted-foreground text-sm">
                                    {appointment.treatment}
                                  </p>
                                </div>
                                <Badge variant={isPast ? "outline" : "default"}>
                                  {isPast ? "Completato" : "In programma"}
                                </Badge>
                              </div>
                              
                              <Separator className="my-3" />
                              
                              <div className="space-y-1">
                                <div className="flex items-center">
                                  <User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                                  <p className="text-sm font-medium">
                                    {client.firstName} {client.lastName}
                                  </p>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {appointment.doctor}
                                </p>
                                
                                {appointment.notes && (
                                  <p className="text-xs text-muted-foreground mt-2 truncate max-w-[250px]">
                                    {appointment.notes}
                                  </p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))
          ) : (
            // All appointments view - grouped by date
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedAppointments.map(appointment => {
                const client = getClient(appointment.clientId);
                if (!client) return null;
                
                const isPast = isBefore(new Date(appointment.date), new Date());
                const isToday = isSameDay(new Date(appointment.date), new Date());
                
                return (
                  <motion.div key={appointment.id} variants={item}>
                    <Card 
                      className={`cursor-pointer hover:shadow-md transition-shadow duration-200 ${
                        isPast ? 'bg-muted/30' : ''
                      }`}
                      onClick={() => navigate(`/appointments/${appointment.id}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {isToday 
                                ? `Oggi, ${format(new Date(appointment.date), "HH:mm")}` 
                                : format(new Date(appointment.date), "dd MMM yyyy, HH:mm")}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              {appointment.treatment}
                            </p>
                          </div>
                          <Badge variant={isPast ? "outline" : "default"}>
                            {isPast ? "Completato" : "In programma"}
                          </Badge>
                        </div>
                        
                        <Separator className="my-3" />
                        
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <p className="text-sm font-medium">
                              {client.firstName} {client.lastName}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {appointment.doctor}
                          </p>
                          
                          {appointment.notes && (
                            <p className="text-xs text-muted-foreground mt-2 truncate max-w-[250px]">
                              {appointment.notes}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AppointmentsList;

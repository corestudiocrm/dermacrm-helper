import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format, addHours, addMinutes, setHours, setMinutes } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useCrm, Appointment, Treatment, Doctor } from '@/context/CrmContext';

// Define the form schema
const appointmentFormSchema = z.object({
  clientId: z.string({
    required_error: "Il cliente è obbligatorio",
  }),
  date: z.date({
    required_error: "La data è obbligatoria",
  }),
  time: z.string({
    required_error: "L'ora è obbligatoria",
  }).regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Formato ora non valido (HH:MM)",
  }),
  treatment: z.string({
    required_error: "Il trattamento è obbligatorio",
  }),
  doctor: z.string({
    required_error: "Il medico è obbligatorio",
  }),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

interface AppointmentFormProps {
  appointment?: Appointment;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ appointment }) => {
  const { 
    clients, 
    treatments, 
    doctors, 
    addAppointment, 
    updateAppointment,
    getClient 
  } = useCrm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedClientId = searchParams.get('clientId');
  const isEditing = !!appointment;

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    const interval = 30; // minutes
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        if (hour === endHour && minute > 0) continue;
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        slots.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    
    return slots;
  };
  
  const timeSlots = generateTimeSlots();
  
  // Extract time from Date object
  const getTimeFromDate = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  // Combine date and time into a single Date object
  const combineDateAndTime = (date: Date, timeString: string): Date => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  };

  // Set default values from existing appointment or use empty values
  const defaultValues: Partial<AppointmentFormValues> = {
    clientId: appointment?.clientId || preselectedClientId || '',
    date: appointment?.date || new Date(),
    time: appointment ? getTimeFromDate(new Date(appointment.date)) : '09:00',
    treatment: appointment?.treatment || '',
    doctor: appointment?.doctor || '',
    notes: appointment?.notes || '',
  };

  // Initialize form
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues,
  });
  
  // Update default values if preselectedClientId changes
  useEffect(() => {
    if (preselectedClientId && !isEditing) {
      form.setValue('clientId', preselectedClientId);
    }
  }, [preselectedClientId, form, isEditing]);

  // Form submission handler
  const onSubmit = (data: AppointmentFormValues) => {
    // Combine date and time
    const appointmentDate = combineDateAndTime(data.date, data.time);
    
    if (isEditing && appointment) {
      updateAppointment({
        ...appointment,
        clientId: data.clientId,
        date: appointmentDate,
        treatment: data.treatment as Treatment,
        doctor: data.doctor as Doctor,
        notes: data.notes || '',
      });
      navigate(`/appointments/${appointment.id}`);
    } else {
      addAppointment({
        clientId: data.clientId,
        date: appointmentDate,
        treatment: data.treatment as Treatment,
        doctor: data.doctor as Doctor,
        notes: data.notes || '',
      });
      navigate('/appointments');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Cliente</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!!preselectedClientId}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients
                          .sort((a, b) => 
                            a.lastName.localeCompare(b.lastName) || 
                            a.firstName.localeCompare(b.firstName)
                          )
                          .map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.lastName} {client.firstName}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Seleziona data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ora</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona ora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[200px]">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="treatment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trattamento</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona trattamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {treatments.map((treatment) => (
                          <SelectItem key={treatment} value={treatment}>
                            {treatment}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="doctor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medico</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona medico" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor} value={doctor}>
                            {doctor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Note aggiuntive sull'appuntamento" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end space-x-4 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => appointment ? navigate(`/appointments/${appointment.id}`) : navigate('/appointments')}
          >
            Annulla
          </Button>
          <Button type="submit">
            {isEditing ? 'Aggiorna Appuntamento' : 'Salva Appuntamento'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AppointmentForm;

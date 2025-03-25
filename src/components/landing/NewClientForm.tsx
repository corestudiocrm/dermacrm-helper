import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCrm } from '@/context/CrmContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Define the form schema
const formSchema = z.object({
  firstName: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri'),
  lastName: z.string().min(2, 'Il cognome deve contenere almeno 2 caratteri'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  phone: z.string().min(5, 'Inserisci un numero di telefono valido'),
  treatment: z.string().min(1, 'Seleziona un trattamento'),
  doctor: z.string().min(1, 'Seleziona un dottore'),
  notes: z.string().optional(),
});

interface NewClientFormProps {
  selectedTimeSlot: Date | undefined;
  onSubmitSuccess: (clientId: string, appointmentId: string) => void;
}

const NewClientForm: React.FC<NewClientFormProps> = ({ selectedTimeSlot, onSubmitSuccess }) => {
  const { treatments, doctors, bookAppointmentForNewClient, addClient } = useCrm();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      treatment: '',
      doctor: '',
      notes: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedTimeSlot) {
      form.setError('root', { message: 'Seleziona un orario per l\'appuntamento' });
      return;
    }

    const clientData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
    };

    const appointmentData = {
      date: selectedTimeSlot,
      treatment: values.treatment,
      doctor: values.doctor,
      notes: values.notes || '',
    };

    try {
      // Book appointment and create client
      const result = bookAppointmentForNewClient(
        clientData,
        appointmentData,
        addClient
      );
      
      onSubmitSuccess(result.clientId, result.appointmentId);
    } catch (error) {
      console.error("Error booking appointment:", error);
      form.setError('root', { message: 'Si è verificato un errore durante la prenotazione' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome*</FormLabel>
                <FormControl>
                  <Input placeholder="Mario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cognome*</FormLabel>
                <FormControl>
                  <Input placeholder="Rossi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="mario.rossi@esempio.it" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono*</FormLabel>
                <FormControl>
                  <Input placeholder="+39 123 456 7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="treatment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trattamento*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona un trattamento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {treatments.map((treatment: string) => (
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
                <FormLabel>Dottore*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona un dottore" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {doctors.map((doctor: string) => (
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
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Inserisci eventuali informazioni aggiuntive o richieste specifiche"
                  {...field}
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormDescription>
                Per esempio, informazioni sul tuo problema di pelle o domande per il dottore.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
        )}

        <div className="pt-4">
          <Button type="submit" className="w-full md:w-auto" size="lg">
            Prenota Appuntamento
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewClientForm;

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useCrm, Client } from '@/context/CrmContext';

// Define the form schema
const clientFormSchema = z.object({
  firstName: z.string().min(1, { message: 'Il nome è obbligatorio' }),
  lastName: z.string().min(1, { message: 'Il cognome è obbligatorio' }),
  birthDate: z.date({
    required_error: 'La data di nascita è obbligatoria',
  }),
  phone: z.string().min(1, { message: 'Il telefono è obbligatorio' }),
  email: z.string().email({ message: 'Email non valida' }).optional().or(z.literal('')),
  address: z.string().min(1, { message: "L'indirizzo è obbligatorio" }),
  medicalNotes: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

interface ClientFormProps {
  client?: Client;
  onClientSaved?: (clientId: string) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onClientSaved }) => {
  const { addClient, updateClient } = useCrm();
  const navigate = useNavigate();
  const isEditing = !!client;

  // Set default values from existing client or use empty values
  const defaultValues: Partial<ClientFormValues> = {
    firstName: client?.firstName || '',
    lastName: client?.lastName || '',
    birthDate: client?.birthDate || new Date(),
    phone: client?.phone || '',
    email: client?.email || '',
    address: client?.address || '',
    medicalNotes: client?.medicalNotes || '',
  };

  // Initialize form
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues,
  });

  // Form submission handler
  const onSubmit = (data: ClientFormValues) => {
    if (isEditing && client) {
      updateClient({
        ...client,
        ...data,
      });
      
      if (onClientSaved) {
        onClientSaved(client.id);
      } else {
        navigate(`/clients/${client.id}`);
      }
    } else {
      // Ensure all required fields are present for addClient
      const newClientData = {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        phone: data.phone,
        email: data.email || '',
        address: data.address,
        medicalNotes: data.medicalNotes || '',
      };
      
      addClient(newClientData);
      if (onClientSaved) {
        // NOTE: We don't have the ID yet as it's generated inside addClient
        // So we just signal completion without an ID
        onClientSaved('');
      } else {
        navigate('/clients');
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
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
                <FormLabel>Cognome</FormLabel>
                <FormControl>
                  <Input placeholder="Rossi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data di nascita</FormLabel>
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
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono</FormLabel>
                <FormControl>
                  <Input placeholder="+39 333 1234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mario.rossi@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indirizzo</FormLabel>
                <FormControl>
                  <Input placeholder="Via Roma 123, Milano" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="medicalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note mediche</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Inserisci note mediche o anamnesi del paziente" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end space-x-4 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => client ? navigate(`/clients/${client.id}`) : navigate('/clients')}
          >
            Annulla
          </Button>
          <Button type="submit">
            {isEditing ? 'Aggiorna Cliente' : 'Salva Cliente'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;


import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCrm } from '@/context/CrmContext';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

// Import schema and components
import { formSchema, FormValues } from './newClientForm/formSchema';
import FormSection from './newClientForm/FormSection';
import SelectSection from './newClientForm/SelectSection';
import NotesSection from './newClientForm/NotesSection';

interface NewClientFormProps {
  selectedTimeSlot: Date | undefined;
  onSubmitSuccess: (clientId: string, appointmentId: string) => void;
}

const NewClientForm: React.FC<NewClientFormProps> = ({ selectedTimeSlot, onSubmitSuccess }) => {
  const { treatments, doctors, bookAppointmentForNewClient, addClient } = useCrm();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      treatment: '',
      notes: '',
    },
  });

  const onSubmit = (values: FormValues) => {
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
      doctor: doctors[0], // Default to first doctor in the list
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
          <FormSection
            form={form}
            name="firstName"
            label="Nome*"
            placeholder="Mario"
          />

          <FormSection
            form={form}
            name="lastName"
            label="Cognome*"
            placeholder="Rossi"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSection
            form={form}
            name="email"
            label="Email*"
            placeholder="mario.rossi@esempio.it"
            type="email"
          />

          <FormSection
            form={form}
            name="phone"
            label="Telefono*"
            placeholder="+39 123 456 7890"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <SelectSection
            form={form}
            name="treatment"
            label="Trattamento*"
            placeholder="Seleziona un trattamento"
            options={treatments}
          />
        </div>

        <NotesSection form={form} />

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

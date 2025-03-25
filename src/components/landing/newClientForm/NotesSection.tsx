
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';

interface NotesSectionProps {
  form: UseFormReturn<any>;
}

const NotesSection: React.FC<NotesSectionProps> = ({ form }) => {
  return (
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
  );
};

export default NotesSection;

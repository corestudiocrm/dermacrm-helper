
import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri'),
  lastName: z.string().min(2, 'Il cognome deve contenere almeno 2 caratteri'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  phone: z.string().min(5, 'Inserisci un numero di telefono valido'),
  treatment: z.string().min(1, 'Seleziona un trattamento'),
  doctor: z.string().min(1, 'Seleziona un dottore'),
  notes: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

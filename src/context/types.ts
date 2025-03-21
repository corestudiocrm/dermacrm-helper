
// Define types
export type Treatment = 
  'Laser' | 
  'Chemical Peel' | 
  'Microdermabrasion' | 
  'Botox' | 
  'Filler' | 
  'Mesotherapy' | 
  'Consultation' | 
  'Follow-up';

export type Doctor = 
  'Dr. Rossi' | 
  'Dr. Bianchi' | 
  'Dr. Verdi' | 
  'Dr. Ferrari';

export type BodyArea = 
  'Face' | 
  'Neck' | 
  'Chest' | 
  'Back' | 
  'Arms' | 
  'Legs' | 
  'Hands' | 
  'Full Body';

export interface Measurement {
  id: string;
  area: BodyArea;
  size: number;
  treatment: Treatment;
  date: Date;
}

export interface Appointment {
  id: string;
  clientId: string;
  date: Date;
  treatment: Treatment;
  doctor: Doctor;
  notes: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  email: string;
  address: string;
  medicalNotes: string;
  measurements: Measurement[];
}

// Context interface
export interface CrmContextType {
  clients: Client[];
  appointments: Appointment[];
  addClient: (client: Omit<Client, 'id' | 'measurements'>) => void;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  getClient: (id: string) => Client | undefined;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (id: string) => void;
  getClientAppointments: (clientId: string) => Appointment[];
  addMeasurement: (clientId: string, measurement: Omit<Measurement, 'id'>) => void;
  updateMeasurement: (clientId: string, measurement: Measurement) => void;
  deleteMeasurement: (clientId: string, measurementId: string) => void;
  treatments: readonly Treatment[];
  doctors: readonly Doctor[];
  bodyAreas: readonly BodyArea[];
  sendWhatsAppReminder: (clientId: string, appointmentId: string) => void;
}

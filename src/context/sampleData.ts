
import { Client, Appointment } from './types';

// Sample data
export const sampleClients: Client[] = [
  {
    id: '1',
    firstName: 'Mario',
    lastName: 'Rossi',
    birthDate: new Date(1980, 5, 15),
    phone: '+39 333 1234567',
    email: 'mario.rossi@example.com',
    address: 'Via Roma 123, Milano',
    medicalNotes: 'Allergia al nichel. Sensibilità cutanea nella zona del viso.',
    measurements: [
      {
        id: 'm1',
        area: 'Face',
        size: 15,
        treatment: 'Laser',
        date: new Date(2023, 3, 10)
      }
    ]
  },
  {
    id: '2',
    firstName: 'Laura',
    lastName: 'Bianchi',
    birthDate: new Date(1975, 8, 22),
    phone: '+39 333 7654321',
    email: 'laura.bianchi@example.com',
    address: 'Via Dante 45, Roma',
    medicalNotes: 'Nessuna allergia nota. Precedenti trattamenti di botox.',
    measurements: []
  },
  {
    id: '3',
    firstName: 'Giuseppe',
    lastName: 'Verdi',
    birthDate: new Date(1990, 2, 7),
    phone: '+39 333 9876543',
    email: 'giuseppe.verdi@example.com',
    address: 'Via Garibaldi 67, Torino',
    medicalNotes: 'Allergia a lidocaina. Richiede anestesia alternativa.',
    measurements: [
      {
        id: 'm2',
        area: 'Back',
        size: 30,
        treatment: 'Chemical Peel',
        date: new Date(2023, 5, 20)
      }
    ]
  }
];

export const sampleAppointments: Appointment[] = [
  {
    id: 'a1',
    clientId: '1',
    date: new Date(2023, 9, 15, 10, 0),
    treatment: 'Laser',
    doctor: 'Dr. Rossi',
    notes: 'Prima sessione di trattamento laser.'
  },
  {
    id: 'a2',
    clientId: '2',
    date: new Date(2023, 9, 16, 14, 30),
    treatment: 'Botox',
    doctor: 'Dr. Bianchi',
    notes: 'Rinnovo trattamento botox.'
  },
  {
    id: 'a3',
    clientId: '1',
    date: new Date(2023, 9, 22, 11, 0),
    treatment: 'Follow-up',
    doctor: 'Dr. Rossi',
    notes: 'Controllo post trattamento laser.'
  }
];

// Available options
export const treatments = [
  'Laser', 
  'Chemical Peel', 
  'Microdermabrasion', 
  'Botox', 
  'Filler', 
  'Mesotherapy', 
  'Consultation', 
  'Follow-up'
] as const;

export const doctors = [
  'Dr. Rossi', 
  'Dr. Bianchi', 
  'Dr. Verdi', 
  'Dr. Ferrari'
] as const;

export const bodyAreas = [
  'Face', 
  'Neck', 
  'Chest', 
  'Back', 
  'Arms', 
  'Legs', 
  'Hands', 
  'Full Body'
] as const;

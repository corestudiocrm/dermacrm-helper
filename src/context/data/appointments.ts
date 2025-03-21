import { Appointment } from '../types';

// Sample appointments
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
  },
  {
    id: 'a4',
    clientId: '3',
    date: new Date(2023, 9, 18, 9, 30),
    treatment: 'Chemical Peel',
    doctor: 'Dr. Verdi',
    notes: 'Trattamento chemical peel per zona schiena.'
  },
  {
    id: 'a5',
    clientId: '4',
    date: new Date(2023, 9, 20, 16, 0),
    treatment: 'Microdermabrasion',
    doctor: 'Dr. Ferrari',
    notes: 'Follow-up dopo primo trattamento.'
  },
  {
    id: 'a6',
    clientId: '5',
    date: new Date(2023, 9, 25, 10, 30),
    treatment: 'Laser',
    doctor: 'Dr. Rossi',
    notes: 'Trattamento per macchie cutanee.'
  },
  {
    id: 'a7',
    clientId: '6',
    date: new Date(2023, 9, 25, 15, 0),
    treatment: 'Follow-up',
    doctor: 'Dr. Bianchi',
    notes: 'Controllo post trattamento laser.'
  },
  {
    id: 'a8',
    clientId: '7',
    date: new Date(2023, 10, 2, 11, 30),
    treatment: 'Chemical Peel',
    doctor: 'Dr. Verdi',
    notes: 'Seconda sessione per cicatrici acne.'
  },
  {
    id: 'a9',
    clientId: '8',
    date: new Date(2023, 10, 3, 9, 0),
    treatment: 'Consultation',
    doctor: 'Dr. Ferrari',
    notes: 'Valutazione del trattamento per rosacea.'
  },
  {
    id: 'a10',
    clientId: '9',
    date: new Date(2023, 10, 5, 14, 0),
    treatment: 'Filler',
    doctor: 'Dr. Bianchi',
    notes: 'Trattamento filler labbra.'
  },
  {
    id: 'a11',
    clientId: '10',
    date: new Date(2023, 10, 8, 16, 30),
    treatment: 'Microdermabrasion',
    doctor: 'Dr. Rossi',
    notes: 'Follow-up trattamento pelle grassa.'
  },
  {
    id: 'a12',
    clientId: '1',
    date: new Date(2023, 10, 12, 10, 0),
    treatment: 'Laser',
    doctor: 'Dr. Rossi',
    notes: 'Quarta sessione di trattamento laser.'
  },
  {
    id: 'a13',
    clientId: '4',
    date: new Date(2023, 10, 15, 11, 30),
    treatment: 'Mesotherapy',
    doctor: 'Dr. Ferrari',
    notes: 'Nuovo trattamento per idratazione profonda.'
  },
  {
    id: 'a14',
    clientId: '2',
    date: new Date(2023, 10, 18, 15, 0),
    treatment: 'Botox',
    doctor: 'Dr. Bianchi',
    notes: 'Mantenimento trattamento botox.'
  },
  {
    id: 'a15',
    clientId: '6',
    date: new Date(2023, 10, 20, 9, 30),
    treatment: 'Laser',
    doctor: 'Dr. Verdi',
    notes: 'Trattamento zona collo.'
  },
  {
    id: 'a16',
    clientId: '11',
    date: new Date(2023, 11, 5, 10, 0),
    treatment: 'Hydrafacial',
    doctor: 'Dr. Ferrari',
    notes: 'Primo trattamento Hydrafacial per pelle disidratata.'
  },
  {
    id: 'a17',
    clientId: '12',
    date: new Date(2023, 11, 5, 14, 30),
    treatment: 'Laser',
    doctor: 'Dr. Rossi',
    notes: 'Follow-up per trattamento dermatite braccia.'
  },
  {
    id: 'a18',
    clientId: '13',
    date: new Date(2023, 11, 6, 9, 0),
    treatment: 'Chemical Peel',
    doctor: 'Dr. Verdi',
    notes: 'Secondo trattamento chemical peel.'
  }
];

// Additional appointments
export const additionalAppointments: Appointment[] = [
  {
    id: 'a19',
    clientId: '14',
    date: new Date(2023, 11, 6, 16, 0),
    treatment: 'Follow-up',
    doctor: 'Dr. Bianchi',
    notes: 'Controllo post trattamento microdermoabrasione.'
  },
  {
    id: 'a20',
    clientId: '15',
    date: new Date(2023, 11, 7, 11, 30),
    treatment: 'Mesotherapy',
    doctor: 'Dr. Ferrari',
    notes: 'Trattamento depigmentante mesoterapia.'
  },
  {
    id: 'a21',
    clientId: '16',
    date: new Date(2023, 11, 7, 15, 0),
    treatment: 'Laser',
    doctor: 'Dr. Rossi',
    notes: 'Terza sessione laser cicatrici viso.'
  },
  {
    id: 'a22',
    clientId: '17',
    date: new Date(2023, 11, 8, 10, 0),
    treatment: 'Consultation',
    doctor: 'Dr. Bianchi',
    notes: 'Follow-up terapia rosacea.'
  },
  {
    id: 'a23',
    clientId: '18',
    date: new Date(2023, 11, 8, 14, 0),
    treatment: 'Chemical Peel',
    doctor: 'Dr. Verdi',
    notes: 'Secondo trattamento per iperpigmentazione.'
  },
  {
    id: 'a24',
    clientId: '19',
    date: new Date(2023, 11, 9, 9, 30),
    treatment: 'Hydrafacial',
    doctor: 'Dr. Ferrari',
    notes: 'Follow-up trattamento purificante.'
  },
  {
    id: 'a25',
    clientId: '20',
    date: new Date(2023, 11, 9, 16, 30),
    treatment: 'Laser',
    doctor: 'Dr. Rossi',
    notes: 'Controllo post trattamento psoriasi.'
  },
  {
    id: 'a26',
    clientId: '21',
    date: new Date(2023, 11, 12, 11, 0),
    treatment: 'Microneedling',
    doctor: 'Dr. Bianchi',
    notes: 'Seconda sessione microneedling cicatrici acne.'
  },
  {
    id: 'a27',
    clientId: '22',
    date: new Date(2023, 11, 12, 15, 30),
    treatment: 'Follow-up',
    doctor: 'Dr. Verdi',
    notes: 'Controllo post trattamento cheratosi.'
  },
  {
    id: 'a28',
    clientId: '23',
    date: new Date(2023, 11, 13, 10, 30),
    treatment: 'IPL',
    doctor: 'Dr. Ferrari',
    notes: 'Seconda sessione IPL macchie solari.'
  },
  {
    id: 'a29',
    clientId: '24',
    date: new Date(2023, 11, 13, 16, 0),
    treatment: 'Botox',
    doctor: 'Dr. Rossi',
    notes: 'Follow-up trattamento iperidrosi.'
  },
  {
    id: 'a30',
    clientId: '25',
    date: new Date(2023, 11, 14, 9, 0),
    treatment: 'Laser',
    doctor: 'Dr. Bianchi',
    notes: 'Seconda sessione laser vascolare.'
  },
  {
    id: 'a31',
    clientId: '11',
    date: new Date(2023, 11, 14, 14, 0),
    treatment: 'Follow-up',
    doctor: 'Dr. Ferrari',
    notes: 'Controllo post Hydrafacial.'
  },
  {
    id: 'a32',
    clientId: '13',
    date: new Date(2023, 11, 15, 11, 30),
    treatment: 'Consultation',
    doctor: 'Dr. Verdi',
    notes: 'Consulenza per nuovo trattamento.'
  },
  {
    id: 'a33',
    clientId: '15',
    date: new Date(2023, 11, 15, 16, 30),
    treatment: 'Mesotherapy',
    doctor: 'Dr. Ferrari',
    notes: 'Follow-up mesoterapia depigmentante.'
  },
  {
    id: 'a34',
    clientId: '17',
    date: new Date(2023, 11, 16, 10, 0),
    treatment: 'LED Therapy',
    doctor: 'Dr. Bianchi',
    notes: 'Trattamento LED per rosacea.'
  },
  {
    id: 'a35',
    clientId: '19',
    date: new Date(2023, 11, 16, 15, 0),
    treatment: 'Microdermabrasion',
    doctor: 'Dr. Rossi',
    notes: 'Trattamento per pori dilatati.'
  }
];

// Merge all appointments for export
export const mergedAppointments = [...sampleAppointments, ...additionalAppointments];

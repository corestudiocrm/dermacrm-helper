
import { Client, Appointment, Invoice } from './types';

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
    ],
    invoices: [
      {
        id: 'inv1',
        number: '2023/001',
        date: new Date(2023, 3, 15),
        amount: 150,
        paid: true,
        description: 'Trattamento laser viso - prima sessione'
      },
      {
        id: 'inv2',
        number: '2023/008',
        date: new Date(2023, 6, 20),
        amount: 150,
        paid: true,
        description: 'Trattamento laser viso - seconda sessione'
      },
      {
        id: 'inv3',
        number: '2023/015',
        date: new Date(2023, 9, 10),
        amount: 150,
        paid: false,
        description: 'Trattamento laser viso - terza sessione'
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
    measurements: [],
    invoices: [
      {
        id: 'inv4',
        number: '2023/002',
        date: new Date(2023, 4, 5),
        amount: 280,
        paid: true,
        description: 'Trattamento botox fronte e contorno occhi'
      },
      {
        id: 'inv5',
        number: '2023/012',
        date: new Date(2023, 8, 15),
        amount: 350,
        paid: true,
        description: 'Trattamento filler labbra'
      }
    ]
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
    ],
    invoices: [
      {
        id: 'inv6',
        number: '2023/003',
        date: new Date(2023, 5, 25),
        amount: 200,
        paid: true,
        description: 'Trattamento chemical peel schiena'
      }
    ]
  },
  {
    id: '4',
    firstName: 'Anna',
    lastName: 'Ferrari',
    birthDate: new Date(1985, 7, 12),
    phone: '+39 333 1122334',
    email: 'anna.ferrari@example.com',
    address: 'Via Mazzini 89, Bologna',
    medicalNotes: 'Pelle sensibile. Evitare trattamenti aggressivi.',
    measurements: [
      {
        id: 'm3',
        area: 'Face',
        size: 10,
        treatment: 'Microdermabrasion',
        date: new Date(2023, 6, 5)
      }
    ],
    invoices: [
      {
        id: 'inv7',
        number: '2023/004',
        date: new Date(2023, 6, 8),
        amount: 120,
        paid: true,
        description: 'Trattamento di microdermoabrasione viso'
      },
      {
        id: 'inv8',
        number: '2023/016',
        date: new Date(2023, 9, 20),
        amount: 120,
        paid: false,
        description: 'Trattamento di microdermoabrasione viso - follow-up'
      }
    ]
  },
  {
    id: '5',
    firstName: 'Lucia',
    lastName: 'Esposito',
    birthDate: new Date(1978, 4, 25),
    phone: '+39 333 5566778',
    email: 'lucia.esposito@example.com',
    address: 'Via Nazionale 45, Firenze',
    medicalNotes: 'Nessuna allergia. Iperpigmentazione zona zigomi.',
    measurements: [],
    invoices: [
      {
        id: 'inv9',
        number: '2023/005',
        date: new Date(2023, 7, 10),
        amount: 180,
        paid: true,
        description: 'Consulenza dermatologica e trattamento macchie cutanee'
      },
      {
        id: 'inv10',
        number: '2023/013',
        date: new Date(2023, 8, 28),
        amount: 220,
        paid: true,
        description: 'Trattamento laser per macchie cutanee'
      }
    ]
  },
  {
    id: '6',
    firstName: 'Marco',
    lastName: 'Romano',
    birthDate: new Date(1982, 9, 3),
    phone: '+39 333 9900112',
    email: 'marco.romano@example.com',
    address: 'Via Veneto 12, Roma',
    medicalNotes: 'Allergia ai conservanti. Dermatite zona collo.',
    measurements: [
      {
        id: 'm4',
        area: 'Neck',
        size: 8,
        treatment: 'Laser',
        date: new Date(2023, 4, 18)
      }
    ],
    invoices: [
      {
        id: 'inv11',
        number: '2023/006',
        date: new Date(2023, 4, 22),
        amount: 160,
        paid: true,
        description: 'Trattamento laser per dermatite collo'
      },
      {
        id: 'inv12',
        number: '2023/014',
        date: new Date(2023, 9, 5),
        amount: 160,
        paid: false,
        description: 'Controllo e mantenimento post-trattamento'
      }
    ]
  },
  {
    id: '7',
    firstName: 'Sara',
    lastName: 'Marini',
    birthDate: new Date(1993, 11, 15),
    phone: '+39 333 3344556',
    email: 'sara.marini@example.com',
    address: 'Via Piave 34, Milano',
    medicalNotes: 'Cicatrici acne. Nessuna allergia nota.',
    measurements: [
      {
        id: 'm5',
        area: 'Face',
        size: 12,
        treatment: 'Chemical Peel',
        date: new Date(2023, 8, 8)
      }
    ],
    invoices: [
      {
        id: 'inv13',
        number: '2023/007',
        date: new Date(2023, 8, 12),
        amount: 190,
        paid: true,
        description: 'Trattamento chemical peel per cicatrici acne'
      }
    ]
  },
  {
    id: '8',
    firstName: 'Paolo',
    lastName: 'Ricci',
    birthDate: new Date(1970, 1, 28),
    phone: '+39 333 7788990',
    email: 'paolo.ricci@example.com',
    address: 'Via Cavour 56, Napoli',
    medicalNotes: 'Rosacea. Evitare prodotti con alcol.',
    measurements: [],
    invoices: [
      {
        id: 'inv14',
        number: '2023/009',
        date: new Date(2023, 7, 5),
        amount: 140,
        paid: true,
        description: 'Consulenza specialistica per rosacea'
      },
      {
        id: 'inv15',
        number: '2023/017',
        date: new Date(2023, 9, 25),
        amount: 240,
        paid: false,
        description: 'Trattamento specifico per rosacea'
      }
    ]
  },
  {
    id: '9',
    firstName: 'Elena',
    lastName: 'Moretti',
    birthDate: new Date(1988, 5, 10),
    phone: '+39 333 1122333',
    email: 'elena.moretti@example.com',
    address: 'Via Leopardi 23, Torino',
    medicalNotes: 'Nessuna allergia nota. Desiderio di ringiovanimento.',
    measurements: [],
    invoices: [
      {
        id: 'inv16',
        number: '2023/010',
        date: new Date(2023, 7, 20),
        amount: 320,
        paid: true,
        description: 'Trattamento filler e botox combinato'
      }
    ]
  },
  {
    id: '10',
    firstName: 'Roberto',
    lastName: 'Gallo',
    birthDate: new Date(1975, 3, 17),
    phone: '+39 333 4455667',
    email: 'roberto.gallo@example.com',
    address: 'Via Garibaldi 78, Genova',
    medicalNotes: 'Pelle grassa. Zone di iperpigmentazione.',
    measurements: [
      {
        id: 'm6',
        area: 'Face',
        size: 15,
        treatment: 'Microdermabrasion',
        date: new Date(2023, 8, 15)
      }
    ],
    invoices: [
      {
        id: 'inv17',
        number: '2023/011',
        date: new Date(2023, 8, 18),
        amount: 130,
        paid: true,
        description: 'Trattamento microdermoabrasione per pelle grassa'
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

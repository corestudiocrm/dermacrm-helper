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
  },
  {
    id: '11',
    firstName: 'Valentina',
    lastName: 'Costa',
    birthDate: new Date(1992, 2, 8),
    phone: '+39 333 5566778',
    email: 'valentina.costa@example.com',
    address: 'Via Firenze 45, Bari',
    medicalNotes: 'Allergia al lattice. Pelle tendenzialmente secca.',
    measurements: [
      {
        id: 'm7',
        area: 'Face',
        size: 10,
        treatment: 'Hydrafacial',
        date: new Date(2023, 10, 5)
      }
    ],
    invoices: [
      {
        id: 'inv18',
        number: '2023/020',
        date: new Date(2023, 10, 8),
        amount: 180,
        paid: true,
        description: 'Trattamento Hydrafacial completo'
      }
    ]
  },
  {
    id: '12',
    firstName: 'Andrea',
    lastName: 'Martini',
    birthDate: new Date(1978, 5, 12),
    phone: '+39 333 9988776',
    email: 'andrea.martini@example.com',
    address: 'Via Trieste 89, Firenze',
    medicalNotes: 'Dermatite atopica trattata con corticosteroidi locali.',
    measurements: [
      {
        id: 'm8',
        area: 'Arms',
        size: 25,
        treatment: 'Laser',
        date: new Date(2023, 9, 20)
      }
    ],
    invoices: [
      {
        id: 'inv19',
        number: '2023/021',
        date: new Date(2023, 9, 25),
        amount: 220,
        paid: true,
        description: 'Trattamento laser per dermatite braccia'
      }
    ]
  },
  {
    id: '13',
    firstName: 'Giulia',
    lastName: 'Neri',
    birthDate: new Date(1990, 7, 30),
    phone: '+39 333 1122334',
    email: 'giulia.neri@example.com',
    address: 'Via Napoli 56, Roma',
    medicalNotes: 'Ipersensibilità a prodotti contenenti parabeni.',
    measurements: [
      {
        id: 'm9',
        area: 'Face',
        size: 12,
        treatment: 'Chemical Peel',
        date: new Date(2023, 10, 15)
      }
    ],
    invoices: [
      {
        id: 'inv20',
        number: '2023/022',
        date: new Date(2023, 10, 18),
        amount: 160,
        paid: false,
        description: 'Trattamento chemical peel superficiale'
      }
    ]
  },
  {
    id: '14',
    firstName: 'Marco',
    lastName: 'Vitali',
    birthDate: new Date(1985, 3, 5),
    phone: '+39 333 7788990',
    email: 'marco.vitali@example.com',
    address: 'Via Milano 23, Bologna',
    medicalNotes: 'Acne cistica in remissione. Precedente terapia con isotretinoina.',
    measurements: [
      {
        id: 'm10',
        area: 'Back',
        size: 30,
        treatment: 'Microdermabrasion',
        date: new Date(2023, 8, 10)
      }
    ],
    invoices: [
      {
        id: 'inv21',
        number: '2023/023',
        date: new Date(2023, 8, 15),
        amount: 190,
        paid: true,
        description: 'Trattamento microdermoabrasione schiena'
      },
      {
        id: 'inv22',
        number: '2023/030',
        date: new Date(2023, 10, 20),
        amount: 190,
        paid: false,
        description: 'Follow-up trattamento microdermoabrasione'
      }
    ]
  },
  {
    id: '15',
    firstName: 'Sofia',
    lastName: 'Greco',
    birthDate: new Date(1972, 9, 18),
    phone: '+39 333 5544332',
    email: 'sofia.greco@example.com',
    address: 'Via Palermo 78, Catania',
    medicalNotes: 'Melasma post-gravidanza. Evitare trattamenti aggressivi.',
    measurements: [],
    invoices: [
      {
        id: 'inv23',
        number: '2023/024',
        date: new Date(2023, 9, 5),
        amount: 150,
        paid: true,
        description: 'Consulenza dermatologica per melasma'
      },
      {
        id: 'inv24',
        number: '2023/031',
        date: new Date(2023, 10, 10),
        amount: 280,
        paid: true,
        description: 'Trattamento depigmentante specifico'
      }
    ]
  },
  {
    id: '16',
    firstName: 'Luca',
    lastName: 'Conti',
    birthDate: new Date(1988, 11, 3),
    phone: '+39 333 6677889',
    email: 'luca.conti@example.com',
    address: 'Via Genova 34, Torino',
    medicalNotes: 'Nessuna allergia. Cicatrici post-traumatiche zona zigomi.',
    measurements: [
      {
        id: 'm11',
        area: 'Face',
        size: 5,
        treatment: 'Laser',
        date: new Date(2023, 7, 25)
      }
    ],
    invoices: [
      {
        id: 'inv25',
        number: '2023/025',
        date: new Date(2023, 7, 28),
        amount: 320,
        paid: true,
        description: 'Trattamento laser cicatrici viso - prima sessione'
      },
      {
        id: 'inv26',
        number: '2023/032',
        date: new Date(2023, 9, 15),
        amount: 320,
        paid: true,
        description: 'Trattamento laser cicatrici viso - seconda sessione'
      }
    ]
  },
  {
    id: '17',
    firstName: 'Chiara',
    lastName: 'Ricci',
    birthDate: new Date(1982, 4, 20),
    phone: '+39 333 1122335',
    email: 'chiara.ricci@example.com',
    address: 'Via Venezia 56, Padova',
    medicalNotes: 'Rosacea di tipo 1. Pelle sensibile e reattiva.',
    measurements: [],
    invoices: [
      {
        id: 'inv27',
        number: '2023/026',
        date: new Date(2023, 8, 5),
        amount: 140,
        paid: true,
        description: 'Consulenza specialistica rosacea'
      },
      {
        id: 'inv28',
        number: '2023/033',
        date: new Date(2023, 10, 12),
        amount: 220,
        paid: false,
        description: 'Trattamento LED terapia per rosacea'
      }
    ]
  },
  {
    id: '18',
    firstName: 'Matteo',
    lastName: 'Mancini',
    birthDate: new Date(1975, 1, 15),
    phone: '+39 333 9988775',
    email: 'matteo.mancini@example.com',
    address: 'Via Bologna 12, Milano',
    medicalNotes: 'Iperpigmentazione post-infiammatoria. Fototipo IV.',
    measurements: [
      {
        id: 'm12',
        area: 'Face',
        size: 8,
        treatment: 'Chemical Peel',
        date: new Date(2023, 9, 8)
      }
    ],
    invoices: [
      {
        id: 'inv29',
        number: '2023/027',
        date: new Date(2023, 9, 10),
        amount: 180,
        paid: true,
        description: 'Trattamento chemical peel medio per iperpigmentazione'
      }
    ]
  },
  {
    id: '19',
    firstName: 'Francesca',
    lastName: 'Lombardi',
    birthDate: new Date(1993, 6, 28),
    phone: '+39 333 4455667',
    email: 'francesca.lombardi@example.com',
    address: 'Via Torino 45, Roma',
    medicalNotes: 'Allergia a metalli pesanti. Pelle mista tendente al grasso.',
    measurements: [
      {
        id: 'm13',
        area: 'Face',
        size: 15,
        treatment: 'Hydrafacial',
        date: new Date(2023, 10, 20)
      }
    ],
    invoices: [
      {
        id: 'inv30',
        number: '2023/028',
        date: new Date(2023, 10, 22),
        amount: 160,
        paid: false,
        description: 'Trattamento purificante pori dilatati'
      }
    ]
  },
  {
    id: '20',
    firstName: 'Davide',
    lastName: 'Santoro',
    birthDate: new Date(1987, 8, 10),
    phone: '+39 333 7788991',
    email: 'davide.santoro@example.com',
    address: 'Via Roma 67, Napoli',
    medicalNotes: 'Psoriasi lieve. Attualmente in fase di remissione.',
    measurements: [
      {
        id: 'm14',
        area: 'Legs',
        size: 40,
        treatment: 'Laser',
        date: new Date(2023, 7, 15)
      }
    ],
    invoices: [
      {
        id: 'inv31',
        number: '2023/029',
        date: new Date(2023, 7, 18),
        amount: 350,
        paid: true,
        description: 'Trattamento laser per psoriasi gambe'
      }
    ]
  },
  {
    id: '21',
    firstName: 'Elisa',
    lastName: 'Marino',
    birthDate: new Date(1983, 3, 25),
    phone: '+39 333 1122336',
    email: 'elisa.marino@example.com',
    address: 'Via Sicilia 23, Palermo',
    medicalNotes: 'Cicatrici da acne. Pelle tendente al secco.',
    measurements: [
      {
        id: 'm15',
        area: 'Face',
        size: 15,
        treatment: 'Microneedling',
        date: new Date(2023, 11, 5)
      }
    ],
    invoices: [
      {
        id: 'inv32',
        number: '2023/034',
        date: new Date(2023, 11, 8),
        amount: 250,
        paid: false,
        description: 'Trattamento microneedling viso'
      }
    ]
  },
  {
    id: '22',
    firstName: 'Antonio',
    lastName: 'Ferrari',
    birthDate: new Date(1979, 5, 12),
    phone: '+39 333 6677881',
    email: 'antonio.ferrari@example.com',
    address: 'Via Puglia 54, Bari',
    medicalNotes: 'Cheratosi attinica. Monitoraggio periodico consigliato.',
    measurements: [],
    invoices: [
      {
        id: 'inv33',
        number: '2023/035',
        date: new Date(2023, 11, 15),
        amount: 180,
        paid: true,
        description: 'Valutazione dermatologica cheratosi'
      },
      {
        id: 'inv34',
        number: '2023/042',
        date: new Date(2023, 11, 30),
        amount: 350,
        paid: false,
        description: 'Trattamento per cheratosi attinica'
      }
    ]
  },
  {
    id: '23',
    firstName: 'Maria',
    lastName: 'Esposito',
    birthDate: new Date(1990, 10, 8),
    phone: '+39 333 4455669',
    email: 'maria.esposito@example.com',
    address: 'Via Campania 12, Napoli',
    medicalNotes: 'Nessuna allergia nota. Macchie solari da esposizione.',
    measurements: [
      {
        id: 'm16',
        area: 'Face',
        size: 10,
        treatment: 'IPL',
        date: new Date(2023, 10, 25)
      }
    ],
    invoices: [
      {
        id: 'inv35',
        number: '2023/036',
        date: new Date(2023, 10, 28),
        amount: 240,
        paid: true,
        description: 'Trattamento IPL macchie solari'
      }
    ]
  },
  {
    id: '24',
    firstName: 'Giovanni',
    lastName: 'Romano',
    birthDate: new Date(1976, 2, 30),
    phone: '+39 333 9988771',
    email: 'giovanni.romano@example.com',
    address: 'Via Lazio 45, Roma',
    medicalNotes: 'Iperidrosi ascellare. Trattamenti precedenti con tossina botulinica.',
    measurements: [],
    invoices: [
      {
        id: 'inv36',
        number: '2023/037',
        date: new Date(2023, 11, 10),
        amount: 380,
        paid: true,
        description: 'Trattamento iperidrosi con tossina botulinica'
      }
    ]
  },
  {
    id: '25',
    firstName: 'Alessia',
    lastName: 'Martino',
    birthDate: new Date(1984, 7, 15),
    phone: '+39 333 1122338',
    email: 'alessia.martino@example.com',
    address: 'Via Umbria 67, Perugia',
    medicalNotes: 'Teleangectasie zona zigomi. Couperose lieve.',
    measurements: [
      {
        id: 'm17',
        area: 'Face',
        size: 5,
        treatment: 'Laser',
        date: new Date(2023, 11, 18)
      }
    ],
    invoices: [
      {
        id: 'inv37',
        number: '2023/038',
        date: new Date(2023, 11, 20),
        amount: 220,
        paid: false,
        description: 'Trattamento laser vascolare viso'
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
  },
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

// Available options
export const treatments = [
  'Laser', 
  'Chemical Peel', 
  'Microdermabrasion', 
  'Botox', 
  'Filler', 
  'Mesotherapy', 
  'Consultation', 
  'Follow-up',
  'Hydrafacial',
  'IPL',
  'Microneedling',
  'LED Therapy'
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

import { Client } from '../types';

// Sample client data
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
  }
];

// Add 20 new clients (10 with appointments and 10 with invoices)
export const additionalClients = [
  // Clients with appointments
  {
    id: '101',
    firstName: 'Marco',
    lastName: 'Bianchi',
    birthDate: new Date(1985, 5, 15),
    phone: '333 123 4567',
    email: 'marco.bianchi@example.com',
    address: 'Via Roma 123, Milano',
    medicalNotes: 'Pelle sensibile, evitare trattamenti aggressivi',
    measurements: [],
    attachments: [],
    invoices: [],
    consents: []
  },
  {
    id: '102',
    firstName: 'Giulia',
    lastName: 'Rossi',
    birthDate: new Date(1990, 3, 22),
    phone: '334 765 4321',
    email: 'giulia.rossi@example.com',
    address: 'Via Garibaldi 45, Roma',
    medicalNotes: 'Allergia a nichel',
    measurements: [],
    attachments: [],
    invoices: [],
    consents: []
  },
  {
    id: '103',
    firstName: 'Luca',
    lastName: 'Verdi',
    birthDate: new Date(1978, 8, 10),
    phone: '335 987 6543',
    email: 'luca.verdi@example.com',
    address: 'Corso Italia 67, Torino',
    medicalNotes: 'Cicatrici da acne sul viso',
    measurements: [],
    attachments: [],
    invoices: [],
    consents: []
  },
  {
    id: '104',
    firstName: 'Chiara',
    lastName: 'Neri',
    birthDate: new Date(1995, 1, 28),
    phone: '336 567 8901',
    email: 'chiara.neri@example.com',
    address: 'Piazza Duomo 12, Milano',
    medicalNotes: 'Pelle mista con tendenza a rossore',
    measurements: [],
    attachments: [],
    invoices: [],
    consents: []
  },
  {
    id: '105',
    firstName: 'Andrea',
    lastName: 'Moretti',
    birthDate: new Date(1982, 7, 5),
    phone: '337 345 6789',
    email: 'andrea.moretti@example.com',
    address: 'Via Dante 89, Bologna',
    medicalNotes: 'Macchie solari sul viso',
    measurements: [],
    attachments: [],
    invoices: [],
    consents: []
  },
  {
    id: '106',
    firstName: 'Valentina',
    lastName: 'Ricci',
    birthDate: new Date(1988, 11, 18),
    phone: '338 234 5678',
    email: 'valentina.ricci@example.com',
    address: 'Corso Vittorio 34, Firenze',
    medicalNotes: 'Rughe precoci',
    measurements: [],
    attachments: [],
    invoices: [],
    consents: []
  },
  {
    id: '107',
    firstName: 'Roberto',
    lastName: 'Gallo',
    birthDate: new Date(1975, 4, 30),
    phone: '339 876 5432',
    email: 'roberto.gallo@example.com',
    address: 'Via Mazzini 56, Napoli',
    medicalNotes: 'Cicatrice sulla fronte da trattare',
    measurements: [],
    attachments: [],
    invoices: [],
    consents: []
  },
  {
    id: '108',
    firstName: 'Martina',
    lastName: 'Colombo',
    birthDate: new Date(1992, 9, 12),
    phone: '340 123 7890',
    email: 'martina.colombo@example.com',
    address: 'Via Leopardi 23, Genova',
    medicalNotes: 'Discromie cutanee',
    measurements: [],
    attachments: [],
    invoices: [],
    consents: []
  },
  {
    id: '109',
    firstName: 'Francesco',
    lastName: 'Romano',
    birthDate: new Date(1980, 2, 25),
    phone: '341 567 1234',
    email: 'francesco.romano@example.com',
    address: 'Piazza Navona 7, Roma',
    medicalNotes: 'Pelle grassa con tendenza acneica',
    measurements: [],
    attachments: [],
    invoices: [],
    consents: []
  },
  {
    id: '110',
    firstName: 'Elisa',
    lastName: 'Fontana',
    birthDate: new Date(1993, 6, 8),
    phone: '342 890 1234',
    email: 'elisa.fontana@example.com',
    address: 'Viale Europa 120, Milano',
    medicalNotes: 'Dermatite periorale',
    measurements: [],
    attachments: [],
    invoices: [],
    consents: []
  },
  
  // Clients with invoices
  {
    id: '201',
    firstName: 'Paolo',
    lastName: 'Marini',
    birthDate: new Date(1979, 1, 14),
    phone: '343 456 7890',
    email: 'paolo.marini@example.com',
    address: 'Via Veneto 45, Roma',
    medicalNotes: 'Iperpigmentazione post-infiammatoria',
    measurements: [],
    attachments: [],
    invoices: [
      {
        id: 'inv-101',
        number: 'F2023-101',
        date: new Date(2023, 10, 5),
        amount: 120.00,
        paid: true,
        description: 'Consulenza dermatologica iniziale'
      }
    ],
    consents: []
  },
  {
    id: '202',
    firstName: 'Alessia',
    lastName: 'Conti',
    birthDate: new Date(1987, 8, 20),
    phone: '344 567 8901',
    email: 'alessia.conti@example.com',
    address: 'Corso Umberto 78, Napoli',
    medicalNotes: 'Rosacea moderata',
    measurements: [],
    attachments: [],
    invoices: [
      {
        id: 'inv-102',
        number: 'F2023-102',
        date: new Date(2023, 10, 8),
        amount: 250.00,
        paid: true,
        description: 'Trattamento laser rosacea - Sessione 1'
      }
    ],
    consents: []
  },
  {
    id: '203',
    firstName: 'Simone',
    lastName: 'Ferretti',
    birthDate: new Date(1983, 3, 11),
    phone: '345 678 9012',
    email: 'simone.ferretti@example.com',
    address: 'Via Marconi 34, Bologna',
    medicalNotes: 'Cheratosi attinica sul viso',
    measurements: [],
    attachments: [],
    invoices: [
      {
        id: 'inv-103',
        number: 'F2023-103',
        date: new Date(2023, 10, 12),
        amount: 180.00,
        paid: false,
        description: 'Trattamento cheratosi attinica'
      }
    ],
    consents: []
  },
  {
    id: '204',
    firstName: 'Laura',
    lastName: 'Martelli',
    birthDate: new Date(1991, 5, 29),
    phone: '346 789 0123',
    email: 'laura.martelli@example.com',
    address: 'Viale Monza 56, Milano',
    medicalNotes: 'Cicatrici da varicella',
    measurements: [],
    attachments: [],
    invoices: [
      {
        id: 'inv-104',
        number: 'F2023-104',
        date: new Date(2023, 10, 15),
        amount: 320.00,
        paid: true,
        description: 'Trattamento microneedling - Pacchetto 3 sessioni'
      }
    ],
    consents: []
  },
  {
    id: '205',
    firstName: 'Davide',
    lastName: 'Vitali',
    birthDate: new Date(1976, 10, 3),
    phone: '347 890 1234',
    email: 'davide.vitali@example.com',
    address: 'Via Torino 89, Torino',
    medicalNotes: 'Fototipo III, con lentiggini',
    measurements: [],
    attachments: [],
    invoices: [
      {
        id: 'inv-105',
        number: 'F2023-105',
        date: new Date(2023, 10, 18),
        amount: 150.00,
        paid: true,
        description: 'Peeling viso'
      }
    ],
    consents: []
  },
  {
    id: '206',
    firstName: 'Marta',
    lastName: 'Santoro',
    birthDate: new Date(1989, 7, 17),
    phone: '348 901 2345',
    email: 'marta.santoro@example.com',
    address: 'Corso Francia 120, Roma',
    medicalNotes: 'Sensibilità a parabeni e profumi',
    measurements: [],
    attachments: [],
    invoices: [
      {
        id: 'inv-106',
        number: 'F2023-106',
        date: new Date(2023, 10, 22),
        amount: 280.00,
        paid: false,
        description: 'Trattamento filler labbra'
      }
    ],
    consents: []
  },
  {
    id: '207',
    firstName: 'Nicola',
    lastName: 'Esposito',
    birthDate: new Date(1981, 2, 9),
    phone: '349 012 3456',
    email: 'nicola.esposito@example.com',
    address: 'Via Verdi 45, Palermo',
    medicalNotes: 'Dermatite seborroica cuoio capelluto',
    measurements: [],
    attachments: [],
    invoices: [
      {
        id: 'inv-107',
        number: 'F2023-107',
        date: new Date(2023, 10, 25),
        amount: 130.00,
        paid: true,
        description: 'Consulenza e terapia dermatite seborroica'
      }
    ],
    consents: []
  },
  {
    id: '208',
    firstName: 'Sofia',
    lastName: 'Lombardi',
    birthDate: new Date(1994, 4, 21),
    phone: '350 123 4567',
    email: 'sofia.lombardi@example.com',
    address: 'Via Dante 67, Firenze',
    medicalNotes: 'Melasma su zigomi e fronte',
    measurements: [],
    attachments: [],
    invoices: [
      {
        id: 'inv-108',
        number: 'F2023-108',
        date: new Date(2023, 10, 28),
        amount: 220.00,
        paid: true,
        description: 'Trattamento melasma - Sessione 1'
      }
    ],
    consents: []
  },
  {
    id: '209',
    firstName: 'Riccardo',
    lastName: 'Mancini',
    birthDate: new Date(1984, 9, 14),
    phone: '351 234 5678',
    email: 'riccardo.mancini@example.com',
    address: 'Corso Vittorio 90, Bari',
    medicalNotes: 'Iperidrosi ascellare',
    measurements: [],
    attachments: [],
    invoices: [
      {
        id: 'inv-109',
        number: 'F2023-109',
        date: new Date(2023, 11, 2),
        amount: 350.00,
        paid: false,
        description: 'Trattamento botox iperidrosi'
      }
    ],
    consents: []
  },
  {
    id: '210',
    firstName: 'Giorgia',
    lastName: 'Fabbri',
    birthDate: new Date(1993, 11, 30),
    phone: '352 345 6789',
    email: 'giorgia.fabbri@example.com',
    address: 'Via Garibaldi 23, Verona',
    medicalNotes: 'Acne cistica moderata',
    measurements: [],
    attachments: [],
    invoices: [
      {
        id: 'inv-110',
        number: 'F2023-110',
        date: new Date(2023, 11, 5),
        amount: 190.00,
        paid: true,
        description: 'Consulenza acne e prescrizione terapia'
      }
    ],
    consents: []
  }
];

// Combine all clients
export const mergedClients = [...sampleClients, ...additionalClients];

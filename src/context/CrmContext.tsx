
import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';

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
interface CrmContextType {
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
  treatments: Treatment[];
  doctors: Doctor[];
  bodyAreas: BodyArea[];
  sendWhatsAppReminder: (clientId: string, appointmentId: string) => void;
}

// Create context
const CrmContext = createContext<CrmContextType | undefined>(undefined);

// Sample data
const sampleClients: Client[] = [
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

const sampleAppointments: Appointment[] = [
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

// Provider component
export const CrmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>(() => {
    const savedClients = localStorage.getItem('derma-crm-clients');
    return savedClients ? JSON.parse(savedClients, dateReviver) : sampleClients;
  });
  
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const savedAppointments = localStorage.getItem('derma-crm-appointments');
    return savedAppointments ? JSON.parse(savedAppointments, dateReviver) : sampleAppointments;
  });

  // Helper function to revive dates from JSON
  function dateReviver(key: string, value: any) {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
      return new Date(value);
    }
    return value;
  }

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('derma-crm-clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('derma-crm-appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Available options
  const treatments: Treatment[] = [
    'Laser', 
    'Chemical Peel', 
    'Microdermabrasion', 
    'Botox', 
    'Filler', 
    'Mesotherapy', 
    'Consultation', 
    'Follow-up'
  ];
  
  const doctors: Doctor[] = [
    'Dr. Rossi', 
    'Dr. Bianchi', 
    'Dr. Verdi', 
    'Dr. Ferrari'
  ];
  
  const bodyAreas: BodyArea[] = [
    'Face', 
    'Neck', 
    'Chest', 
    'Back', 
    'Arms', 
    'Legs', 
    'Hands', 
    'Full Body'
  ];

  // Client functions
  const addClient = (client: Omit<Client, 'id' | 'measurements'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      measurements: []
    };
    setClients([...clients, newClient]);
    toast.success('Cliente aggiunto con successo');
  };

  const updateClient = (updatedClient: Client) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
    toast.success('Cliente aggiornato con successo');
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter(client => client.id !== id));
    setAppointments(appointments.filter(appointment => appointment.clientId !== id));
    toast.success('Cliente eliminato con successo');
  };

  const getClient = (id: string) => {
    return clients.find(client => client.id === id);
  };

  // Appointment functions
  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString()
    };
    setAppointments([...appointments, newAppointment]);
    toast.success('Appuntamento aggiunto con successo');
  };

  const updateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === updatedAppointment.id ? updatedAppointment : appointment
    ));
    toast.success('Appuntamento aggiornato con successo');
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
    toast.success('Appuntamento eliminato con successo');
  };

  const getClientAppointments = (clientId: string) => {
    return appointments.filter(appointment => appointment.clientId === clientId)
      .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date, most recent first
  };

  // Measurement functions
  const addMeasurement = (clientId: string, measurement: Omit<Measurement, 'id'>) => {
    const newMeasurement: Measurement = {
      ...measurement,
      id: Date.now().toString()
    };
    
    setClients(clients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          measurements: [...client.measurements, newMeasurement]
        };
      }
      return client;
    }));
    
    toast.success('Misurazione aggiunta con successo');
  };

  const updateMeasurement = (clientId: string, updatedMeasurement: Measurement) => {
    setClients(clients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          measurements: client.measurements.map(measurement => 
            measurement.id === updatedMeasurement.id ? updatedMeasurement : measurement
          )
        };
      }
      return client;
    }));
    
    toast.success('Misurazione aggiornata con successo');
  };

  const deleteMeasurement = (clientId: string, measurementId: string) => {
    setClients(clients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          measurements: client.measurements.filter(m => m.id !== measurementId)
        };
      }
      return client;
    }));
    
    toast.success('Misurazione eliminata con successo');
  };

  // WhatsApp integration
  const sendWhatsAppReminder = (clientId: string, appointmentId: string) => {
    const client = getClient(clientId);
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (!client || !appointment) {
      toast.error('Impossibile inviare il promemoria: dati non trovati');
      return;
    }
    
    const formattedDate = format(appointment.date, "d MMMM yyyy 'alle' HH:mm");
    const message = `Gentile ${client.firstName} ${client.lastName}, le ricordiamo il suo appuntamento per ${appointment.treatment} previsto per il ${formattedDate} con ${appointment.doctor}. Cordiali saluti, Studio Dermatologico.`;
    
    // Format the phone number
    let phoneNumber = client.phone.replace(/\s+/g, '');
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = '+39' + phoneNumber;
    }
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open in a new tab
    window.open(whatsappUrl, '_blank');
    
    toast.success('Messaggio WhatsApp pronto per essere inviato');
  };

  const value = {
    clients,
    appointments,
    addClient,
    updateClient,
    deleteClient,
    getClient,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getClientAppointments,
    addMeasurement,
    updateMeasurement,
    deleteMeasurement,
    treatments,
    doctors,
    bodyAreas,
    sendWhatsAppReminder
  };

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>;
};

// Custom hook for using the context
export const useCrm = () => {
  const context = useContext(CrmContext);
  if (context === undefined) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
};

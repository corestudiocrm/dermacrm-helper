
import React, { createContext, useContext, useState, useEffect } from 'react';

// Import types
import { 
  CrmContextType, 
  Client, 
  Appointment, 
  Treatment, 
  Doctor, 
  BodyArea, 
  Measurement,
  Attachment,
  Invoice,
  Consent
} from './types';

// Import sample data
import { 
  sampleClients, 
  sampleAppointments, 
  treatments, 
  doctors, 
  bodyAreas 
} from './sampleData';

// Import utility functions
import { dateReviver } from './utilFunctions';

// Import domain-specific functions
import { createClientFunctions } from './clientFunctions';
import { createAppointmentFunctions } from './appointmentFunctions';

// Create context
const CrmContext = createContext<CrmContextType | undefined>(undefined);

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

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('derma-crm-clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('derma-crm-appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Initialize client functions
  const { 
    addClient, 
    updateClient, 
    deleteClient, 
    getClient,
    addMeasurement,
    updateMeasurement,
    deleteMeasurement,
    uploadClientAvatar,
    uploadAttachment,
    deleteAttachment,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    addConsent,
    updateConsent,
    deleteConsent
  } = createClientFunctions(clients, setClients, setAppointments);

  // Initialize appointment functions
  const {
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getClientAppointments,
    getAvailableTimeSlots,
    bookAppointmentForNewClient,
    sendWhatsAppReminder
  } = createAppointmentFunctions(appointments, setAppointments, getClient);

  const value: CrmContextType = {
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
    sendWhatsAppReminder,
    uploadClientAvatar,
    uploadAttachment,
    deleteAttachment,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    addConsent,
    updateConsent,
    deleteConsent,
    getAvailableTimeSlots,
    bookAppointmentForNewClient
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

// Re-export types for convenience
export type { 
  Client, 
  Appointment, 
  Treatment, 
  Doctor, 
  BodyArea, 
  Measurement,
  Attachment,
  Invoice,
  Consent,
  CrmContextType 
};

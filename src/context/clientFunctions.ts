
import { toast } from 'sonner';
import { Client, Measurement, Attachment, Invoice, Consent } from './types';

// Client functions
export const createClientFunctions = (
  clients: Client[],
  setClients: React.Dispatch<React.SetStateAction<Client[]>>,
  setAppointments: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const addClient = (client: Omit<Client, 'id' | 'measurements'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      measurements: [],
      attachments: [],
      invoices: [],
      consents: []
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
    setAppointments((appointments) => appointments.filter(appointment => appointment.clientId !== id));
    toast.success('Cliente eliminato con successo');
  };

  const getClient = (id: string) => {
    return clients.find(client => client.id === id);
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

  // Avatar functions
  const uploadClientAvatar = async (clientId: string, file: File) => {
    // In a real app, this would upload to a server/storage
    return new Promise<void>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const avatarUrl = e.target?.result as string;
        
        setClients(clients.map(client => {
          if (client.id === clientId) {
            return {
              ...client,
              avatarUrl
            };
          }
          return client;
        }));
        
        toast.success('Avatar caricato con successo');
        resolve();
      };
      reader.readAsDataURL(file);
    });
  };

  // Attachment functions
  const uploadAttachment = async (clientId: string, file: File, name?: string) => {
    return new Promise<void>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAttachment: Attachment = {
          id: Date.now().toString(),
          name: name || file.name,
          type: file.type,
          url: e.target?.result as string,
          date: new Date()
        };
        
        setClients(clients.map(client => {
          if (client.id === clientId) {
            return {
              ...client,
              attachments: [...(client.attachments || []), newAttachment]
            };
          }
          return client;
        }));
        
        toast.success('Allegato caricato con successo');
        resolve();
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteAttachment = (clientId: string, attachmentId: string) => {
    setClients(clients.map(client => {
      if (client.id === clientId && client.attachments) {
        return {
          ...client,
          attachments: client.attachments.filter(a => a.id !== attachmentId)
        };
      }
      return client;
    }));
    
    toast.success('Allegato eliminato con successo');
  };

  // Invoice functions
  const addInvoice = (clientId: string, invoice: Omit<Invoice, 'id'>) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: Date.now().toString()
    };
    
    setClients(clients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          invoices: [...(client.invoices || []), newInvoice]
        };
      }
      return client;
    }));
    
    toast.success('Fattura aggiunta con successo');
  };

  const updateInvoice = (clientId: string, updatedInvoice: Invoice) => {
    setClients(clients.map(client => {
      if (client.id === clientId && client.invoices) {
        return {
          ...client,
          invoices: client.invoices.map(invoice => 
            invoice.id === updatedInvoice.id ? updatedInvoice : invoice
          )
        };
      }
      return client;
    }));
    
    toast.success('Fattura aggiornata con successo');
  };

  const deleteInvoice = (clientId: string, invoiceId: string) => {
    setClients(clients.map(client => {
      if (client.id === clientId && client.invoices) {
        return {
          ...client,
          invoices: client.invoices.filter(invoice => invoice.id !== invoiceId)
        };
      }
      return client;
    }));
    
    toast.success('Fattura eliminata con successo');
  };

  // Consent functions
  const addConsent = (clientId: string, consent: Omit<Consent, 'id'>) => {
    const newConsent: Consent = {
      ...consent,
      id: Date.now().toString()
    };
    
    setClients(clients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          consents: [...(client.consents || []), newConsent]
        };
      }
      return client;
    }));
    
    toast.success('Consenso aggiunto con successo');
  };

  const updateConsent = (clientId: string, updatedConsent: Consent) => {
    setClients(clients.map(client => {
      if (client.id === clientId && client.consents) {
        return {
          ...client,
          consents: client.consents.map(consent => 
            consent.id === updatedConsent.id ? updatedConsent : consent
          )
        };
      }
      return client;
    }));
    
    toast.success('Consenso aggiornato con successo');
  };

  const deleteConsent = (clientId: string, consentId: string) => {
    setClients(clients.map(client => {
      if (client.id === clientId && client.consents) {
        return {
          ...client,
          consents: client.consents.filter(consent => consent.id !== consentId)
        };
      }
      return client;
    }));
    
    toast.success('Consenso eliminato con successo');
  };

  return {
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
  };
};


import { toast } from 'sonner';
import { Client, Measurement } from './types';

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

  return {
    addClient,
    updateClient,
    deleteClient,
    getClient,
    addMeasurement,
    updateMeasurement,
    deleteMeasurement
  };
};

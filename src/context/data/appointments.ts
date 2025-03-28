
import { format, addDays, subDays, addHours, setHours, setMinutes, setMonth, setDate, setYear } from 'date-fns';
import { Appointment, Doctor, Treatment } from '../types';

// Funzione per generare appuntamenti
const generateAppointments = (baseDate: Date, count: number, clientIds: string[]): Appointment[] => {
  const appointments: Appointment[] = [];
  const doctors: Doctor[] = ["Dr. Rossi", "Dr. Bianchi", "Dr. Verdi", "Dr. Ferrari"];
  const treatments: Treatment[] = ["Consultation", "Follow-up", "Laser", "Chemical Peel"];
  
  // Distribuzione più realistica degli orari durante la giornata
  const hours = [9, 10, 11, 14, 15, 16, 17];
  
  for (let i = 0; i < count; i++) {
    const date = new Date(baseDate);
    const dayOffset = Math.floor(i / 7); // massimo 7 appuntamenti al giorno
    
    // Aggiunge giorni alla data base, saltando i weekend
    let currentDay = addDays(date, dayOffset);
    const dayOfWeek = currentDay.getDay();
    
    // Se è weekend, spostati al lunedì successivo
    if (dayOfWeek === 0) { // domenica
      currentDay = addDays(currentDay, 1);
    } else if (dayOfWeek === 6) { // sabato
      currentDay = addDays(currentDay, 2);
    }
    
    // Imposta ora in base al resto di i/7 (per distribuire gli appuntamenti durante il giorno)
    const hourIndex = i % 7;
    const hourOfDay = hours[hourIndex];
    const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    
    currentDay = setHours(currentDay, hourOfDay);
    currentDay = setMinutes(currentDay, minutes);
    
    const id = (Date.now() + i).toString();
    const clientId = clientIds[Math.floor(Math.random() * clientIds.length)];
    const doctor = doctors[Math.floor(Math.random() * doctors.length)];
    const treatment = treatments[Math.floor(Math.random() * treatments.length)];
    
    appointments.push({
      id,
      clientId,
      date: currentDay,
      doctor,
      treatment,
      notes: `Appuntamento del ${format(currentDay, 'dd/MM/yyyy HH:mm')}`
    });
  }
  
  return appointments;
};

// Generazione di date per marzo, aprile e maggio 2025
const march2025 = new Date(2025, 2, 1); // Marzo 2025
const april2025 = new Date(2025, 3, 1); // Aprile 2025
const may2025 = new Date(2025, 4, 1); // Maggio 2025

// Base di appuntamenti del 2024
export const generateInitialAppointments = (clientIds: string[]): Appointment[] => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const nextWeek = addDays(today, 7);
  
  // Make sure we have a valid client ID for every appointment
  const ensureClientId = (index: number) => {
    return clientIds[index % clientIds.length];
  };
  
  // Appuntamenti di base per il 2024
  const baseAppointments = [
    {
      id: "1",
      clientId: ensureClientId(0),
      date: setHours(today, 14),
      doctor: "Dr. Rossi" as Doctor,
      treatment: "Consultation" as Treatment,
      notes: "Prima visita"
    },
    {
      id: "2",
      clientId: ensureClientId(1),
      date: setHours(setMinutes(today, 30), 15),
      doctor: "Dr. Bianchi" as Doctor,
      treatment: "Follow-up" as Treatment,
      notes: "Controllo mensile"
    },
    {
      id: "3",
      clientId: ensureClientId(2),
      date: setHours(tomorrow, 10),
      doctor: "Dr. Verdi" as Doctor,
      treatment: "Laser" as Treatment,
      notes: "Consulenza per trattamento"
    },
    {
      id: "4",
      clientId: ensureClientId(3),
      date: setHours(setMinutes(nextWeek, 0), 11),
      doctor: "Dr. Neri" as Doctor,
      treatment: "Chemical Peel" as Treatment,
      notes: "Sessione di trattamento"
    }
  ];
  
  // Genera 20 appuntamenti per ciascun mese del 2025
  const march2025Appointments = generateAppointments(march2025, 20, clientIds);
  const april2025Appointments = generateAppointments(april2025, 20, clientIds);
  const may2025Appointments = generateAppointments(may2025, 20, clientIds);
  
  // Unisci gli appuntamenti
  return [
    ...baseAppointments,
    ...march2025Appointments,
    ...april2025Appointments,
    ...may2025Appointments
  ];
};

// Create a list of client IDs to ensure all appointments have a patient
const clientIdsList = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
  "11", "12", "13", "14", "15", "101", "102", "103", "104", "105",
  "106", "107", "108", "109", "110", "201", "202", "203", "204", "205",
  "206", "207", "208", "209", "210"
];

// Export the sample appointments with patients assigned
export const sampleAppointments = generateInitialAppointments(clientIdsList);

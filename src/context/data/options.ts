
import { Treatment, Doctor, BodyArea } from '../types';

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

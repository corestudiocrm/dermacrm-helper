
// Enhanced color palette with better contrast based on our core colors
export const COLORS = [
  '#0ea5e9', 
  '#38bdf8', 
  '#0284c7', 
  '#0369a1', 
  '#075985', 
  '#7dd3fc', 
  '#0c4a6e', 
  '#bae6fd'
];

// Define the chart configuration for the appointment types chart
export const appointmentTypesConfig = {
  laser: { label: 'Laser', theme: { light: '#0ea5e9', dark: '#38bdf8' } },
  chemical: { label: 'Chemical Peel', theme: { light: '#0284c7', dark: '#0369a1' } },
  micro: { label: 'Microdermabrasion', theme: { light: '#075985', dark: '#7dd3fc' } },
  botox: { label: 'Botox', theme: { light: '#0c4a6e', dark: '#bae6fd' } },
  filler: { label: 'Filler', theme: { light: '#0ea5e9', dark: '#38bdf8' } },
  meso: { label: 'Mesotherapy', theme: { light: '#0284c7', dark: '#0369a1' } },
  consultation: { label: 'Consultation', theme: { light: '#075985', dark: '#7dd3fc' } },
  followup: { label: 'Follow-up', theme: { light: '#0c4a6e', dark: '#bae6fd' } },
};

// Define the chart configuration for the weekly appointments chart
export const weeklyConfig = {
  appointments: { label: 'Appuntamenti', theme: { light: '#0ea5e9', dark: '#38bdf8' } },
};

// Define the chart configuration for the doctor distribution chart
export const doctorConfig = {
  rossi: { label: 'Dr. Rossi', theme: { light: '#0ea5e9', dark: '#38bdf8' } },
  bianchi: { label: 'Dr. Bianchi', theme: { light: '#0284c7', dark: '#0369a1' } },
  verdi: { label: 'Dr. Verdi', theme: { light: '#075985', dark: '#7dd3fc' } },
  ferrari: { label: 'Dr. Ferrari', theme: { light: '#0c4a6e', dark: '#bae6fd' } },
};

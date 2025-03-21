// Enhanced color palette with better contrast
export const COLORS = [
  '#9b87f5', // Primary purple
  '#0ea5e9', // Ocean blue
  '#f97316', // Bright orange
  '#d946ef', // Magenta pink
  '#6E59A5', // Tertiary purple
  '#0c4a6e', // Deep blue
  '#38bdf8', // Light blue
  '#7E69AB', // Secondary purple
  '#0369a1', // Mid blue
  '#075985', // Dark blue
  '#D6BCFA', // Light purple
  '#7dd3fc'  // Lightest blue
];

// Define the chart configuration for the appointment types chart
export const appointmentTypesConfig = {
  laser: { label: 'Laser', theme: { light: '#9b87f5', dark: '#7E69AB' } },
  chemicalpeel: { label: 'Chemical Peel', theme: { light: '#0ea5e9', dark: '#0369a1' } },
  microdermabrasion: { label: 'Microdermabrasion', theme: { light: '#f97316', dark: '#f97316' } },
  botox: { label: 'Botox', theme: { light: '#d946ef', dark: '#d946ef' } },
  filler: { label: 'Filler', theme: { light: '#6E59A5', dark: '#6E59A5' } },
  mesotherapy: { label: 'Mesotherapy', theme: { light: '#0c4a6e', dark: '#0c4a6e' } },
  consultation: { label: 'Consultation', theme: { light: '#38bdf8', dark: '#38bdf8' } },
  followup: { label: 'Follow-up', theme: { light: '#075985', dark: '#075985' } },
  hydrafacial: { label: 'Hydrafacial', theme: { light: '#D6BCFA', dark: '#D6BCFA' } },
  ipl: { label: 'IPL', theme: { light: '#7dd3fc', dark: '#7dd3fc' } },
  microneedling: { label: 'Microneedling', theme: { light: '#0ea5e9', dark: '#0ea5e9' } },
  ledtherapy: { label: 'LED Therapy', theme: { light: '#f97316', dark: '#f97316' } },
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

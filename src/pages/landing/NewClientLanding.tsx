
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, UserPlus, ArrowRight } from 'lucide-react';

import LandingHeader from '@/components/landing/LandingHeader';
import AppointmentCalendar from '@/components/landing/AppointmentCalendar';
import NewClientForm from '@/components/landing/NewClientForm';
import AppointmentConfirmation from '@/components/landing/AppointmentConfirmation';

const NewClientLanding: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Date>();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState<{
    clientId: string;
    appointmentId: string;
  }>();

  const handleTimeSlotSelect = (date: Date) => {
    setSelectedTimeSlot(date);
  };

  const handleBookingSuccess = (clientId: string, appointmentId: string) => {
    setBookingDetails({ clientId, appointmentId });
    setCurrentStep(3);
  };

  const steps = [
    { id: 1, title: 'Seleziona orario', icon: <Calendar className="h-5 w-5" /> },
    { id: 2, title: 'Inserisci dati', icon: <UserPlus className="h-5 w-5" /> },
    { id: 3, title: 'Conferma', icon: <Clock className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <LandingHeader title="Prenota un appuntamento" />
      
      <main className="flex-1 py-6 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Stepper */}
          <div className="mb-8">
            <div className="hidden sm:flex items-center justify-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  {index > 0 && (
                    <ArrowRight 
                      className={`mx-2 h-4 w-4 ${
                        currentStep >= step.id ? 'text-primary' : 'text-muted-foreground/30'
                      }`} 
                    />
                  )}
                  <div
                    className={`flex items-center ${
                      currentStep >= step.id
                        ? 'text-primary'
                        : 'text-muted-foreground/50'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-full mr-2 ${
                        currentStep >= step.id
                          ? 'bg-primary text-white'
                          : 'bg-muted-foreground/20 text-muted-foreground'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        currentStep === step.id ? 'text-foreground' : ''
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Card Content */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AppointmentCalendar
                  onSelectTimeSlot={handleTimeSlotSelect}
                  selectedDate={selectedDate}
                  selectedTimeSlot={selectedTimeSlot}
                />
                <div className="mt-6 flex justify-end">
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    disabled={!selectedTimeSlot}
                    onClick={() => setCurrentStep(2)}
                  >
                    Continua
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="mb-6">
                  <h2 className="text-lg font-medium">Inserisci i tuoi dati</h2>
                </div>
                <NewClientForm
                  selectedTimeSlot={selectedTimeSlot}
                  onSubmitSuccess={handleBookingSuccess}
                />
                <div className="mt-4 flex justify-start">
                  <button
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => setCurrentStep(1)}
                  >
                    ← Torna alla selezione dell'orario
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && bookingDetails && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AppointmentConfirmation
                  clientId={bookingDetails.clientId}
                  appointmentId={bookingDetails.appointmentId}
                />
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t">
        <p>© {new Date().getFullYear()} Studio Dermatologico. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
};

export default NewClientLanding;

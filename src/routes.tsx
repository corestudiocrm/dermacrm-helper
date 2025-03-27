
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Index from './pages/Index';
import Clients from './pages/Clients';
import ClientDetail from './pages/ClientDetail';
import Appointments from './pages/Appointments';
import NotFound from './pages/NotFound';
import ClientsOverview from './pages/ClientsOverview';
import WhatsAppReminders from './pages/WhatsAppReminders';

/**
 * This file is maintained for reference but is no longer used
 * as the main routing configuration. See App.tsx for the current
 * routing setup.
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/index" element={<Index />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/clients/:id" element={<ClientDetail />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/clients-overview" element={<ClientsOverview />} />
      <Route path="/whatsapp-reminders" element={<WhatsAppReminders />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

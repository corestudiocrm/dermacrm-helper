
import React from 'react';
import { Client } from '@/context/CrmContext';
import AppointmentsTabContent from './AppointmentsTabContent';
import InvoicesTabContent from './InvoicesTabContent';
import ConsentsTabContent from './ConsentsTabContent';
import MeasurementsTabContent from './MeasurementsTabContent';

interface ClientTabContentProps {
  activeTab: string;
  client: Client;
}

const ClientTabContent: React.FC<ClientTabContentProps> = ({ activeTab, client }) => {
  if (activeTab === "appointments") {
    return <AppointmentsTabContent client={client} />;
  }

  if (activeTab === "invoices") {
    return <InvoicesTabContent client={client} />;
  }

  if (activeTab === "consents") {
    return <ConsentsTabContent client={client} />;
  }

  if (activeTab === "measurements") {
    return <MeasurementsTabContent client={client} />;
  }

  return null;
};

export default ClientTabContent;

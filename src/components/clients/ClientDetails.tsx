
import React, { useState } from 'react';
import { Client } from '@/context/CrmContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BodyAreaVisualization from './BodyAreaVisualization';
import ClientHeader from './ClientHeader';
import ClientInfoCard from './cards/ClientInfoCard';
import MeasurementsCard from './cards/MeasurementsCard';
import ClientTabContent from './tabs/ClientTabContent';

interface ClientDetailsProps {
  client: Client;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client }) => {
  const [activeTab, setActiveTab] = useState("appointments");

  return (
    <div className="space-y-6">
      {/* Client Header with Avatar and Actions */}
      <ClientHeader client={client} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Client Info Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Informazioni</CardTitle>
          </CardHeader>
          <CardContent>
            <ClientInfoCard client={client} />
          </CardContent>
        </Card>
        
        {/* Measurements Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">Misurazioni</CardTitle>
              <CardDescription>
                Aree trattate e dimensioni
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <MeasurementsCard client={client} />
          </CardContent>
        </Card>
        
        {/* Tabs Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-0">
            <Tabs defaultValue="appointments" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="appointments">Appuntamenti</TabsTrigger>
                <TabsTrigger value="invoices">Fatture</TabsTrigger>
                <TabsTrigger value="consents">Consensi</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="pt-4">
            <ClientTabContent activeTab={activeTab} client={client} />
          </CardContent>
        </Card>
      </div>
      
      {/* Body Area Visualization */}
      {client.measurements.length > 0 && (
        <BodyAreaVisualization client={client} />
      )}
    </div>
  );
};

export default ClientDetails;

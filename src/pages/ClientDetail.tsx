
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCrm } from '@/context/CrmContext';
import PageTransition from '@/components/layout/PageTransition';
import ClientDetails from '@/components/clients/ClientDetails';

const ClientDetail: React.FC = () => {
  const { id } = useParams();
  const { getClient } = useCrm();
  const navigate = useNavigate();
  
  const client = id ? getClient(id) : undefined;
  
  // Redirect if client not found
  if (!client) {
    navigate('/clients');
    return null;
  }
  
  return (
    <PageTransition>
      <ClientDetails client={client} />
    </PageTransition>
  );
};

export default ClientDetail;

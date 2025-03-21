
import React from 'react';
import { Client, Measurement } from '@/context/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface MeasurementsTabContentProps {
  client: Client;
}

const MeasurementsTabContent: React.FC<MeasurementsTabContentProps> = ({ client }) => {
  const { measurements } = client;

  if (!measurements || measurements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Misurazioni</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Nessuna misurazione registrata per questo cliente.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Misurazioni Registrate</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Area Trattata</TableHead>
              <TableHead>Dimensione</TableHead>
              <TableHead>Trattamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {measurements.map((measurement: Measurement) => (
              <TableRow key={measurement.id}>
                <TableCell>{format(new Date(measurement.date), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{measurement.area}</TableCell>
                <TableCell>{measurement.size} cm²</TableCell>
                <TableCell>
                  <Badge variant="outline">{measurement.treatment}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MeasurementsTabContent;

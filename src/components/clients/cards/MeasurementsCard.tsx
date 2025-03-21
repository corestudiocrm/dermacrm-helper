
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Ruler, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Client, useCrm } from '@/context/CrmContext';
import MeasurementForm from '../MeasurementForm';

interface MeasurementsCardProps {
  client: Client;
}

const MeasurementsCard: React.FC<MeasurementsCardProps> = ({ client }) => {
  const { deleteMeasurement } = useCrm();
  const [measurementDialogOpen, setMeasurementDialogOpen] = useState(false);
  const [measurementToDelete, setMeasurementToDelete] = useState<string | null>(null);

  const handleDeleteMeasurement = () => {
    if (measurementToDelete) {
      deleteMeasurement(client.id, measurementToDelete);
      setMeasurementToDelete(null);
    }
  };

  return (
    <>
      {client.measurements.length === 0 ? (
        <div className="text-center py-6">
          <Ruler className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Nessuna misurazione registrata
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => setMeasurementDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi misurazione
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {client.measurements
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((measurement) => (
              <div
                key={measurement.id}
                className="rounded-md border p-3 flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{measurement.area}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(measurement.date), "dd/MM/yyyy")}
                    </span>
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="font-medium">{measurement.size} cm²</span>
                    <span className="text-muted-foreground ml-2">
                      {measurement.treatment}
                    </span>
                  </div>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => setMeasurementToDelete(measurement.id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Eliminare la misurazione?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Questa azione non può essere annullata.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setMeasurementToDelete(null)}>
                        Annulla
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteMeasurement}>
                        Conferma
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
        </div>
      )}
      
      {/* Measurement Form Dialog */}
      <MeasurementForm
        clientId={client.id}
        open={measurementDialogOpen} 
        onOpenChange={setMeasurementDialogOpen}
      />
    </>
  );
};

export default MeasurementsCard;

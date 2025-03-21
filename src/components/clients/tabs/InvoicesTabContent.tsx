
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Receipt, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

interface InvoicesTabContentProps {
  client: Client;
}

const InvoicesTabContent: React.FC<InvoicesTabContentProps> = ({ client }) => {
  const { addInvoice, updateInvoice, deleteInvoice } = useCrm();
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);

  // Example invoice for demo
  const addExampleInvoice = () => {
    addInvoice(client.id, {
      number: `${Math.floor(Math.random() * 1000) + 1}`,
      date: new Date(),
      amount: Math.floor(Math.random() * 500) + 100,
      paid: Math.random() > 0.5,
      description: 'Trattamento estetico'
    });
  };

  // Toggle invoice payment status
  const toggleInvoicePayment = (invoiceId: string, currentStatus: boolean) => {
    const clientInvoice = client.invoices?.find(inv => inv.id === invoiceId);
    if (clientInvoice) {
      updateInvoice(client.id, {
        ...clientInvoice,
        paid: !currentStatus
      });
    }
  };

  // Handle invoice delete
  const handleDeleteInvoice = () => {
    if (invoiceToDelete) {
      deleteInvoice(client.id, invoiceToDelete);
      setInvoiceToDelete(null);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">
          {client.invoices?.length || 0} fatture emesse
        </p>
        <Button 
          size="sm" 
          onClick={addExampleInvoice}
        >
          <Plus className="h-4 w-4 mr-2" />
          Aggiungi
        </Button>
      </div>
      
      {!client.invoices || client.invoices.length === 0 ? (
        <div className="text-center py-6">
          <Receipt className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Nessuna fattura emessa
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={addExampleInvoice}
          >
            <Plus className="h-4 w-4 mr-2" />
            Crea fattura
          </Button>
        </div>
      ) : (
        <div className="max-h-[350px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Num.</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Importo</TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {client.invoices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{format(new Date(invoice.date), "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>€{invoice.amount.toFixed(2)}</span>
                      <Badge 
                        variant="outline" 
                        className={invoice.paid 
                          ? "bg-green-100 text-green-800 hover:bg-green-100 cursor-pointer" 
                          : "bg-amber-100 text-amber-800 hover:bg-amber-100 cursor-pointer"}
                        onClick={() => toggleInvoicePayment(invoice.id, invoice.paid)}
                      >
                        {invoice.paid ? 'Pagata' : 'Da pagare'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => setInvoiceToDelete(invoice.id)}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Eliminare la fattura?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Questa azione non può essere annullata.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setInvoiceToDelete(null)}>
                            Annulla
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteInvoice}>
                            Conferma
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default InvoicesTabContent;

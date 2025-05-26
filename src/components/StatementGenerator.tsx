
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BankStatement } from './BankStatement';
import { CustomDataForm } from './CustomDataForm';
import { generateUserDetails, generateTransactions, UserDetails, Transaction } from '../utils/dataGenerator';
import { Download, RefreshCw, FileText, Zap, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const StatementGenerator: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const { toast } = useToast();

  const generateStatement = (customData?: Partial<UserDetails>, initialBalance?: number) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const newUserDetails = generateUserDetails(customData);
      const newTransactions = generateTransactions(12 + Math.floor(Math.random() * 8), initialBalance);
      
      setUserDetails(newUserDetails);
      setTransactions(newTransactions);
      setIsGenerating(false);
      
      toast({
        title: "Statement Generated!",
        description: "Your bank statement has been generated successfully.",
      });
    }, 1000);
  };

  const downloadPDF = () => {
    if (!userDetails || !transactions.length) return;
    
    toast({
      title: "Download Started",
      description: "Your PDF is being prepared for download.",
    });
    
    // Create a new window with only the statement content
    const statementElement = document.getElementById('bank-statement');
    if (statementElement) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Bank Statement</title>
            <style>
              body { margin: 0; padding: 0; }
              @media print {
                body { margin: 0; }
                * { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
              }
            </style>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body>
            ${statementElement.outerHTML}
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      }
    }
  };

  const handleCustomDataSubmit = (customData: Partial<UserDetails>) => {
    // Extract initial balance if provided
    const initialBalance = customData.initialBalance ? parseFloat(customData.initialBalance as any) : undefined;
    
    // Remove initialBalance from customData as it's not part of UserDetails
    const { initialBalance: _, ...userData } = customData as any;
    
    generateStatement(userData, initialBalance);
  };

  const formatCurrency = (amount: number) => {
    return `£${amount.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Controls */}
      <div className="bg-gray-800 border-b border-gray-700 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Metro Bank Statement Generator
            </h1>
            <p className="text-gray-400">
              Generate realistic bank statements for educational and design demo purposes
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button 
              onClick={() => generateStatement()}
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Quick Generate
                </>
              )}
            </Button>
            
            <Button 
              onClick={() => setShowCustomForm(true)}
              disabled={isGenerating}
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg shadow-lg"
            >
              <User className="mr-2 h-4 w-4" />
              Generate With Your Data
            </Button>
            
            {userDetails && transactions.length > 0 && (
              <Button 
                onClick={downloadPDF}
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-600 hover:text-white px-6 py-3 rounded-lg shadow-lg"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            )}
          </div>
          
          {userDetails && transactions.length > 0 && (
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2 text-green-400">Statement Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Account Holder:</span>
                  <p className="font-medium">{userDetails.name}</p>
                </div>
                <div>
                  <span className="text-gray-400">Transactions:</span>
                  <p className="font-medium">{transactions.length} entries</p>
                </div>
                <div>
                  <span className="text-gray-400">Final Balance:</span>
                  <p className="font-medium text-green-400">
                    {formatCurrency(transactions[transactions.length - 1]?.balance || 0)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Statement Preview */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {userDetails && transactions.length > 0 ? (
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <BankStatement userDetails={userDetails} transactions={transactions} />
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-24 w-24 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Statement Generated</h3>
              <p className="text-gray-500">Click "Quick Generate" or "Generate With Your Data" to create a statement</p>
            </div>
          )}
        </div>
      </div>

      {/* Custom Data Form Modal */}
      <CustomDataForm
        isOpen={showCustomForm}
        onClose={() => setShowCustomForm(false)}
        onSubmit={handleCustomDataSubmit}
      />

      {/* Disclaimer */}
      <div className="bg-gray-800 border-t border-gray-700 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
            <p className="text-yellow-300 text-sm text-center">
              <strong>Disclaimer:</strong> This tool is designed for educational and design demonstration purposes only. 
              The generated statements are not real and should never be used for fraudulent activities or official purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

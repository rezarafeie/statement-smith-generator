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
    
    const statementElement = document.getElementById('bank-statement');
    if (statementElement) {
      const clonedElement = statementElement.cloneNode(true) as HTMLElement;
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Metro Bank Statement</title>
            <meta charset="utf-8">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                background: white !important;
                color: black;
                line-height: 1.2;
                font-size: 11px;
              }
              
              @media print {
                body {
                  margin: 0 !important;
                  padding: 0 !important;
                  background: white !important;
                }
                
                * {
                  -webkit-print-color-adjust: exact !important;
                  color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
                
                @page {
                  margin: 8mm;
                  size: A4;
                }
                
                #bank-statement {
                  page-break-inside: avoid;
                  background: white !important;
                  width: 100% !important;
                  max-width: none !important;
                }
                
                table {
                  border-collapse: collapse !important;
                  width: 100% !important;
                  page-break-inside: avoid !important;
                }
                
                th, td {
                  border: 1px solid black !important;
                  padding: 2px 4px !important;
                  font-size: 9px !important;
                  line-height: 1.1 !important;
                  page-break-inside: avoid !important;
                }
                
                tr {
                  page-break-inside: avoid !important;
                  break-inside: avoid !important;
                }
                
                .bg-gray-100 {
                  background-color: #f3f4f6 !important;
                }
                
                .bg-gray-200 {
                  background-color: #e5e7eb !important;
                }
                
                img {
                  max-width: 100% !important;
                  height: auto !important;
                }
              }
              
              /* Reset and utility classes */
              .bg-white { background-color: white !important; }
              .text-black { color: black !important; }
              .font-sans { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
              .text-xs { font-size: 0.75rem; line-height: 1rem; }
              .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
              .text-base { font-size: 1rem; line-height: 1.5rem; }
              .mb-1 { margin-bottom: 0.25rem; }
              .mb-2 { margin-bottom: 0.5rem; }
              .mb-3 { margin-bottom: 0.75rem; }
              .mt-2 { margin-top: 0.5rem; }
              .mt-4 { margin-top: 1rem; }
              .grid { display: grid; }
              .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .gap-8 { gap: 2rem; }
              .font-bold { font-weight: 700; }
              .leading-tight { line-height: 1.25; }
              .tracking-wide { letter-spacing: 0.025em; }
              .border { border-width: 1px; }
              .border-black { border-color: black; }
              .border-collapse { border-collapse: collapse; }
              .text-center { text-align: center; }
              .text-left { text-align: left; }
              .bg-gray-100 { background-color: rgb(243 244 246); }
              .bg-gray-200 { background-color: rgb(229 231 235); }
              .text-gray-700 { color: rgb(55 65 81); }
              .text-gray-600 { color: rgb(75 85 99); }
              .w-full { width: 100%; }
              .w-auto { width: auto; }
              .w-16 { width: 4rem; }
              .w-20 { width: 5rem; }
              .h-4 { height: 1rem; }
              .h-5 { height: 1.25rem; }
              .h-6 { height: 1.5rem; }
              .p-1 { padding: 0.25rem; }
              .px-4 { padding-left: 1rem; padding-right: 1rem; }
              .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
              .mx-auto { margin-left: auto; margin-right: auto; }
              .relative { position: relative; }
              .mb-0\\.5 { margin-bottom: 0.125rem; }
            </style>
          </head>
          <body>
            ${clonedElement.outerHTML}
          </body>
          </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        setTimeout(() => {
          printWindow.print();
          setTimeout(() => {
            printWindow.close();
          }, 100);
        }, 500);
      }
    }
  };

  const handleCustomDataSubmit = (customData: Partial<UserDetails> & { initialBalance?: string }) => {
    // Extract initial balance and convert to number if provided
    const initialBalance = customData.initialBalance ? parseFloat(customData.initialBalance) : undefined;
    
    // Remove initialBalance from customData as it's not part of UserDetails
    const { initialBalance: _, ...userData } = customData;
    
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

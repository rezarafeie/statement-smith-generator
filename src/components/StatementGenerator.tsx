
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BankStatement } from './BankStatement';
import { generateUserDetails, generateTransactions, UserDetails, Transaction } from '../utils/dataGenerator';
import { Download, RefreshCw, FileText, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const StatementGenerator: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateStatement = () => {
    setIsGenerating(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const newUserDetails = generateUserDetails();
      const newTransactions = generateTransactions(12 + Math.floor(Math.random() * 8)); // 12-20 transactions
      
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
    
    // In a real implementation, you would use a library like jsPDF or Puppeteer
    // For demo purposes, we'll show the print dialog
    window.print();
  };

  const formatCurrency = (amount: number) => {
    return `£${amount.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Bank Statement Generator
          </h1>
          <p className="text-gray-400 text-lg">
            Generate realistic bank statements for educational and design demo purposes
          </p>
        </div>

        {/* Controls */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="h-5 w-5" />
              Quick Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button 
                onClick={generateStatement}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Generate Statement
                  </>
                )}
              </Button>
              
              {userDetails && transactions.length > 0 && (
                <Button 
                  onClick={downloadPDF}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-3"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              )}
            </div>
            
            {userDetails && transactions.length > 0 && (
              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
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
          </CardContent>
        </Card>

        {/* Preview */}
        {userDetails && transactions.length > 0 && (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Statement Preview</CardTitle>
              <p className="text-gray-400">This is how your generated statement will look</p>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="transform scale-75 origin-top-left">
                  <BankStatement userDetails={userDetails} transactions={transactions} />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        {!userDetails && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">Realistic Data</h3>
                  <p className="text-gray-400 text-sm">
                    Generates authentic-looking transactions, balances, and account details
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center">
                  <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">Instant Generation</h3>
                  <p className="text-gray-400 text-sm">
                    One-click generation with immediate preview and download
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center">
                  <Download className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">PDF Export</h3>
                  <p className="text-gray-400 text-sm">
                    Professional PDF output with authentic bank statement formatting
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
          <p className="text-yellow-300 text-sm">
            <strong>Disclaimer:</strong> This tool is designed for educational and design demonstration purposes only. 
            The generated statements are not real and should never be used for fraudulent activities or official purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

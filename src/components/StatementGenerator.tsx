
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BankStatement } from './BankStatement';
import { SpanishUtilityBill } from './SpanishUtilityBill';
import { SpanishBankStatement } from './SpanishBankStatement';
import { CustomDataForm } from './CustomDataForm';
import { CountrySelector } from './CountrySelector';
import { DocumentTypeSelector } from './DocumentTypeSelector';
import { generateUserDetails, generateTransactions, UserDetails, Transaction } from '../utils/dataGenerator';
import { Download, RefreshCw, FileText, Zap, User, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type DocumentType = 'metro-bank' | 'utility-bill' | 'bank-statement';
type FlowStep = 'country-selection' | 'document-selection' | 'document-generated';

export const StatementGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('country-selection');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType | ''>('');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const { toast } = useToast();

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    
    if (countryCode === 'UK') {
      // Direct generation for UK (Metro Bank)
      setSelectedDocumentType('metro-bank');
      generateDocument('metro-bank');
    } else if (countryCode === 'ES') {
      // Show document type selection for Spain
      setCurrentStep('document-selection');
    }
  };

  const handleDocumentTypeSelect = (documentType: string) => {
    const docType = documentType as DocumentType;
    setSelectedDocumentType(docType);
    generateDocument(docType);
  };

  const generateDocument = (documentType: DocumentType, customData?: Partial<UserDetails>, initialBalance?: number) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const newUserDetails = generateUserDetails(customData);
      const newTransactions = generateTransactions(12 + Math.floor(Math.random() * 8), initialBalance);
      
      setUserDetails(newUserDetails);
      setTransactions(newTransactions);
      setCurrentStep('document-generated');
      setIsGenerating(false);
      
      const documentNames = {
        'metro-bank': 'Metro Bank Statement',
        'utility-bill': 'Spanish Utility Bill',
        'bank-statement': 'Spanish Bank Statement'
      };
      
      toast({
        title: "Document Generated!",
        description: `Your ${documentNames[documentType]} has been generated successfully.`,
      });
    }, 1000);
  };

  const downloadPDF = () => {
    if (!userDetails) return;
    
    toast({
      title: "Download Started",
      description: "Your PDF is being prepared for download.",
    });
    
    const elementId = selectedDocumentType === 'metro-bank' ? 'bank-statement' : 
                     selectedDocumentType === 'utility-bill' ? 'utility-bill' : 'spanish-bank-statement';
    
    const documentElement = document.getElementById(elementId);
    if (documentElement) {
      const clonedElement = documentElement.cloneNode(true) as HTMLElement;
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Document</title>
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
                background: white;
                color: black;
                line-height: 1.2;
                font-size: 11px;
              }
              
              @media print {
                body {
                  margin: 0 !important;
                  padding: 0 !important;
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
                
                #bank-statement, #utility-bill, #spanish-bank-statement {
                  page-break-inside: avoid;
                  transform: scale(0.85);
                  transform-origin: top left;
                  width: 118% !important;
                }
                
                table {
                  border-collapse: collapse !important;
                  width: 100% !important;
                }
                
                th, td {
                  border: 1px solid black !important;
                  padding: 4px !important;
                  font-size: 10px !important;
                  line-height: 1.2 !important;
                }
              }
              
              .bg-white { background-color: white; }
              .text-black { color: black; }
              .bg-gray-100 { background-color: #f3f4f6; }
              .bg-gray-50 { background-color: #f9fafb; }
              .bg-orange-50 { background-color: #fff7ed; }
              .bg-orange-500 { background-color: #f97316; }
              .text-white { color: white; }
              .text-orange-600 { color: #ea580c; }
              .font-bold { font-weight: 700; }
              .text-center { text-align: center; }
              .text-right { text-align: right; }
              .text-left { text-align: left; }
              .p-6 { padding: 1.5rem; }
              .p-4 { padding: 1rem; }
              .p-3 { padding: 0.75rem; }
              .p-2 { padding: 0.5rem; }
              .mb-8 { margin-bottom: 2rem; }
              .mb-6 { margin-bottom: 1.5rem; }
              .mb-4 { margin-bottom: 1rem; }
              .mb-2 { margin-bottom: 0.5rem; }
              .mt-4 { margin-top: 1rem; }
              .mt-2 { margin-top: 0.5rem; }
              .mt-1 { margin-top: 0.25rem; }
              .grid { display: grid; }
              .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
              .gap-8 { gap: 2rem; }
              .gap-6 { gap: 1.5rem; }
              .gap-4 { gap: 1rem; }
              .flex { display: flex; }
              .justify-between { justify-content: space-between; }
              .items-start { align-items: flex-start; }
              .space-y-2 > * + * { margin-top: 0.5rem; }
              .space-y-1 > * + * { margin-top: 0.25rem; }
              .border { border-width: 1px; }
              .border-2 { border-width: 2px; }
              .border-black { border-color: black; }
              .border-gray-300 { border-color: #d1d5db; }
              .border-t-2 { border-top-width: 2px; }
              .rounded { border-radius: 0.25rem; }
              .text-xs { font-size: 0.75rem; }
              .text-sm { font-size: 0.875rem; }
              .text-xl { font-size: 1.25rem; }
              .h-16 { height: 4rem; }
              .h-12 { height: 3rem; }
              .w-auto { width: auto; }
              .font-mono { font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace; }
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
    const initialBalance = customData.initialBalance ? parseFloat(customData.initialBalance) : undefined;
    const { initialBalance: _, ...userData } = customData;
    
    if (selectedDocumentType) {
      generateDocument(selectedDocumentType, userData, initialBalance);
    }
  };

  const resetToCountrySelection = () => {
    setCurrentStep('country-selection');
    setSelectedCountry('');
    setSelectedDocumentType('');
    setUserDetails(null);
    setTransactions([]);
  };

  const formatCurrency = (amount: number) => {
    return `£${amount.toFixed(2)}`;
  };

  const getDocumentTitle = () => {
    switch (selectedDocumentType) {
      case 'metro-bank': return 'Metro Bank Statement';
      case 'utility-bill': return 'Spanish Utility Bill';
      case 'bank-statement': return 'Spanish Bank Statement';
      default: return 'Document';
    }
  };

  const renderDocument = () => {
    if (!userDetails) return null;

    switch (selectedDocumentType) {
      case 'metro-bank':
        return <BankStatement userDetails={userDetails} transactions={transactions} />;
      case 'utility-bill':
        return <SpanishUtilityBill userDetails={userDetails} />;
      case 'bank-statement':
        return <SpanishBankStatement userDetails={userDetails} transactions={transactions} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Controls */}
      <div className="bg-gray-800 border-b border-gray-700 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Document Generator
            </h1>
            <p className="text-gray-400">
              Generate realistic documents for educational and design demo purposes
            </p>
          </div>

          {currentStep === 'country-selection' && (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-6 text-white">Select Your Country</h2>
            </div>
          )}

          {(currentStep === 'document-selection' || currentStep === 'document-generated') && (
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button 
                onClick={resetToCountrySelection}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Countries
              </Button>

              {currentStep === 'document-generated' && (
                <>
                  <Button 
                    onClick={() => selectedDocumentType && generateDocument(selectedDocumentType)}
                    disabled={isGenerating}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Regenerating...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        Regenerate
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
                    Custom Data
                  </Button>
                  
                  <Button 
                    onClick={downloadPDF}
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-600 hover:text-white px-6 py-3 rounded-lg shadow-lg"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </>
              )}
            </div>
          )}
          
          {currentStep === 'document-generated' && userDetails && (
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2 text-green-400">{getDocumentTitle()} Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Name:</span>
                  <p className="font-medium">{userDetails.name}</p>
                </div>
                <div>
                  <span className="text-gray-400">Country:</span>
                  <p className="font-medium">{selectedCountry === 'UK' ? 'United Kingdom' : 'Spain'}</p>
                </div>
                <div>
                  <span className="text-gray-400">Document Type:</span>
                  <p className="font-medium">{getDocumentTitle()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {currentStep === 'country-selection' && (
            <CountrySelector onCountrySelect={handleCountrySelect} />
          )}

          {currentStep === 'document-selection' && (
            <DocumentTypeSelector 
              country={selectedCountry}
              onDocumentTypeSelect={handleDocumentTypeSelect}
              onBack={resetToCountrySelection}
            />
          )}

          {currentStep === 'document-generated' && userDetails ? (
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              {renderDocument()}
            </div>
          ) : currentStep === 'document-generated' && (
            <div className="text-center py-12">
              <FileText className="h-24 w-24 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Document Generated</h3>
              <p className="text-gray-500">Something went wrong. Please try again.</p>
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
              The generated documents are not real and should never be used for fraudulent activities or official purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

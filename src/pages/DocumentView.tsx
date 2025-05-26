
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, Copy, CheckCircle } from 'lucide-react';
import { BankStatement } from '@/components/BankStatement';
import { SpanishUtilityBill } from '@/components/SpanishUtilityBill';
import { SpanishBankStatement } from '@/components/SpanishBankStatement';
import { generateUserDetails, generateTransactions, UserDetails, Transaction } from '@/utils/dataGenerator';
import { useToast } from '@/hooks/use-toast';

const DocumentView: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [documentType, setDocumentType] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Parse document data from URL or localStorage
    if (documentId) {
      const documentData = localStorage.getItem(`document_${documentId}`);
      if (documentData) {
        const parsed = JSON.parse(documentData);
        setUserDetails(parsed.userDetails);
        setTransactions(parsed.transactions || []);
        setDocumentType(parsed.documentType);
      } else {
        // Fallback: generate new data
        const newUserDetails = generateUserDetails();
        const newTransactions = generateTransactions(12 + Math.floor(Math.random() * 8));
        setUserDetails(newUserDetails);
        setTransactions(newTransactions);
        setDocumentType('metro-bank'); // default
      }
    }

    // Wait for full page load
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000); // Additional delay to ensure all assets are loaded
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [documentId]);

  const downloadPDF = () => {
    if (!isLoaded || !userDetails) {
      toast({
        title: "Please wait",
        description: "Document is still loading. Please try again in a moment.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Download Started",
      description: "Your PDF is being prepared for download.",
    });
    
    const elementId = documentType === 'metro-bank' ? 'bank-statement' : 
                     documentType === 'utility-bill' ? 'utility-bill' : 'spanish-bank-statement';
    
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

  const copyShareableLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(true);
      toast({
        title: "Link Copied",
        description: "Shareable link copied to clipboard!",
      });
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const renderDocument = () => {
    if (!userDetails) return null;

    switch (documentType) {
      case 'metro-bank':
        return <BankStatement userDetails={userDetails} transactions={transactions} />;
      case 'utility-bill':
        return <SpanishUtilityBill userDetails={userDetails} />;
      case 'bank-statement':
        return <SpanishBankStatement userDetails={userDetails} transactions={transactions} />;
      default:
        return <BankStatement userDetails={userDetails} transactions={transactions} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading document...</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="fixed top-4 right-4 z-40 flex gap-2">
        <Button 
          onClick={copyShareableLink}
          variant="outline"
          className="bg-white shadow-lg"
          disabled={!isLoaded}
        >
          {copySuccess ? <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> : <Copy className="mr-2 h-4 w-4" />}
          {copySuccess ? 'Copied!' : 'Copy Link'}
        </Button>
        
        <Button 
          onClick={downloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          disabled={!isLoaded}
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Document Content */}
      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          {userDetails && (
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                {renderDocument()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentView;

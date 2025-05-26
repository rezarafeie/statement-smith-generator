
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BankStatement } from '@/components/BankStatement';
import { SpanishUtilityBill } from '@/components/SpanishUtilityBill';
import { SpanishBankStatement } from '@/components/SpanishBankStatement';
import { UserDetails, Transaction } from '@/utils/dataGenerator';
import { ArrowLeft, Download, FileText, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';

type DocumentType = 'metro-bank' | 'utility-bill' | 'bank-statement';

interface DocumentState {
  userDetails: UserDetails;
  transactions: Transaction[];
  documentType: DocumentType;
  country: string;
}

const DocumentView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [documentState, setDocumentState] = useState<DocumentState | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      const savedDoc = localStorage.getItem(`doc_${slug}`);
      if (savedDoc) {
        try {
          const docState: DocumentState = JSON.parse(savedDoc);
          setDocumentState(docState);
        } catch (error) {
          console.error('Failed to load document:', error);
          navigate('/');
        }
      } else {
        navigate('/');
      }
    }
  }, [slug, navigate]);

  const downloadAsImage = async () => {
    if (!documentRef.current) return;
    
    try {
      const images = documentRef.current.querySelectorAll('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      const canvas = await html2canvas(documentRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: documentRef.current.scrollWidth,
        height: documentRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: documentRef.current.scrollWidth,
        windowHeight: documentRef.current.scrollHeight,
        x: 0,
        y: 0,
        removeContainer: true
      });
      
      const link = document.createElement('a');
      link.download = `document-${slug || Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Download Started",
        description: "Your document image is being downloaded.",
      });
    } catch (error) {
      console.error('Image download error:', error);
      toast({
        title: "Download Failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const downloadAsPDF = async () => {
    if (!documentRef.current) return;
    
    try {
      const images = documentRef.current.querySelectorAll('img');
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      const opt = {
        margin: 0,
        filename: `document-${slug || Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: documentRef.current.scrollWidth,
          height: documentRef.current.scrollHeight,
          x: 0,
          y: 0,
          removeContainer: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(documentRef.current).save();

      toast({
        title: "PDF Download Started",
        description: "Your document PDF is being downloaded.",
      });
    } catch (error) {
      console.error('PDF download error:', error);
      toast({
        title: "PDF Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const copyShareableLink = () => {
    const currentUrl = `${window.location.origin}/view/${slug}`;
    
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(true);
      toast({
        title: "Link Copied!",
        description: "Shareable link copied to clipboard!",
      });
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(() => {
      toast({
        title: "Copy Failed",
        description: "Failed to copy link to clipboard.",
        variant: "destructive"
      });
    });
  };

  const renderDocument = () => {
    if (!documentState) return null;

    switch (documentState.documentType) {
      case 'metro-bank':
        return <BankStatement userDetails={documentState.userDetails} transactions={documentState.transactions} />;
      case 'utility-bill':
        return <SpanishUtilityBill userDetails={documentState.userDetails} />;
      case 'bank-statement':
        return <SpanishBankStatement userDetails={documentState.userDetails} transactions={documentState.transactions} />;
      default:
        return null;
    }
  };

  if (!documentState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Loading document...</h2>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Generator
            </Button>
            
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Document View
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center flex-wrap">
            <Button 
              onClick={downloadAsImage}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg min-w-[160px]"
            >
              <Download className="mr-2 h-5 w-5" />
              Download as Image
            </Button>

            <Button 
              onClick={downloadAsPDF}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg min-w-[160px]"
            >
              <FileText className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
            
            <Button 
              onClick={copyShareableLink}
              variant="outline"
              className="border-gray-500 text-gray-600 hover:bg-gray-600 hover:text-white px-6 py-3 rounded-lg shadow-lg min-w-[160px]"
            >
              {copySuccess ? <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> : <Copy className="mr-2 h-4 w-4" />}
              {copySuccess ? "Link Copied!" : "Copy Link"}
            </Button>
          </div>
        </div>
      </div>

      {/* Document Display */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div 
            ref={documentRef} 
            className="bg-white rounded-lg shadow-2xl overflow-hidden"
            dir="ltr"
            style={{ direction: 'ltr' }}
          >
            <div className="overflow-x-auto">
              {renderDocument()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentView;

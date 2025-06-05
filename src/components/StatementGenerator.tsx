import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CustomDataForm } from './CustomDataForm';
import { CountrySelector } from './CountrySelector';
import { DocumentTypeSelector } from './DocumentTypeSelector';
import { BankStatement } from './BankStatement';
import { SpanishUtilityBill } from './SpanishUtilityBill';
import { SpanishBankStatement } from './SpanishBankStatement';
import { UKUtilityBill } from './UKUtilityBill';
import { generateUserDetails, generateSpanishUserDetails, generateTransactions, UserDetails, Transaction } from '../utils/dataGenerator';
import { RefreshCw, Download, Zap, User, Sun, Moon, Copy, CheckCircle, Languages, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';

type DocumentType = 'metro-bank' | 'utility-bill' | 'bank-statement' | 'uk-utility-bill';
type FlowStep = 'country-selection' | 'document-selection' | 'document-generated';
type Language = 'en' | 'fa';

interface DocumentState {
  userDetails: UserDetails;
  transactions: Transaction[];
  documentType: DocumentType;
  country: string;
}

interface Translations {
  [key: string]: {
    en: string;
    fa: string;
  };
}

const translations: Translations = {
  title: { en: 'Document Generator', fa: 'تولیدکننده اسناد' },
  subtitle: { en: 'Generate realistic documents for educational and design demo purposes', fa: 'تولید اسناد واقعی برای اهداف آموزشی و نمایشی' },
  selectCountry: { en: 'Select Your Country', fa: 'کشور خود را انتخاب کنید' },
  generateNew: { en: 'Generate New', fa: 'تولید جدید' },
  customData: { en: 'Custom Data', fa: 'داده‌های سفارشی' },
  downloadImage: { en: 'Download as Image', fa: 'دانلود به عنوان تصویر' },
  downloadPDF: { en: 'Download PDF', fa: 'دانلود PDF' },
  copyLink: { en: 'Copy Link', fa: 'کپی لینک' },
  linkCopied: { en: 'Link copied!', fa: 'لینک کپی شد!' },
  generating: { en: 'Generating...', fa: 'در حال تولید...' },
  documentGenerated: { en: 'Document Generated Successfully', fa: 'سند با موفقیت تولید شد' },
  disclaimer: { en: 'This tool is designed for educational and design demonstration purposes only. The generated documents are not real and should never be used for fraudulent activities or official purposes.', fa: 'این ابزار فقط برای اهداف آموزشی و نمایشی طراحی شده است. اسناد تولید شده واقعی نیستند و هرگز نباید برای فعالیت‌های تقلبی یا اهداف رسمی استفاده شوند.' },
  darkMode: { en: 'Dark Mode', fa: 'حالت تاریک' },
  lightMode: { en: 'Light Mode', fa: 'حالت روشن' },
  language: { en: 'Language', fa: 'زبان' }
};

export const StatementGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FlowStep>('country-selection');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType | ''>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [documentId, setDocumentId] = useState<string>('');
  const { toast } = useToast();
  const documentRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => translations[key]?.[language] || key;

  // Load document from URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get('doc');
    if (docId) {
      // Redirect to the new view route
      navigate(`/view/${docId}`);
    }
  }, [navigate]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fa' : 'en');
    if (language === 'en') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.lang = 'fa';
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.lang = 'en';
    }
  };

  const generateDocumentId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const saveDocumentState = (id: string, state: DocumentState) => {
    localStorage.setItem(`doc_${id}`, JSON.stringify(state));
  };

  const handleCountrySelect = (countryCode: string) => {
    console.log('Country selected:', countryCode);
    setSelectedCountry(countryCode);
    
    // For both UK and Spain, show document type selection
    setCurrentStep('document-selection');
    setSelectedDocumentType(''); // Reset document type
  };

  const handleDocumentTypeSelect = (documentType: string) => {
    console.log('Document type selected:', documentType);
    const docType = documentType as DocumentType;
    setSelectedDocumentType(docType);
    generateDocument(docType);
  };

  const isValidDocumentType = (docType: DocumentType | ''): docType is DocumentType => {
    return docType !== '' && ['metro-bank', 'utility-bill', 'bank-statement', 'uk-utility-bill'].includes(docType);
  };

  const generateDocument = (documentType: DocumentType, customData?: Partial<UserDetails>, initialBalance?: number) => {
    console.log('Generating document:', { documentType, customData, initialBalance });
    
    if (!isValidDocumentType(documentType)) {
      console.error('Invalid document type:', documentType);
      toast({
        title: "Error",
        description: "Invalid document type selected.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      // Use Spanish address generation for Spanish documents
      const isSpanishDocument = selectedCountry === 'ES' || ['utility-bill', 'bank-statement'].includes(documentType);
      const newUserDetails = isSpanishDocument 
        ? generateSpanishUserDetails(customData)
        : generateUserDetails(customData);
      
      const newTransactions = generateTransactions(12 + Math.floor(Math.random() * 8), initialBalance);
      const newDocId = generateDocumentId();
      
      setUserDetails(newUserDetails);
      setTransactions(newTransactions);
      setDocumentId(newDocId);
      setCurrentStep('document-generated');
      setIsGenerating(false);

      // Save document state for sharing
      const docState: DocumentState = {
        userDetails: newUserDetails,
        transactions: newTransactions,
        documentType,
        country: selectedCountry
      };
      saveDocumentState(newDocId, docState);

      toast({
        title: t('documentGenerated'),
        description: "Document has been generated successfully.",
      });
    }, 1000);
  };

  const handleCustomDataSubmit = (customData: Partial<UserDetails> & { initialBalance?: string }) => {
    console.log('Custom data submitted:', customData);
    console.log('Current document type:', selectedDocumentType);
    console.log('Current step:', currentStep);
    
    const initialBalance = customData.initialBalance ? parseFloat(customData.initialBalance) : undefined;
    const { initialBalance: _, ...userData } = customData;
    
    // Check if we have a valid document type selected
    if (!isValidDocumentType(selectedDocumentType)) {
      console.error('No valid document type selected when submitting custom data');
      toast({
        title: "Error",
        description: "Please select a document type first.",
        variant: "destructive"
      });
      return;
    }

    generateDocument(selectedDocumentType, userData, initialBalance);
  };

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
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        windowWidth: documentRef.current.scrollWidth,
        windowHeight: documentRef.current.scrollHeight,
        width: documentRef.current.scrollWidth,
        height: documentRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        removeContainer: false
      });
      
      const link = document.createElement('a');
      link.download = `document-${documentId || Date.now()}.png`;
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
        filename: `document-${documentId || Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          windowWidth: documentRef.current.scrollWidth,
          windowHeight: documentRef.current.scrollHeight,
          width: documentRef.current.scrollWidth,
          height: documentRef.current.scrollHeight,
          scrollX: 0,
          scrollY: 0,
          x: 0,
          y: 0,
          removeContainer: false
        },
        jsPDF: { 
          unit: 'mm', 
          format: [
            documentRef.current.scrollWidth * 0.264583,
            documentRef.current.scrollHeight * 0.264583
          ], 
          orientation: 'portrait' 
        }
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
    const currentUrl = documentId 
      ? `${window.location.origin}/view/${documentId}`
      : window.location.href;
    
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(true);
      toast({
        title: t('linkCopied'),
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

  const viewDocument = () => {
    if (documentId) {
      navigate(`/view/${documentId}`);
    }
  };

  const resetToCountrySelection = () => {
    setCurrentStep('country-selection');
    setSelectedCountry('');
    setSelectedDocumentType('');
    setUserDetails(null);
    setTransactions([]);
    setDocumentId('');
    // Clear URL
    window.history.pushState({}, '', window.location.pathname);
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
      case 'uk-utility-bill':
        return <UKUtilityBill userDetails={userDetails} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} ${language === 'fa' ? 'font-persian' : ''}`}>
      {/* Header Controls */}
      <div className={`border-b p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('subtitle')}
            </p>
          </div>

          {currentStep === 'country-selection' && (
            <div className="text-center">
              <h2 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('selectCountry')}
              </h2>
            </div>
          )}

          {currentStep === 'document-selection' && (
            <div className="space-y-6">
              <DocumentTypeSelector 
                country={selectedCountry}
                onDocumentTypeSelect={handleDocumentTypeSelect}
                onBack={resetToCountrySelection}
              />
              
              {/* Show custom data button only after a document type could be selected */}
              <div className="flex justify-center">
                <Button 
                  onClick={() => setShowCustomForm(true)}
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg shadow-lg"
                >
                  <User className="mr-2 h-4 w-4" />
                  {t('customData')}
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'document-generated' && (
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button 
                onClick={() => isValidDocumentType(selectedDocumentType) && generateDocument(selectedDocumentType)}
                disabled={isGenerating || !isValidDocumentType(selectedDocumentType)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    {t('generating')}
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    {t('generateNew')}
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
                {t('customData')}
              </Button>

              <Button 
                onClick={viewDocument}
                disabled={!documentId}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg"
              >
                View Document
              </Button>
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
            <div className="space-y-6">
              <DocumentTypeSelector 
                country={selectedCountry}
                onDocumentTypeSelect={handleDocumentTypeSelect}
                onBack={resetToCountrySelection}
              />
              
              {/* Show custom data button only after a document type could be selected */}
              <div className="flex justify-center">
                <Button 
                  onClick={() => setShowCustomForm(true)}
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg shadow-lg"
                >
                  <User className="mr-2 h-4 w-4" />
                  {t('customData')}
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'document-generated' && userDetails && (
            <div className="space-y-6">
              {/* Generated Document - Always LTR regardless of UI language */}
              <div 
                ref={documentRef} 
                className="bg-white rounded-lg shadow-2xl overflow-visible"
                dir="ltr"
                style={{ direction: 'ltr' }}
              >
                {renderDocument()}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center flex-wrap">
                <Button 
                  onClick={downloadAsImage}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg min-w-[160px]"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {t('downloadImage')}
                </Button>

                <Button 
                  onClick={downloadAsPDF}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg min-w-[160px]"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  {t('downloadPDF')}
                </Button>
                
                <Button 
                  onClick={copyShareableLink}
                  variant="outline"
                  className="border-gray-500 text-gray-600 hover:bg-gray-600 hover:text-white px-6 py-3 rounded-lg shadow-lg min-w-[160px]"
                >
                  {copySuccess ? <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copySuccess ? t('linkCopied') : t('copyLink')}
                </Button>
              </div>
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

      {/* Footer with Controls */}
      <div className={`border-t p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Controls */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className={`transition-colors duration-300 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
              title={t('language')}
            >
              <Languages className="h-4 w-4 mr-2" />
              {language === 'en' ? 'EN' : 'FA'}
            </Button>
            
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="sm"
              className={`transition-colors duration-300 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
              title={isDarkMode ? t('lightMode') : t('darkMode')}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Disclaimer */}
          <div className={`p-4 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
            <p className={`text-sm text-center transition-colors duration-300 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
              <strong>Disclaimer:</strong> {t('disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

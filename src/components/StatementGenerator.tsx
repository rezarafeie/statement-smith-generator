
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CustomDataForm } from './CustomDataForm';
import { CountrySelector } from './CountrySelector';
import { DocumentTypeSelector } from './DocumentTypeSelector';
import { BankStatement } from './BankStatement';
import { SpanishUtilityBill } from './SpanishUtilityBill';
import { SpanishBankStatement } from './SpanishBankStatement';
import { generateUserDetails, generateTransactions, UserDetails, Transaction } from '../utils/dataGenerator';
import { RefreshCw, Download, Zap, User, Sun, Moon, Copy, CheckCircle, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

type DocumentType = 'metro-bank' | 'utility-bill' | 'bank-statement';
type FlowStep = 'country-selection' | 'document-selection' | 'document-generated';
type Language = 'en' | 'fa';

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
  copyLink: { en: 'Copy Link', fa: 'کپی لینک' },
  linkCopied: { en: 'Copied!', fa: 'کپی شد!' },
  generating: { en: 'Generating...', fa: 'در حال تولید...' },
  documentGenerated: { en: 'Document Generated Successfully', fa: 'سند با موفقیت تولید شد' },
  disclaimer: { en: 'This tool is designed for educational and design demonstration purposes only. The generated documents are not real and should never be used for fraudulent activities or official purposes.', fa: 'این ابزار فقط برای اهداف آموزشی و نمایشی طراحی شده است. اسناد تولید شده واقعی نیستند و هرگز نباید برای فعالیت‌های تقلبی یا اهداف رسمی استفاده شوند.' }
};

export const StatementGenerator: React.FC = () => {
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
  const { toast } = useToast();
  const documentRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => translations[key]?.[language] || key;

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

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    
    if (countryCode === 'UK') {
      setSelectedDocumentType('metro-bank');
      generateDocument('metro-bank');
    } else if (countryCode === 'ES') {
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

      toast({
        title: t('documentGenerated'),
        description: "Document has been generated successfully.",
      });
    }, 1000);
  };

  const handleCustomDataSubmit = (customData: Partial<UserDetails> & { initialBalance?: string }) => {
    const initialBalance = customData.initialBalance ? parseFloat(customData.initialBalance) : undefined;
    const { initialBalance: _, ...userData } = customData;
    
    if (selectedDocumentType) {
      generateDocument(selectedDocumentType, userData, initialBalance);
    }
  };

  const downloadAsImage = async () => {
    if (!documentRef.current) return;
    
    try {
      const canvas = await html2canvas(documentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const link = document.createElement('a');
      link.download = `document-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();

      toast({
        title: "Download Started",
        description: "Your document image is being downloaded.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const copyShareableLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(true);
      toast({
        title: t('linkCopied'),
        description: "Link copied to clipboard!",
      });
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const resetToCountrySelection = () => {
    setCurrentStep('country-selection');
    setSelectedCountry('');
    setSelectedDocumentType('');
    setUserDetails(null);
    setTransactions([]);
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

          {currentStep === 'document-generated' && (
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button 
                onClick={() => selectedDocumentType && generateDocument(selectedDocumentType)}
                disabled={isGenerating}
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

          {currentStep === 'document-generated' && userDetails && (
            <div className="space-y-6">
              {/* Generated Document */}
              <div ref={documentRef} className="bg-white rounded-lg shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  {renderDocument()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Button 
                  onClick={downloadAsImage}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {t('downloadImage')}
                </Button>
                
                <Button 
                  onClick={copyShareableLink}
                  variant="outline"
                  className="border-gray-500 text-gray-600 hover:bg-gray-600 hover:text-white px-6 py-3 rounded-lg shadow-lg"
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
              size="icon"
              className={`transition-colors duration-300 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              <Languages className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
              className={`transition-colors duration-300 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
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

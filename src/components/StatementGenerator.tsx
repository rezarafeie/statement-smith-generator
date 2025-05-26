
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CustomDataForm } from './CustomDataForm';
import { CountrySelector } from './CountrySelector';
import { DocumentTypeSelector } from './DocumentTypeSelector';
import { generateUserDetails, generateTransactions, UserDetails, Transaction } from '../utils/dataGenerator';
import { RefreshCw, FileText, Zap, User, Sun, Moon, Menu, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type DocumentType = 'metro-bank' | 'utility-bill' | 'bank-statement';
type FlowStep = 'country-selection' | 'document-selection' | 'document-generated';

export const StatementGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('country-selection');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType | ''>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const generateDocumentId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const openDocumentInNewPage = (documentType: DocumentType, userDetails: UserDetails, transactions: Transaction[]) => {
    const documentId = generateDocumentId();
    
    // Store document data in localStorage
    const documentData = {
      userDetails,
      transactions,
      documentType,
      timestamp: Date.now()
    };
    
    localStorage.setItem(`document_${documentId}`, JSON.stringify(documentData));
    
    // Open in new tab
    const newUrl = `/view/${documentId}`;
    window.open(newUrl, '_blank');
    
    toast({
      title: "Document Generated!",
      description: "Your document has been opened in a new tab.",
    });
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
      
      openDocumentInNewPage(documentType, newUserDetails, newTransactions);
      setCurrentStep('document-generated');
      setIsGenerating(false);
    }, 1000);
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
    setIsMobileMenuOpen(false);
  };

  const getDocumentTitle = () => {
    switch (selectedDocumentType) {
      case 'metro-bank': return 'Metro Bank Statement';
      case 'utility-bill': return 'Spanish Utility Bill';
      case 'bank-statement': return 'Spanish Bank Statement';
      default: return 'Document';
    }
  };

  const ActionButtons = () => (
    <>
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
                Generating...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Generate New
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
            onClick={resetToCountrySelection}
            variant="outline"
            className="border-gray-500 text-gray-400 hover:bg-gray-600 hover:text-white px-6 py-3 rounded-lg shadow-lg"
          >
            <FileText className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </>
      )}
    </>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header Controls */}
      <div className={`border-b p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header with Theme Toggle */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Document Generator
              </h1>
              <p className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Generate realistic documents for educational and design demo purposes
              </p>
            </div>
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
              className={`transition-colors duration-300 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {currentStep === 'country-selection' && (
            <div className="text-center">
              <h2 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Select Your Country
              </h2>
            </div>
          )}

          {(currentStep === 'document-selection' || currentStep === 'document-generated') && (
            <>
              {/* Mobile Menu Button */}
              <div className="lg:hidden mb-4">
                <Button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  variant="outline"
                  className={`w-full justify-center transition-colors duration-300 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                >
                  {isMobileMenuOpen ? <X className="mr-2 h-4 w-4" /> : <Menu className="mr-2 h-4 w-4" />}
                  {isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                </Button>
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex flex-col sm:flex-row gap-4 items-center justify-center">
                <ActionButtons />
              </div>

              {/* Mobile Actions Menu */}
              {isMobileMenuOpen && (
                <div className="lg:hidden space-y-3 mb-4">
                  <ActionButtons />
                </div>
              )}
            </>
          )}
          
          {currentStep === 'document-generated' && (
            <div className={`mt-6 p-4 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className="font-semibold mb-2 text-green-400">{getDocumentTitle()} Generated</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status:</span>
                  <p className="font-medium text-green-500">Document opened in new tab</p>
                </div>
                <div>
                  <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Country:</span>
                  <p className="font-medium">{selectedCountry === 'UK' ? 'United Kingdom' : 'Spain'}</p>
                </div>
                <div>
                  <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Document Type:</span>
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

          {currentStep === 'document-generated' && (
            <div className="text-center py-12">
              <FileText className={`h-24 w-24 mx-auto mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Document Generated Successfully</h3>
              <p className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Your document has been opened in a new tab. You can generate another document or customize the data using the buttons above.</p>
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
      <div className={`border-t p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className={`p-4 border rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
            <p className={`text-sm text-center transition-colors duration-300 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
              <strong>Disclaimer:</strong> This tool is designed for educational and design demonstration purposes only. 
              The generated documents are not real and should never be used for fraudulent activities or official purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

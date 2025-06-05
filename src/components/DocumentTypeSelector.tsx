
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Receipt } from 'lucide-react';

interface DocumentType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface DocumentTypeSelectorProps {
  country: string;
  onDocumentTypeSelect: (documentType: string) => void;
  onBack: () => void;
}

const ukDocuments: DocumentType[] = [
  {
    id: 'metro-bank',
    name: 'Bank Statement',
    description: 'Metro Bank account statement',
    icon: <FileText className="h-8 w-8" />
  },
  {
    id: 'uk-utility-bill',
    name: 'Utility Bill',
    description: 'British Gas electricity bill',
    icon: <Receipt className="h-8 w-8" />
  }
];

const spanishDocuments: DocumentType[] = [
  {
    id: 'utility-bill',
    name: 'Utility Bill',
    description: 'Electricity or gas bill from Fenie Energía',
    icon: <Receipt className="h-8 w-8" />
  },
  {
    id: 'bank-statement',
    name: 'Bank Statement',
    description: 'Bankinter account statement',
    icon: <FileText className="h-8 w-8" />
  }
];

export const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({ 
  country, 
  onDocumentTypeSelect
}) => {
  const getCountryName = (code: string) => {
    switch (code) {
      case 'ES': return 'Spain';
      case 'UK': return 'United Kingdom';
      default: return code;
    }
  };

  const getDocuments = (code: string) => {
    switch (code) {
      case 'UK': return ukDocuments;
      case 'ES': return spanishDocuments;
      default: return [];
    }
  };

  const documents = getDocuments(country);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Select Document Type - {getCountryName(country)}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((document) => (
          <Card 
            key={document.id}
            className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
            onClick={() => onDocumentTypeSelect(document.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-blue-400 mb-4 flex justify-center">
                {document.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{document.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{document.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

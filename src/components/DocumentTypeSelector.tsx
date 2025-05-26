
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Receipt, ArrowLeft } from 'lucide-react';

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
  onDocumentTypeSelect, 
  onBack 
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
      case 'ES': return spanishDocuments;
      default: return [];
    }
  };

  const documents = getDocuments(country);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="mr-4 border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-white">
          Select Document Type - {getCountryName(country)}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((document) => (
          <Card 
            key={document.id}
            className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg bg-gray-800 border-gray-700 hover:border-blue-500"
            onClick={() => onDocumentTypeSelect(document.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-blue-400 mb-4 flex justify-center">
                {document.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{document.name}</h3>
              <p className="text-gray-400 text-sm">{document.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

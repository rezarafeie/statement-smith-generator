
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface CountrySelectorProps {
  onCountrySelect: (countryCode: string) => void;
}

const countries: Country[] = [
  {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧'
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸'
  }
];

export const CountrySelector: React.FC<CountrySelectorProps> = ({ onCountrySelect }) => {
  return (
    <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
      {countries.map((country) => (
        <Card 
          key={country.code}
          className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
          onClick={() => onCountrySelect(country.code)}
        >
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-3">{country.flag}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{country.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Click to select documents</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

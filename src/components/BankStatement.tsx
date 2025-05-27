
import React from 'react';
import { UserDetails, Transaction } from '../utils/dataGenerator';

interface BankStatementProps {
  userDetails: UserDetails;
  transactions: Transaction[];
}

export const BankStatement: React.FC<BankStatementProps> = ({ userDetails, transactions }) => {
  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)}`;
  };

  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    return `${day}.${month}.${year}`;
  };

  const openingBalance = transactions.length > 0 ? transactions[0].balance - transactions[0].amount * (transactions[0].type === 'credit' ? 1 : -1) : 0;
  const closingBalance = transactions.length > 0 ? transactions[transactions.length - 1].balance : 0;

  // Helper function to safely format statement period
  const formatStatementPeriod = (period: string | undefined) => {
    if (!period) return 'N/A';
    return period.replace(/\//g, '/');
  };

  // Helper function to format address in 3-line structure
  const formatAddress = (address: string | undefined) => {
    if (!address) return ['N/A'];
    
    // Check if address uses the new pipe-separated format
    if (address.includes('|')) {
      return address.split('|');
    }
    
    // Handle legacy comma-separated format
    const parts = address.split(', ');
    if (parts.length >= 3) {
      // Try to restructure: [street], [city, postcode], [country]
      const street = parts[0];
      const cityPostcode = parts.slice(1, -1).join(', ');
      const country = parts[parts.length - 1].toUpperCase();
      return [street, cityPostcode, country];
    }
    
    // Fallback for simple addresses
    return parts;
  };

  const addressLines = formatAddress(userDetails.address);

  return (
    <div 
      id="bank-statement" 
      className="bg-white text-black text-xs" 
      style={{ 
        width: '210mm', 
        minHeight: '270mm', 
        margin: '0 auto',
        fontFamily: '"Times New Roman", Georgia, serif'
      }}
    >
      {/* Header with exact Metro Bank image */}
      <div className="w-full">
        <img 
          src="/lovable-uploads/49f501b2-3158-46fc-9aa0-53aaba38dbb0.png" 
          alt="Metro Bank Header" 
          className="w-full h-auto block"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </div>

      {/* Main content container - matching header width exactly */}
      <div className="px-6 py-4">
        {/* Account holder and account details */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <h2 className="font-bold text-base mb-1" style={{ color: '#015fab' }}>{userDetails.name || 'N/A'}</h2>
            <div className="text-xs leading-relaxed">
              {addressLines.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
          <div className="text-xs">
            <div className="mb-1"><strong>Account number:</strong> {userDetails.accountNumber || 'N/A'}</div>
            <div className="mb-1"><strong>Account Currency:</strong> GBP</div>
            <div className="mb-1"><strong>Statement period:</strong> {formatStatementPeriod(userDetails.statementPeriod)}</div>
            <div className="mb-1"><strong>Statement date:</strong> {new Date().toLocaleDateString('en-GB').replace(/\//g, '/')}</div>
          </div>
        </div>

        {/* Account Summary Title */}
        <h2 className="font-bold text-lg mb-3 tracking-wider" style={{ color: '#015fab' }}>ACCOUNT SUMMARY</h2>

        {/* Main transactions table */}
        <div className="border border-black">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black p-2 text-center font-bold bg-gray-100 text-xs">Date</th>
                <th className="border border-black p-2 text-center font-bold bg-gray-100 text-xs">Amount</th>
                <th className="border border-black p-2 text-center font-bold bg-gray-100 text-xs">Currency</th>
                <th className="border border-black p-2 text-center font-bold bg-gray-100 text-xs">Credit</th>
                <th className="border border-black p-2 text-center font-bold bg-gray-100 text-xs">Debit</th>
                <th className="border border-black p-2 text-center font-bold bg-gray-100 text-xs">Balance at the end</th>
                <th className="border border-black p-2 text-center font-bold bg-gray-100 text-xs">Transaction description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 10).map((transaction, index) => (
                <tr key={index} className="bg-white">
                  <td className="border border-black p-2 text-center text-xs">{formatDate(transaction.date)}</td>
                  <td className="border border-black p-2 text-center text-xs">{formatCurrency(transaction.amount)}</td>
                  <td className="border border-black p-2 text-center text-xs">GBP</td>
                  <td className="border border-black p-2 text-center text-xs">
                    {transaction.type === 'credit' ? formatCurrency(transaction.amount) : ''}
                  </td>
                  <td className="border border-black p-2 text-center text-xs">
                    {transaction.type === 'debit' ? formatCurrency(transaction.amount) : ''}
                  </td>
                  <td className="border border-black p-2 text-center text-xs">{formatCurrency(transaction.balance)}</td>
                  <td className="border border-black p-2 text-left text-xs">{transaction.description}</td>
                </tr>
              ))}
              {/* Add empty rows to fill space */}
              {Array.from({ length: Math.max(0, 5 - Math.min(transactions.length, 10)) }, (_, i) => (
                <tr key={`empty-${i}`} className="bg-white">
                  <td className="border border-black p-2 h-8 text-xs"></td>
                  <td className="border border-black p-2 text-xs"></td>
                  <td className="border border-black p-2 text-xs"></td>
                  <td className="border border-black p-2 text-xs"></td>
                  <td className="border border-black p-2 text-xs"></td>
                  <td className="border border-black p-2 text-xs"></td>
                  <td className="border border-black p-2 text-xs"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with Metro Bank branding and address */}
        <div className="mt-6 text-center">
          <img 
            src="/lovable-uploads/d439f0b9-7a36-4148-a06c-3ebcd9782b4c.png" 
            alt="Metro Bank Logo" 
            className="h-6 w-auto mx-auto mb-2"
          />
          <div className="text-xs text-gray-700">
            <p>Address: 58-64 Fargate, Sheffield City Centre, Sheffield S1 2HE, United Kingdom</p>
            <p>Tel.: +44 345 080 8500</p>
            <p>Web: www.metrobankonline.co.uk</p>
          </div>
        </div>
      </div>
    </div>
  );
};

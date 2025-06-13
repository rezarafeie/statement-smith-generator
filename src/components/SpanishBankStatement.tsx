
import React from 'react';
import { UserDetails, Transaction } from '../utils/dataGenerator';

interface SpanishBankStatementProps {
  userDetails: UserDetails;
  transactions: Transaction[];
}

export const SpanishBankStatement: React.FC<SpanishBankStatementProps> = ({ 
  userDetails, 
  transactions 
}) => {
  const formatCurrency = (amount: number) => {
    return `€ ${amount.toFixed(2)}`;
  };

  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    return `${month}/${day}`;
  };

  // Helper function to format address with Address Line 2 support
  const formatAddress = (address: string | undefined) => {
    if (!address) return ['N/A'];
    
    // Check if address uses the new pipe-separated format: fullAddress|addressLine2|city,postcode|country
    if (address.includes('|')) {
      const parts = address.split('|');
      if (parts.length >= 4) {
        const addressLines = [];
        addressLines.push(parts[0]); // street address
        if (parts[1] && parts[1].trim()) { // address line 2 (if not empty)
          addressLines.push(parts[1]);
        }
        addressLines.push(parts[2]); // city, postcode
        addressLines.push(parts[3]); // country
        return addressLines;
      } else if (parts.length >= 3) {
        // Legacy format
        return parts;
      }
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

  const openingBalance = transactions.length > 0 ? 29710 : 0;
  const totalMoneyIn = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const totalMoneyOut = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);
  const closingBalance = transactions.length > 0 ? transactions[transactions.length - 1].balance : 0;

  return (
    <div 
      id="spanish-bank-statement" 
      className="bg-white text-black text-sm" 
      style={{ 
        width: '210mm', 
        minHeight: '270mm', 
        margin: '0 auto',
        fontFamily: '"Times New Roman", Georgia, serif'
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-xs">
              <div>Paseo de la Castellana, 29. 28046, Madrid</div>
              <div>+34-916-57-88-01</div>
            </div>
          </div>
          <div>
            <img 
              src="/lovable-uploads/f3b90b57-efef-4c30-aebb-12f62b6c680f.png" 
              alt="Bankinter" 
              className="h-12 w-auto"
            />
          </div>
        </div>

        {/* Account Details */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <div className="text-sm">
              <div className="font-bold">{userDetails.name}</div>
              <div className="mt-1">
                {addressLines.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-right text-sm">
            <div><strong>Account Name:</strong> {userDetails.name}</div>
            <div><strong>Account Number:</strong> {userDetails.accountNumber}</div>
            <div className="mt-2"><strong>Statement Period:</strong> {userDetails.statementPeriod}</div>
          </div>
        </div>

        {/* Account Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-orange-600 mb-4">ACCOUNT SUMMARY</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span><strong>Balance on Dec 1:</strong></span>
              <span>{formatCurrency(openingBalance)}</span>
            </div>
            <div className="flex justify-between">
              <span><strong>Total money in:</strong></span>
              <span>{formatCurrency(totalMoneyIn)}</span>
            </div>
            <div className="flex justify-between">
              <span><strong>Total money out:</strong></span>
              <span>{formatCurrency(totalMoneyOut)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span><strong>Balance on Dec 31:</strong></span>
              <span>{formatCurrency(closingBalance)}</span>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-orange-500 text-white">
          <div className="grid grid-cols-5 gap-4 p-3 font-bold text-sm">
            <div>DATE</div>
            <div>DESCRIPTION</div>
            <div className="text-center">WITHDRAWAL</div>
            <div className="text-center">DEPOSIT</div>
            <div className="text-center">BALANCE</div>
          </div>
        </div>

        <div className="space-y-1">
          {/* Previous Balance Row */}
          <div className="grid grid-cols-5 gap-4 p-3 text-sm bg-orange-50">
            <div></div>
            <div className="font-bold">Previous balance</div>
            <div></div>
            <div></div>
            <div className="text-center">{openingBalance}</div>
          </div>

          {/* Transaction Rows */}
          {transactions.slice(0, 10).map((transaction, index) => (
            <div key={index} className={`grid grid-cols-5 gap-4 p-3 text-sm ${index % 2 === 0 ? 'bg-orange-50' : 'bg-white'}`}>
              <div>{formatDate(transaction.date)}</div>
              <div>{transaction.description}</div>
              <div className="text-center">
                {transaction.type === 'debit' ? transaction.amount.toFixed(2) : ''}
              </div>
              <div className="text-center">
                {transaction.type === 'credit' ? transaction.amount.toFixed(2) : ''}
              </div>
              <div className="text-center">{transaction.balance.toFixed(2)}</div>
            </div>
          ))}

          {/* Ending Balance Row */}
          <div className="grid grid-cols-5 gap-4 p-3 text-sm bg-orange-50 font-bold">
            <div></div>
            <div>Ending Balance</div>
            <div></div>
            <div></div>
            <div className="text-center">{closingBalance}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

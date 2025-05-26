
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

  return (
    <div id="bank-statement" className="bg-white text-black p-6 max-w-4xl mx-auto font-sans text-xs" style={{ minHeight: '270mm', width: '210mm' }}>
      {/* Header with Metro Bank image */}
      <div className="relative mb-4">
        <img 
          src="/lovable-uploads/c818d778-bf0c-4bb2-b375-2ac991da54f5.png" 
          alt="Metro Bank Header" 
          className="w-full h-auto"
          style={{ maxHeight: '80px', objectFit: 'contain' }}
        />
      </div>

      {/* Account holder and account details */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <h2 className="font-bold text-base mb-1" style={{ color: '#015fab' }}>{userDetails.name}</h2>
          <div className="text-xs leading-relaxed">
            {userDetails.address.split(', ').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
        <div className="text-xs">
          <div className="mb-1"><strong>Account number:</strong> {userDetails.accountNumber}</div>
          <div className="mb-1"><strong>Account Currency:</strong> GBP</div>
          <div className="mb-1"><strong>Statement period:</strong> {userDetails.statementPeriod.replace(/\//g, '/')}</div>
          <div className="mb-1"><strong>Statement date:</strong> {new Date().toLocaleDateString('en-GB').replace(/\//g, '/')}</div>
        </div>
      </div>

      {/* Account Summary Title */}
      <h2 className="font-bold text-lg mb-3 tracking-wider" style={{ color: '#015fab' }}>ACCOUNT SUMMARY</h2>

      {/* Main transactions table */}
      <div className="border-2 border-black">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th rowSpan={2} className="border border-black p-1 text-center font-bold bg-gray-100 w-16 text-xs">Date</th>
              <th rowSpan={2} className="border border-black p-1 text-center font-bold bg-gray-100 w-16 text-xs">Amount</th>
              <th rowSpan={2} className="border border-black p-1 text-center font-bold bg-gray-100 w-16 text-xs">Currency</th>
              <th colSpan={2} className="border border-black p-1 text-center font-bold bg-gray-100 text-xs">Transaction amount in the account currency</th>
              <th rowSpan={2} className="border border-black p-1 text-center font-bold bg-gray-100 w-20 text-xs">Balance at the end</th>
              <th rowSpan={2} className="border border-black p-1 text-center font-bold bg-gray-100 text-xs">Transaction description</th>
            </tr>
            <tr>
              <th className="border border-black p-1 text-center font-bold bg-gray-100 w-16 text-xs">Credit</th>
              <th className="border border-black p-1 text-center font-bold bg-gray-100 w-16 text-xs">Debit</th>
            </tr>
            <tr>
              <th colSpan={7} className="border border-black p-1 text-left font-bold bg-gray-200 text-xs">Transactions, other operations</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 8).map((transaction, index) => (
              <React.Fragment key={index}>
                <tr className="bg-white">
                  <td className="border border-black p-1 text-center text-xs">{formatDate(transaction.date)}</td>
                  <td className="border border-black p-1 text-center text-xs">{formatCurrency(transaction.amount)}</td>
                  <td className="border border-black p-1 text-center text-xs">GBP</td>
                  <td className="border border-black p-1 text-center text-xs">
                    {transaction.type === 'credit' ? formatCurrency(transaction.amount) : ''}
                  </td>
                  <td className="border border-black p-1 text-center text-xs">
                    {transaction.type === 'debit' ? formatCurrency(transaction.amount) : ''}
                  </td>
                  <td className="border border-black p-1 text-center text-xs"></td>
                  <td className="border border-black p-1 text-left text-xs">{transaction.description}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-black p-1 text-center text-xs"></td>
                  <td className="border border-black p-1 text-center text-xs"></td>
                  <td className="border border-black p-1 text-center text-xs"></td>
                  <td className="border border-black p-1 text-center text-xs"></td>
                  <td className="border border-black p-1 text-center text-xs"></td>
                  <td className="border border-black p-1 text-center font-bold text-xs">{formatCurrency(transaction.balance)}</td>
                  <td className="border border-black p-1 text-left text-xs">Balance at the end of day</td>
                </tr>
              </React.Fragment>
            ))}
            {/* Add empty rows to fill space but limit total */}
            {Array.from({ length: Math.max(0, 3 - Math.min(transactions.length, 8)) }, (_, i) => (
              <tr key={`empty-${i}`} className="bg-white">
                <td className="border border-black p-1 h-6 text-xs"></td>
                <td className="border border-black p-1 text-xs"></td>
                <td className="border border-black p-1 text-xs"></td>
                <td className="border border-black p-1 text-xs"></td>
                <td className="border border-black p-1 text-xs"></td>
                <td className="border border-black p-1 text-xs"></td>
                <td className="border border-black p-1 text-xs"></td>
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

      {/* Disclaimer */}
      <div className="mt-4 text-xs text-gray-600 border-t pt-3">
        <p className="mb-1">
          <strong>Important:</strong> This statement is for educational and demonstration purposes only. 
          It does not represent a real bank account or financial institution.
        </p>
        <p>Metro Bank PLC is authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and Prudential Regulation Authority.</p>
      </div>
    </div>
  );
};

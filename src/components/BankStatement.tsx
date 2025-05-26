
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

  // Base64 encoded Metro Bank logos for PDF rendering
  const metroHeaderBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="; // Placeholder - user will provide actual base64
  const metroLogoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="; // Placeholder - user will provide actual base64

  return (
    <div id="bank-statement" className="bg-white text-black font-sans" style={{ minHeight: '270mm', width: '210mm', padding: '10mm' }}>
      {/* Angular Blue Header with Metro Bank Logo */}
      <div className="relative mb-3">
        <div 
          className="relative px-4 py-3"
          style={{ 
            backgroundColor: '#015fab',
            clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)'
          }}
        >
          <img 
            src={metroLogoBase64}
            alt="Metro Bank" 
            className="h-6 w-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </div>

      {/* Account holder and account details */}
      <div className="grid grid-cols-2 gap-8 mb-3">
        <div>
          <h2 className="font-bold text-sm mb-1" style={{ color: '#015fab' }}>{userDetails.name}</h2>
          <div className="text-xs leading-tight">
            {userDetails.address.split(', ').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
        <div className="text-xs">
          <div className="mb-0.5"><strong>Account number:</strong> {userDetails.accountNumber}</div>
          <div className="mb-0.5"><strong>Account Currency:</strong> GBP</div>
          <div className="mb-0.5"><strong>Statement period:</strong> {userDetails.statementPeriod.replace(/\//g, '/')}</div>
          <div className="mb-0.5"><strong>Statement date:</strong> {new Date().toLocaleDateString('en-GB').replace(/\//g, '/')}</div>
        </div>
      </div>

      {/* Account Summary Title */}
      <h2 className="font-bold text-base mb-2 tracking-wide" style={{ color: '#015fab' }}>ACCOUNT SUMMARY</h2>

      {/* Main transactions table */}
      <div className="border border-black">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="border border-black p-1 text-center font-bold bg-gray-100 w-20">Date</th>
              <th className="border border-black p-1 text-center font-bold bg-gray-100 w-16">Amount</th>
              <th className="border border-black p-1 text-center font-bold bg-gray-100 w-16">Currency</th>
              <th className="border border-black p-1 text-center font-bold bg-gray-100 w-16">Credit</th>
              <th className="border border-black p-1 text-center font-bold bg-gray-100 w-16">Debit</th>
              <th className="border border-black p-1 text-center font-bold bg-gray-100 w-20">Balance at the end</th>
              <th className="border border-black p-1 text-center font-bold bg-gray-100">Transaction description</th>
            </tr>
            <tr>
              <th colSpan={7} className="border border-black p-1 text-left font-bold bg-gray-200">Transactions, other operations</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 12).map((transaction, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-black p-1 text-center">{formatDate(transaction.date)}</td>
                <td className="border border-black p-1 text-center">{formatCurrency(transaction.amount)}</td>
                <td className="border border-black p-1 text-center">GBP</td>
                <td className="border border-black p-1 text-center">
                  {transaction.type === 'credit' ? formatCurrency(transaction.amount) : ''}
                </td>
                <td className="border border-black p-1 text-center">
                  {transaction.type === 'debit' ? formatCurrency(transaction.amount) : ''}
                </td>
                <td className="border border-black p-1 text-center">{formatCurrency(transaction.balance)}</td>
                <td className="border border-black p-1 text-left">{transaction.description}</td>
              </tr>
            ))}
            {/* Add empty rows to fill space */}
            {Array.from({ length: Math.max(0, 3 - Math.min(transactions.length, 12)) }, (_, i) => (
              <tr key={`empty-${i}`} className="bg-white">
                <td className="border border-black p-1 h-5"></td>
                <td className="border border-black p-1"></td>
                <td className="border border-black p-1"></td>
                <td className="border border-black p-1"></td>
                <td className="border border-black p-1"></td>
                <td className="border border-black p-1"></td>
                <td className="border border-black p-1"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with Metro Bank branding */}
      <div className="mt-4 text-center">
        <img 
          src={metroLogoBase64}
          alt="Metro Bank Logo" 
          className="h-4 w-auto mx-auto mb-1"
        />
        <div className="text-xs text-gray-700">
          <p>Address: 58-64 Fargate, Sheffield City Centre, Sheffield S1 2HE, United Kingdom</p>
          <p>Tel.: +44 345 080 8500</p>
          <p>Web: www.metrobankonline.co.uk</p>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          <p>Metro Bank PLC is authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and Prudential Regulation Authority.</p>
        </div>
      </div>
    </div>
  );
};


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
    <div id="bank-statement" className="bg-white text-black p-8 max-w-4xl mx-auto font-sans text-sm" style={{ minHeight: '297mm', width: '210mm' }}>
      {/* Header with Metro Bank branding and custom shape */}
      <div className="relative mb-6">
        {/* Main blue header with custom shape */}
        <div className="relative" style={{ backgroundColor: '#015fab' }}>
          {/* Header content */}
          <div className="flex items-center p-4 text-white relative z-10">
            <img 
              src="/lovable-uploads/49eceb79-87a8-4f4c-856c-aecaf173538c.png" 
              alt="Metro Bank Logo" 
              className="h-12 w-auto"
            />
          </div>
          {/* Custom angled bottom edge */}
          <div 
            className="absolute bottom-0 left-0 w-full h-6"
            style={{
              background: 'linear-gradient(135deg, #015fab 0%, #015fab 85%, transparent 85%)',
              clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)'
            }}
          ></div>
        </div>
        {/* White space after header */}
        <div className="h-2 bg-white"></div>
      </div>

      {/* Account holder and account details */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <h2 className="font-bold text-lg mb-2" style={{ color: '#015fab' }}>{userDetails.name}</h2>
          <div className="text-sm leading-relaxed">
            {userDetails.address.split(', ').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
        <div className="text-sm">
          <div className="mb-1"><strong>Account number:</strong> {userDetails.accountNumber}</div>
          <div className="mb-1"><strong>Account Currency:</strong> GBP</div>
          <div className="mb-1"><strong>Statement period:</strong> {userDetails.statementPeriod.replace(/\//g, '/')}</div>
          <div className="mb-1"><strong>Statement date:</strong> {new Date().toLocaleDateString('en-GB').replace(/\//g, '/')}</div>
        </div>
      </div>

      {/* Account Summary Title */}
      <h2 className="font-bold text-xl mb-4 tracking-wider" style={{ color: '#015fab' }}>ACCOUNT SUMMARY</h2>

      {/* Main transactions table */}
      <div className="border-2 border-black">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th rowSpan={2} className="border border-black p-2 text-center font-bold bg-gray-100 w-20">Date</th>
              <th rowSpan={2} className="border border-black p-2 text-center font-bold bg-gray-100 w-20">Amount</th>
              <th rowSpan={2} className="border border-black p-2 text-center font-bold bg-gray-100 w-20">Currency</th>
              <th colSpan={2} className="border border-black p-2 text-center font-bold bg-gray-100">Transaction amount in the account currency</th>
              <th rowSpan={2} className="border border-black p-2 text-center font-bold bg-gray-100 w-24">Balance at the end</th>
              <th rowSpan={2} className="border border-black p-2 text-center font-bold bg-gray-100">Transaction description</th>
            </tr>
            <tr>
              <th className="border border-black p-2 text-center font-bold bg-gray-100 w-20">Credit</th>
              <th className="border border-black p-2 text-center font-bold bg-gray-100 w-20">Debit</th>
            </tr>
            <tr>
              <th colSpan={7} className="border border-black p-2 text-left font-bold bg-gray-200">Transactions, other operations</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <React.Fragment key={index}>
                <tr className="bg-white">
                  <td className="border border-black p-2 text-center">{formatDate(transaction.date)}</td>
                  <td className="border border-black p-2 text-center">{formatCurrency(transaction.amount)}</td>
                  <td className="border border-black p-2 text-center">GBP</td>
                  <td className="border border-black p-2 text-center">
                    {transaction.type === 'credit' ? formatCurrency(transaction.amount) : ''}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {transaction.type === 'debit' ? formatCurrency(transaction.amount) : ''}
                  </td>
                  <td className="border border-black p-2 text-center"></td>
                  <td className="border border-black p-2 text-left">{transaction.description}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-black p-2 text-center"></td>
                  <td className="border border-black p-2 text-center"></td>
                  <td className="border border-black p-2 text-center"></td>
                  <td className="border border-black p-2 text-center"></td>
                  <td className="border border-black p-2 text-center"></td>
                  <td className="border border-black p-2 text-center font-bold">{formatCurrency(transaction.balance)}</td>
                  <td className="border border-black p-2 text-left">Balance at the end of day</td>
                </tr>
              </React.Fragment>
            ))}
            {/* Add empty rows to match the template */}
            {Array.from({ length: Math.max(0, 8 - transactions.length) }, (_, i) => (
              <tr key={`empty-${i}`} className="bg-white">
                <td className="border border-black p-2 h-8"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
                <td className="border border-black p-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with Metro Bank branding and address */}
      <div className="mt-8 text-center">
        <img 
          src="/lovable-uploads/49eceb79-87a8-4f4c-856c-aecaf173538c.png" 
          alt="Metro Bank Logo" 
          className="h-8 w-auto mx-auto mb-2"
        />
        <div className="text-xs text-gray-700">
          <p>Address: 58-64 Fargate, Sheffield City Centre, Sheffield S1 2HE, United Kingdom</p>
          <p>Tel.: +44 345 080 8500</p>
          <p>Web: www.metrobankonline.co.uk</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 text-xs text-gray-600 border-t pt-4">
        <p className="mb-2">
          <strong>Important:</strong> This statement is for educational and demonstration purposes only. 
          It does not represent a real bank account or financial institution.
        </p>
        <p>Metro Bank PLC is authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and Prudential Regulation Authority.</p>
      </div>
    </div>
  );
};

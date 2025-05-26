
import React from 'react';
import { UserDetails, Transaction } from '../utils/dataGenerator';

interface BankStatementProps {
  userDetails: UserDetails;
  transactions: Transaction[];
}

export const BankStatement: React.FC<BankStatementProps> = ({ userDetails, transactions }) => {
  const formatCurrency = (amount: number) => {
    return `£${amount.toFixed(2)}`;
  };

  const openingBalance = transactions.length > 0 ? transactions[0].balance - transactions[0].amount * (transactions[0].type === 'credit' ? 1 : -1) : 0;
  const closingBalance = transactions.length > 0 ? transactions[transactions.length - 1].balance : 0;

  return (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto font-sans text-sm" style={{ minHeight: '297mm', width: '210mm' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">METRO BANK</h1>
          <p className="text-gray-600">One Southampton Row, London WC1B 5HA</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Current Account Statement</p>
          <p className="text-gray-600">Statement Period: {userDetails.statementPeriod}</p>
        </div>
      </div>

      {/* Account Details */}
      <div className="border-t-2 border-blue-800 pt-4 mb-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="font-semibold mb-2">Account Holder</h2>
            <p className="font-medium">{userDetails.name}</p>
            <p className="text-gray-700 whitespace-pre-line">{userDetails.address}</p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Account Details</h2>
            <p><span className="font-medium">Account Number:</span> {userDetails.accountNumber}</p>
            <p><span className="font-medium">Sort Code:</span> {userDetails.sortCode}</p>
            <p><span className="font-medium">Statement Date:</span> {new Date().toLocaleDateString('en-GB')}</p>
          </div>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="bg-gray-50 p-4 mb-6 rounded">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-semibold text-gray-700">Opening Balance</p>
            <p className="text-lg font-bold">{formatCurrency(openingBalance)}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Total Credits</p>
            <p className="text-lg font-bold text-green-600">
              {formatCurrency(transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0))}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Closing Balance</p>
            <p className="text-lg font-bold">{formatCurrency(closingBalance)}</p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="mb-8">
        <h2 className="font-semibold mb-4 text-lg">Transaction History</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="border border-gray-300 p-2 text-left">Date</th>
              <th className="border border-gray-300 p-2 text-left">Description</th>
              <th className="border border-gray-300 p-2 text-right">Amount</th>
              <th className="border border-gray-300 p-2 text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border border-gray-300 p-2">{transaction.date}</td>
                <td className="border border-gray-300 p-2">{transaction.description}</td>
                <td className={`border border-gray-300 p-2 text-right font-medium ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </td>
                <td className="border border-gray-300 p-2 text-right font-medium">
                  {formatCurrency(transaction.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t pt-4 text-xs text-gray-600">
        <p className="mb-2">
          <strong>Important:</strong> This statement is for educational and demonstration purposes only. 
          It does not represent a real bank account or financial institution.
        </p>
        <p>Metro Bank PLC is authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and Prudential Regulation Authority.</p>
        <div className="flex justify-between mt-4">
          <p>Page 1 of 1</p>
          <p>Generated on {new Date().toLocaleDateString('en-GB')} at {new Date().toLocaleTimeString('en-GB')}</p>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { UserDetails } from '@/utils/dataGenerator';

interface UKUtilityBillProps {
  userDetails: UserDetails;
}

export const UKUtilityBill: React.FC<UKUtilityBillProps> = ({ userDetails }) => {
  // Parse address from the formatted address string
  const parseAddress = (address: string) => {
    const parts = address.split('|');
    return {
      street: parts[0] || '',
      cityPostal: parts[1] || '',
      country: parts[2] || 'UNITED KINGDOM'
    };
  };

  const address = parseAddress(userDetails.address);
  const billDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  
  // Generate bill amounts
  const electricityCharges = (150 + Math.random() * 100).toFixed(2);
  const standingCharge = (25 + Math.random() * 15).toFixed(2);
  const vatAmount = ((parseFloat(electricityCharges) + parseFloat(standingCharge)) * 0.05).toFixed(2);
  const totalAmount = (parseFloat(electricityCharges) + parseFloat(standingCharge) + parseFloat(vatAmount)).toFixed(2);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8" style={{ fontFamily: '"Times New Roman", Georgia, serif' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="text-3xl font-bold text-blue-600 mb-2">British Gas</div>
          <div className="text-sm text-blue-500">Looking after your world</div>
        </div>
        <div className="bg-blue-400 text-white p-4 rounded">
          <div className="text-sm">Account number</div>
          <div className="text-lg font-bold">{userDetails.accountNumber.slice(0, 9)}</div>
          <div className="text-sm mt-2">Any questions?</div>
          <div className="text-xs">0800 000 0000</div>
          <div className="text-xs">britishgas.co.uk/business</div>
        </div>
      </div>

      {/* Customer Address */}
      <div className="mb-8">
        <div className="text-sm text-gray-600 mb-2">HEAD OFFICE</div>
        <div className="text-sm text-gray-600 mb-2">ANOTHER PLC</div>
        <div className="text-sm">
          <div>{address.street}</div>
          <div>{address.cityPostal}</div>
          <div>{address.country}</div>
        </div>
      </div>

      {/* Bill Title */}
      <div className="mb-6">
        <h1 className="text-2xl text-blue-400 font-normal mb-2">Your business electricity bill</h1>
        <div className="text-sm">
          <div>Head Office, Another Plc, {address.street},</div>
          <div>{address.cityPostal}</div>
        </div>
        <div className="text-sm mt-2">{billDate} - {dueDate}</div>
      </div>

      {/* Account Section */}
      <div className="mb-8">
        <h2 className="text-xl text-blue-400 mb-4">Your account</h2>
        
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>Since your previous bill</div>
          <div></div>
          
          <div>Outstanding balance on 10 February 2024</div>
          <div className="text-right">£61.14</div>
          
          <div>Cheque received – 20 February 2024</div>
          <div className="text-right">£61.14 CR</div>
          
          <div>Balance from last bill</div>
          <div className="text-right">£0.00</div>
        </div>

        <div className="border-t pt-4 mb-4">
          <div className="font-bold mb-2">New charges this bill (see over for details)</div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Electricity charges</div>
            <div className="text-right">£{electricityCharges}</div>
            
            <div>Standing charge</div>
            <div className="text-right">£{standingCharge}</div>
            
            <div>Total charges exc VAT</div>
            <div className="text-right">£{(parseFloat(electricityCharges) + parseFloat(standingCharge)).toFixed(2)}</div>
            
            <div>VAT</div>
            <div className="text-right">£{vatAmount}</div>
            
            <div className="font-bold">Total new charges this bill inc VAT</div>
            <div className="text-right font-bold">£{totalAmount}</div>
          </div>
        </div>
      </div>

      {/* Total Amount Due */}
      <div className="border-t-2 border-blue-400 pt-4 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-blue-400">Total amount now due</h2>
          <div className="text-3xl font-bold text-blue-400">£{totalAmount}</div>
        </div>
        <div className="text-sm mt-2">Please pay this by {dueDate}</div>
      </div>

      {/* Payment Slip */}
      <div className="border-t border-dashed border-gray-400 pt-6">
        <div className="bg-gray-50 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-red-600 text-white px-2 py-1 text-xs">Santander</div>
              <div className="font-bold">Energy Payment Slip</div>
              <div>British Gas</div>
              <div className="ml-auto">
                <div className="text-xs">Amount due</div>
                <div className="border border-gray-400 px-2 py-1">£ {totalAmount}</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-xs text-gray-600">Reference (customer account number)</div>
              <div className="border border-gray-400 px-2 py-1 bg-white">{userDetails.accountNumber.slice(0, 9)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Credit account number</div>
              <div className="border border-gray-400 px-2 py-1 bg-white">143 0947</div>
            </div>
            <div>
              <div className="text-xs text-gray-600">HEAD OFFICE</div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div style={{ fontFamily: 'monospace', fontSize: '24px', letterSpacing: '2px' }}>
              ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
            </div>
          </div>

          <div className="text-center text-xs mt-2" style={{ fontFamily: 'monospace' }}>
            101822288600485895 442414309947 91 X
          </div>
        </div>
      </div>
    </div>
  );
};

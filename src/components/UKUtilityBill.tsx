
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
  const totalExcVat = (parseFloat(electricityCharges) + parseFloat(standingCharge)).toFixed(2);
  const vatAmount = (parseFloat(totalExcVat) * 0.05).toFixed(2);
  const totalAmount = (parseFloat(totalExcVat) + parseFloat(vatAmount)).toFixed(2);

  const previousBalance = (50 + Math.random() * 20).toFixed(2);
  const paymentReceived = previousBalance;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', lineHeight: '1.2' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          {/* QR Code placeholder */}
          <div className="w-12 h-12 border border-gray-400 flex items-center justify-center text-xs">
            QR
          </div>
          
          <div>
            <img 
              src="/lovable-uploads/6bb6c790-c984-4579-a1dd-cd589be1de20.png" 
              alt="British Gas" 
              className="h-12 mb-1"
            />
            <div className="text-xs text-blue-500">Looking after your world</div>
          </div>
        </div>

        {/* Account Info Box */}
        <div className="bg-cyan-400 text-white p-4 rounded text-center" style={{ width: '180px' }}>
          <div className="text-xs mb-1">Bill date: {billDate}</div>
          <div className="text-xs mb-1">Bill number: 000000000</div>
          <div className="text-xs mb-3">VAT reg no: GB 000 0000 00</div>
          <div className="text-xs mb-2 font-bold">Account number</div>
          <div className="text-lg font-bold mb-3">{userDetails.accountNumber.slice(0, 9)}</div>
          <div className="text-xs mb-1 font-bold">Any questions?</div>
          <div className="flex items-center justify-center gap-1 text-xs mb-1">
            <span className="bg-gray-800 text-white px-1 rounded">📞</span>
            <span>0800 000 0000</span>
          </div>
          <div className="text-xs">Mon - Fri 8am to 6pm</div>
          <div className="text-xs mb-2">Sat 9am to 1pm</div>
          <div className="flex items-center justify-center gap-1 text-xs">
            <span className="bg-gray-800 text-white px-1 rounded">🌐</span>
            <span>britishgas.co.uk/business</span>
          </div>
        </div>
      </div>

      {/* Customer Address */}
      <div className="mb-8 text-sm">
        <div className="text-gray-700 mb-1">HEAD OFFICE</div>
        <div className="text-gray-700 mb-1">ANOTHER PLC</div>
        <div className="font-medium">
          <div>{address.street}</div>
          <div>{address.cityPostal}</div>
        </div>
      </div>

      {/* Bill Title Section */}
      <div className="mb-6">
        <h1 className="text-2xl text-cyan-400 font-normal mb-3">Your business electricity bill</h1>
        <div className="text-sm mb-2">
          <span className="font-medium">Head Office, Another Plc, {address.street}, {address.cityPostal}</span>
        </div>
        <div className="text-sm text-gray-700 mb-4">{billDate} - {dueDate}</div>
      </div>

      {/* Fixed Price Energy Plan Box */}
      <div className="float-right bg-gray-100 border p-3 mb-4" style={{ width: '240px' }}>
        <div className="text-sm font-bold mb-1">Your Fixed Price Energy Plan will renew on 16/07/15</div>
        <div className="text-xs text-gray-700">
          Your new Fixed Price Energy Plan will end on 16/07/15. We'll write to you around 60 days before this date to tell you about your options, including how to end your plan. To discuss your energy account with us, please call us on 0330 100 005.
        </div>
      </div>

      {/* Your Account Section */}
      <div className="mb-8 clear-both">
        <h2 className="text-xl text-cyan-400 mb-4">Your account</h2>
        
        <div className="text-sm mb-4">
          <div className="font-bold mb-2">Since your previous bill</div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Outstanding balance on 10 February 2014</span>
              <span>£{previousBalance}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Cheque received – 20 February 2014</span>
              <span>£{paymentReceived} CR</span>
            </div>
            
            <div className="flex justify-between font-bold">
              <span>Balance from last bill</span>
              <span>£0.00</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="font-bold mb-3 text-sm">New charges this bill (see over for details)</div>
          
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Electricity charges</span>
              <span>£{electricityCharges}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Standing charge</span>
              <span>£{standingCharge}</span>
            </div>
            
            <div className="flex justify-between font-bold">
              <span>Total charges exc VAT</span>
              <span>£{totalExcVat}</span>
            </div>
            
            <div className="flex justify-between">
              <span>VAT</span>
              <span>£{vatAmount}</span>
            </div>
            
            <div className="flex justify-between font-bold text-base border-t pt-2">
              <span>Total new charges this bill inc VAT</span>
              <span>£{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charges Info Box */}
      <div className="float-right bg-yellow-200 border p-3 mb-4" style={{ width: '240px' }}>
        <div className="text-sm font-bold mb-1">Your charges this month are based on ESTIMATED readings</div>
        <div className="text-xs text-gray-700">
          To keep your charges accurate go to britishgas.co.uk/business/read and help us with your latest reading.
        </div>
      </div>

      {/* Business Value Box */}
      <div className="float-right bg-gray-100 border p-3 mb-4 clear-right" style={{ width: '240px' }}>
        <div className="text-sm font-bold mb-1">We value your business</div>
        <div className="text-xs text-gray-700">
          If we can help explain any element of your bill or support your business in reducing bills, please contact us.
        </div>
      </div>

      {/* Total Amount Due */}
      <div className="border-t-2 border-cyan-400 pt-4 mb-8 clear-both">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-cyan-400">Total amount now due</h2>
          <div className="text-3xl font-bold text-cyan-400">£{totalAmount}</div>
        </div>
        <div className="text-sm mt-2">Please pay this by {dueDate}</div>
      </div>

      {/* Payment Slip */}
      <div className="border-t border-dashed border-gray-400 pt-6">
        <div className="bg-gray-50 p-4 border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 text-white px-3 py-1 text-sm font-bold">Santander</div>
              <div className="font-bold text-lg">Energy Payment Slip</div>
              <div className="text-sm">British Gas</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-600 mb-1">Amount due</div>
              <div className="border border-gray-400 px-3 py-2 bg-white text-lg font-bold">£ {totalAmount}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 text-sm mb-4">
            <div>
              <div className="text-xs text-gray-600 mb-1">Reference (customer account number)</div>
              <div className="border border-gray-400 px-3 py-2 bg-white font-mono">{userDetails.accountNumber.slice(0, 9)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Credit account number</div>
              <div className="border border-gray-400 px-3 py-2 bg-white font-mono">143 0947</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Sort code</div>
              <div className="font-mono">43-09-47</div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="text-sm">HEAD OFFICE</div>
            <div className="text-right">
              <div className="text-xs text-gray-600">bank giro credit</div>
              <div className="text-lg font-bold">♠</div>
            </div>
          </div>

          {/* Barcode section */}
          <div className="text-center mb-4">
            <div style={{ fontFamily: 'monospace', fontSize: '32px', letterSpacing: '1px' }}>
              ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-mono text-center">101822288600485895 442414309947 91 X</div>
            </div>
            <div className="text-right">
              <div className="border border-gray-400 w-20 h-8 ml-auto"></div>
              <div className="text-xs mt-1">£</div>
            </div>
          </div>

          <div className="text-xs text-gray-600 mt-2">
            <div>Cashiers stamp Signature</div>
            <div>and initials Date</div>
            <div className="mt-2">___/___/___</div>
            <div className="mt-4">HSBC Head Office Collection Account</div>
            <div className="mt-2">Please do not write in the area below or fold this voucher</div>
          </div>
        </div>
      </div>
    </div>
  );
};

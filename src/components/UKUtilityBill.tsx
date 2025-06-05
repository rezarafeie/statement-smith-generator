
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
  
  // Generate bill dates
  const billDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const previousMonthDate = new Date();
  previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
  const periodStart = previousMonthDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  
  // Generate bill amounts
  const electricityCharges = (150 + Math.random() * 100).toFixed(2);
  const standingCharge = (25 + Math.random() * 15).toFixed(2);
  const totalExcVat = (parseFloat(electricityCharges) + parseFloat(standingCharge)).toFixed(2);
  const vatAmount = (parseFloat(totalExcVat) * 0.05).toFixed(2);
  const totalAmount = (parseFloat(totalExcVat) + parseFloat(vatAmount)).toFixed(2);

  const previousBalance = (50 + Math.random() * 20).toFixed(2);
  const paymentReceived = previousBalance;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', lineHeight: '1.3' }}>
      {/* Header Section */}
      <div className="flex justify-between items-start p-6 pb-4">
        {/* Left side - QR and Logo */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 border border-gray-400 flex items-center justify-center text-xs bg-white">
            <div className="text-xs leading-none">QR</div>
          </div>
          
          <div className="flex flex-col">
            <img 
              src="/lovable-uploads/6bb6c790-c984-4579-a1dd-cd589be1de20.png" 
              alt="British Gas" 
              className="h-8 mb-1"
            />
            <div className="text-xs text-blue-600 font-normal">Looking after your world</div>
          </div>
        </div>

        {/* Right side - Account Info Box */}
        <div className="bg-cyan-400 text-white p-3 text-center" style={{ width: '200px', fontSize: '10px' }}>
          <div className="mb-1">Bill date: {billDate}</div>
          <div className="mb-1">Bill number: 000000000</div>
          <div className="mb-3">VAT reg no: GB 000 0000 00</div>
          
          <div className="mb-1 font-bold text-xs">Account number</div>
          <div className="text-xl font-bold mb-3">{userDetails.accountNumber.slice(0, 9)}</div>
          
          <div className="mb-1 font-bold text-xs">Any questions?</div>
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="bg-gray-800 text-white px-1 py-0.5 rounded text-xs">📞</span>
            <span className="text-xs">0333 202 9802</span>
          </div>
          <div className="text-xs mb-1">Mon - Fri 8am to 6pm</div>
          <div className="text-xs mb-2">Sat 9am to 1pm</div>
          
          <div className="flex items-center justify-center gap-1">
            <span className="bg-gray-800 text-white px-1 py-0.5 rounded text-xs">🌐</span>
            <span className="text-xs">britishgas.co.uk/business</span>
          </div>
        </div>
      </div>

      {/* Customer Address Block */}
      <div className="px-6 pb-4">
        <div className="text-xs text-gray-600 mb-0.5">HEAD OFFICE</div>
        <div className="text-xs text-gray-600 mb-0.5">ANOTHER PLC</div>
        <div className="text-sm font-normal">
          <div>{address.street}</div>
          <div>{address.cityPostal}</div>
        </div>
      </div>

      {/* Bill Title and Date Range */}
      <div className="px-6 mb-4">
        <h1 className="text-2xl text-cyan-500 font-normal mb-2">Your business electricity bill</h1>
        <div className="text-sm font-bold mb-1">
          Head Office, Another Plc, {address.street}, {address.cityPostal}
        </div>
        <div className="text-sm text-gray-700">{periodStart} - {billDate}</div>
      </div>

      {/* Side Boxes */}
      <div className="px-6 mb-6 relative">
        {/* Fixed Price Energy Plan Box */}
        <div className="float-right bg-gray-100 border border-gray-300 p-3 mb-3 ml-4" style={{ width: '250px' }}>
          <div className="text-xs font-bold mb-1">Your Fixed Price Energy Plan will renew on 16/07/15</div>
          <div className="text-xs text-gray-700 leading-tight">
            Your new Fixed Price Energy Plan will end on 16/07/15. We'll write to you around 60 days before this date to tell you about your options, including how to end your plan. To discuss your energy account with us, please call us on 0333 202 9802.
          </div>
        </div>

        {/* Your Account Section */}
        <div className="mb-6">
          <h2 className="text-xl text-cyan-500 mb-3 font-normal">Your account</h2>
          
          <div className="mb-4">
            <div className="text-sm font-bold mb-3">Since your previous bill</div>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Outstanding balance on 10 February 2014</span>
                <span>£{previousBalance}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Cheque received – 20 February 2014</span>
                <span>£{paymentReceived} CR</span>
              </div>
              
              <div className="flex justify-between font-bold border-b border-gray-300 pb-1">
                <span>Balance from last bill</span>
                <span>£0.00</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-bold mb-3">New charges this bill (see over for details)</div>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Electricity charges</span>
                <span>£{electricityCharges}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Standing charge</span>
                <span>£{standingCharge}</span>
              </div>
              
              <div className="flex justify-between font-bold border-b border-gray-300 pb-1">
                <span>Total charges exc VAT</span>
                <span>£{totalExcVat}</span>
              </div>
              
              <div className="flex justify-between">
                <span>VAT</span>
                <span>£{vatAmount}</span>
              </div>
              
              <div className="flex justify-between font-bold text-base border-t-2 border-gray-400 pt-2 mt-2">
                <span>Total new charges this bill inc VAT</span>
                <span>£{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Readings Box */}
        <div className="float-right bg-yellow-100 border border-gray-300 p-3 mb-3 ml-4 clear-right" style={{ width: '250px' }}>
          <div className="text-xs font-bold mb-1">Your charges this month are based on ESTIMATED readings</div>
          <div className="text-xs text-gray-700 leading-tight">
            To keep your charges accurate go to britishgas.co.uk/business/read and help us with your latest reading.
          </div>
        </div>

        {/* Business Value Box */}
        <div className="float-right bg-gray-100 border border-gray-300 p-3 mb-4 ml-4" style={{ width: '250px' }}>
          <div className="text-xs font-bold mb-1">We value your business</div>
          <div className="text-xs text-gray-700 leading-tight">
            If we can help explain any element of your bill or support your business in reducing bills, please contact us.
          </div>
        </div>

        {/* Clear float */}
        <div className="clear-both"></div>
      </div>

      {/* Total Amount Due */}
      <div className="px-6 mb-6">
        <div className="border-t-4 border-cyan-500 pt-3">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl text-cyan-500 font-normal">Total amount now due</h2>
            <div className="text-3xl font-bold text-cyan-500">£{totalAmount}</div>
          </div>
          <div className="text-sm mt-1">Please pay this by {dueDate}</div>
        </div>
      </div>

      {/* Payment Slip */}
      <div className="border-t border-dashed border-gray-400 px-6 pt-4">
        <div className="bg-gray-50 border border-gray-300 p-4">
          {/* Payment Slip Header */}
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
          
          {/* Payment Details */}
          <div className="grid grid-cols-3 gap-6 text-sm mb-4">
            <div>
              <div className="text-xs text-gray-600 mb-1">Reference (customer account number)</div>
              <div className="border border-gray-400 px-3 py-2 bg-white font-mono text-sm">{userDetails.accountNumber.slice(0, 9)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Credit account number</div>
              <div className="border border-gray-400 px-3 py-2 bg-white font-mono text-sm">143 0947</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Sort code</div>
              <div className="font-mono text-sm font-bold">43-09-47</div>
            </div>
          </div>

          {/* Customer Name and Bank Giro */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-bold">HEAD OFFICE</div>
            <div className="text-right">
              <div className="text-xs text-gray-600">bank giro credit</div>
              <div className="text-2xl font-bold">♠</div>
            </div>
          </div>

          {/* Barcode Section */}
          <div className="mb-4">
            <div className="text-center mb-2">
              <div style={{ fontFamily: 'monospace', fontSize: '24px', letterSpacing: '0.5px', lineHeight: '1' }}>
                ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
              </div>
            </div>
            
            {/* Bank Numbers */}
            <div className="flex justify-between items-end text-xs">
              <div className="font-mono">101822288600485895 442414309947 91 X</div>
              <div className="flex items-center gap-2">
                <div className="border border-gray-400 w-16 h-6 bg-white"></div>
                <span className="text-lg font-bold">£</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex gap-8">
              <span>Cashiers stamp</span>
              <span>Signature and initials</span>
              <span>Date</span>
            </div>
            <div>___/___/___</div>
            <div className="mt-2 font-bold">HSBC Head Office Collection Account</div>
            <div className="mt-1">Please do not write in the area below or fold this voucher</div>
          </div>
        </div>
      </div>
    </div>
  );
};


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

  return (
    <div className="w-full max-w-4xl mx-auto bg-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', lineHeight: '1.2' }}>
      {/* Header Section */}
      <div className="flex justify-between items-start p-4 pb-6">
        {/* Left side - QR and Logo */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 border-2 border-gray-800 flex items-center justify-center bg-white mt-1">
            <div className="grid grid-cols-4 gap-px">
              {Array.from({length: 16}).map((_, i) => (
                <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}></div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col">
            <img 
              src="/lovable-uploads/6bb6c790-c984-4579-a1dd-cd589be1de20.png" 
              alt="British Gas" 
              className="h-10 mb-2"
            />
            <div className="text-xs text-blue-600 font-normal">Looking after your world</div>
          </div>
        </div>

        {/* Right side - Account Info Box */}
        <div className="bg-sky-200 text-black p-4 text-left" style={{ width: '240px', fontSize: '10px' }}>
          <div className="mb-1">Bill date: {billDate}</div>
          <div className="mb-1">Bill number: 000000000</div>
          <div className="mb-4">VAT reg no: GB 000 0000 00</div>
          
          <div className="mb-1 font-bold text-xs">Account number</div>
          <div className="text-xl font-bold mb-4">{userDetails.accountNumber.slice(0, 9)}</div>
          
          <div className="mb-1 font-bold text-xs">Any questions?</div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-gray-800 text-white px-1.5 py-1 rounded text-xs">📞</span>
            <span className="text-xs font-bold">0333 202 9802</span>
          </div>
          <div className="text-xs mb-1">Mon - Fri 8am to 6pm</div>
          <div className="text-xs mb-3">Sat 9am to 1pm</div>
          
          <div className="flex items-center gap-2">
            <span className="bg-gray-800 text-white px-1.5 py-1 rounded text-xs">🌐</span>
            <span className="text-xs font-bold">britishgas.co.uk/business</span>
          </div>
        </div>
      </div>

      {/* Customer Address Block with Blue L */}
      <div className="flex px-4 pb-6">
        <div className="bg-blue-600 w-1 h-20 mr-4"></div>
        <div className="flex-1">
          <div className="text-xs text-gray-700 mb-0.5 font-bold">HEAD OFFICE</div>
          <div className="text-xs text-gray-700 mb-0.5 font-bold">ANOTHER PLC</div>
          <div className="text-sm">
            <div>{address.street}</div>
            <div>{address.cityPostal}</div>
          </div>
        </div>
      </div>

      {/* Bill Title and Date Range */}
      <div className="px-4 mb-6">
        <h1 className="text-2xl text-blue-600 font-normal mb-3">Your business electricity bill</h1>
        <div className="text-sm font-bold mb-1">
          Head Office, Another Plc, {address.street}, {address.cityPostal}
        </div>
        <div className="text-sm text-gray-700 mb-4">{periodStart} - {billDate}</div>
        <div className="border-t border-gray-300"></div>
      </div>

      {/* Main Content with Side Boxes */}
      <div className="px-4 mb-6 relative">
        {/* Fixed Price Energy Plan Box */}
        <div className="float-right bg-gray-100 border border-gray-400 p-3 mb-4 ml-4" style={{ width: '260px' }}>
          <div className="text-xs font-bold mb-2">Your Fixed Price Energy Plan will renew on 16/07/15</div>
          <div className="text-xs text-gray-700 leading-relaxed">
            Your new Fixed Price Energy Plan will end on 16/07/15. We'll write to you around 60 days before this date to tell you about your options, including how to end your plan. To discuss your energy account with us, please call us on 0333 202 9802.
          </div>
        </div>

        {/* Your Account Section */}
        <div className="mb-8">
          <h2 className="text-xl text-blue-600 mb-4 font-normal">Your account</h2>
          
          <div className="mb-6">
            <div className="text-sm font-bold mb-4">Since your previous bill</div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span>Outstanding balance on 27 February 2014</span>
                <span>£23.51</span>
              </div>
              
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span>Cheque received – 10 March 2014</span>
                <span>£23.51 CR</span>
              </div>
              
              <div className="flex justify-between font-bold border-b-2 border-gray-400 pb-2 pt-1">
                <span>Balance from last bill</span>
                <span>£0.00</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm font-bold mb-4">New charges this bill (see over for details)</div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span>Electricity charges</span>
                <span>£35.45</span>
              </div>
              
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span>Standing charge</span>
                <span>£23.51</span>
              </div>
              
              <div className="flex justify-between font-bold border-b-2 border-gray-400 pb-2 pt-1">
                <span>Total charges exc VAT</span>
                <span>£58.96</span>
              </div>
              
              <div className="flex justify-between border-b border-gray-200 pb-1 pt-1">
                <span>VAT</span>
                <span>£2.95</span>
              </div>
              
              <div className="flex justify-between font-bold text-base border-t-2 border-gray-600 pt-3 mt-3">
                <span>Total new charges this bill inc VAT</span>
                <span>£61.91</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Readings Box */}
        <div className="float-right bg-yellow-100 border border-gray-400 p-3 mb-4 ml-4 clear-right" style={{ width: '260px' }}>
          <div className="text-xs font-bold mb-2">Your charges this month are based on ESTIMATED readings</div>
          <div className="text-xs text-gray-700 leading-relaxed">
            To keep your charges accurate go to britishgas.co.uk/business/read and help us with your latest reading.
          </div>
        </div>

        {/* Business Value Box */}
        <div className="float-right bg-blue-100 border border-gray-400 p-3 mb-4 ml-4" style={{ width: '260px' }}>
          <div className="text-xs font-bold mb-2">We value your business</div>
          <div className="text-xs text-gray-700 leading-relaxed">
            If we can help explain any element of your bill or support your business in reducing bills, please contact us.
          </div>
        </div>

        {/* Clear float */}
        <div className="clear-both"></div>
      </div>

      {/* Total Amount Due */}
      <div className="px-4 mb-8">
        <div className="border-t-4 border-blue-600 pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl text-blue-600 font-normal">Total amount now due</h2>
            <div className="text-3xl font-bold text-blue-600">£61.91</div>
          </div>
          <div className="text-sm mt-2 text-gray-700">Please pay this by {dueDate}</div>
        </div>
      </div>
    </div>
  );
};

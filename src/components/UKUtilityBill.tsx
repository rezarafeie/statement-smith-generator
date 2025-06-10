
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
      street: parts[0] || '10 EXAMPLE STREET',
      cityPostal: parts[1] || 'ANYTOWN, COUNTYSHIRE AB12 3CD',
      country: parts[2] || 'UNITED KINGDOM'
    };
  };

  const address = parseAddress(userDetails.address);
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '10px', lineHeight: '1.1' }}>
      {/* Header Section */}
      <div className="flex justify-between items-start p-3 pb-4">
        {/* Left side - QR and Logo */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 border border-gray-800 flex items-center justify-center bg-white mt-0.5">
            <div className="grid grid-cols-4 gap-px">
              {Array.from({length: 16}).map((_, i) => (
                <div key={i} className={`w-0.5 h-0.5 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}></div>
              ))}
            </div>
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
        <div style={{ backgroundColor: '#B8D4EA' }} className="text-black p-3 text-left w-56 text-xs">
          <div className="mb-0.5">Bill date: 31 Mar 2014</div>
          <div className="mb-0.5">Bill number: 000000000</div>
          <div className="mb-3">VAT reg no: GB 000 000 00</div>
          <div className="mb-0.5 text-xs">This is a VAT invoice</div>
          
          <div className="mb-0.5 font-bold text-xs">Account number</div>
          <div className="text-xl font-bold mb-3">600485895</div>
          
          <div className="mb-0.5 font-bold text-xs">Any questions?</div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="bg-gray-800 text-white px-1 py-0.5 rounded text-xs">📞</span>
            <span className="text-xs font-bold">0000 000 0000</span>
          </div>
          <div className="text-xs mb-0.5">Mon - Fri 8am to 6pm</div>
          <div className="text-xs mb-2">Sat 9am to 1pm</div>
          
          <div className="flex items-center gap-1.5">
            <span className="bg-gray-800 text-white px-1 py-0.5 rounded text-xs">🌐</span>
            <span className="text-xs font-bold">britishgas.co.uk/business</span>
          </div>
        </div>
      </div>

      {/* Customer Address Block with Blue L */}
      <div className="flex px-3 pb-4">
        <div className="bg-blue-600 w-0.5 h-16 mr-3"></div>
        <div className="flex-1">
          <div className="text-xs text-gray-700 mb-0.5 font-bold">HEAD OFFICE</div>
          <div className="text-xs text-gray-700 mb-0.5 font-bold">ANOTHER PLC</div>
          <div className="text-xs">
            <div>10 EXAMPLE STREET</div>
            <div>ANYTOWN</div>
            <div>COUNTYSHIRE</div>
            <div>AB12 3CD</div>
          </div>
        </div>
      </div>

      {/* Bill Title and Date Range */}
      <div className="px-3 mb-4">
        <h1 className="text-xl text-blue-600 font-normal mb-2">Your business electricity bill</h1>
        <div className="text-xs font-bold mb-0.5">
          Head Office, Another Plc, 10 Example Street, Anytown, Countyshire AB12 3CD
        </div>
        <div className="text-xs text-gray-700 mb-3">27 February 2014 - 27 March 2014</div>
        <div className="border-t border-gray-300"></div>
      </div>

      {/* Main Content with Side Boxes */}
      <div className="px-3 mb-4 relative">
        {/* Fixed Price Energy Plan Box */}
        <div className="float-right bg-gray-100 border border-gray-400 p-2.5 mb-3 ml-3" style={{ width: '220px' }}>
          <div className="text-xs font-bold mb-1.5">Your Fixed Price Energy Plan will renew on 16/07/15</div>
          <div className="text-xs text-gray-700 leading-relaxed">
            Your new Fixed Price Energy Plan will end on 16/07/15. We'll write to you around 60 days before this date to tell you about your options, including how to end your plan. To discuss your energy account with us, please call us on 0000 000 0000.
          </div>
        </div>

        {/* Your Account Section */}
        <div className="mb-6">
          <h2 className="text-lg text-blue-600 mb-3 font-normal">Your account</h2>
          
          <div className="mb-4">
            <div className="text-xs font-bold mb-3">Since your previous bill</div>
            
            <div className="space-y-1 text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-0.5">
                <span>Outstanding balance on 27 February 2014</span>
                <span>£61.14</span>
              </div>
              
              <div className="flex justify-between border-b border-gray-200 pb-0.5">
                <span>Cheque received – 10 March 2014</span>
                <span>£61.14 CR</span>
              </div>
              
              <div className="flex justify-between font-bold border-b-2 border-gray-400 pb-1 pt-0.5">
                <span>Balance from last bill</span>
                <span>£0.00</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs font-bold mb-3">New charges this bill (see over for details)</div>
            
            <div className="space-y-1 text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-0.5">
                <span>Electricity charges</span>
                <span>£23.51</span>
              </div>
              
              <div className="flex justify-between border-b border-gray-200 pb-0.5">
                <span>Standing charge</span>
                <span>£35.45</span>
              </div>
              
              <div className="flex justify-between font-bold border-b-2 border-gray-400 pb-1 pt-0.5">
                <span>Total charges exc VAT</span>
                <span>£58.96</span>
              </div>
              
              <div className="flex justify-between border-b border-gray-200 pb-0.5 pt-0.5">
                <span>VAT</span>
                <span>£2.95</span>
              </div>
              
              <div className="flex justify-between font-bold text-sm border-t-2 border-gray-600 pt-2 mt-2">
                <span>Total new charges this bill inc VAT</span>
                <span>£61.91</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Readings Box */}
        <div className="float-right border border-gray-400 p-2.5 mb-3 ml-3 clear-right" style={{ width: '220px', backgroundColor: '#FFFF80' }}>
          <div className="text-xs font-bold mb-1.5">Your charges this month are based on ESTIMATED readings</div>
          <div className="text-xs text-gray-700 leading-relaxed">
            To keep your charges accurate go to britishgas.co.uk/business/read and help us with your latest reading.
          </div>
        </div>

        {/* Business Value Box */}
        <div className="float-right border border-gray-400 p-2.5 mb-3 ml-3" style={{ width: '220px', backgroundColor: '#B8D4EA' }}>
          <div className="text-xs font-bold mb-1.5">We value your business</div>
          <div className="text-xs text-gray-700 leading-relaxed">
            If we can help explain any element of your bill or support your business in reducing bills, please contact us.
          </div>
        </div>

        {/* Clear float */}
        <div className="clear-both"></div>
      </div>

      {/* Total Amount Due */}
      <div className="px-3 mb-6">
        <div className="border-t-4 border-blue-600 pt-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl text-blue-600 font-normal">Total amount now due</h2>
            <div className="text-2xl font-bold text-blue-600">£61.91</div>
          </div>
          <div className="text-xs mt-1.5 text-gray-700">Please pay this by 10 April 2014</div>
        </div>
      </div>
    </div>
  );
};

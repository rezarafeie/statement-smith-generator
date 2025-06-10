
import React from 'react';
import { UserDetails } from '@/utils/dataGenerator';

interface UKUtilityBillProps {
  userDetails: UserDetails;
}

export const UKUtilityBill: React.FC<UKUtilityBillProps> = ({ userDetails }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', lineHeight: '1.4' }}>
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        {/* Left side - Logo and tagline */}
        <div className="flex flex-col">
          <img 
            src="/lovable-uploads/6bb6c790-c984-4579-a1dd-cd589be1de20.png" 
            alt="British Gas" 
            className="h-16 mb-2"
          />
          <div className="text-base text-blue-400 font-normal">Looking after your world</div>
        </div>

        {/* Right side - Bill info and Account Box */}
        <div className="text-right">
          {/* Bill details above account box */}
          <div className="mb-4 text-sm text-gray-700 space-y-1">
            <div><strong>Bill date:</strong> 31 Mar 2014</div>
            <div><strong>Bill number:</strong> 000000000</div>
            <div>This is a VAT invoice</div>
            <div><strong>VAT registration number:</strong> 000 000 000 00</div>
          </div>
          
          {/* Account number box */}
          <div style={{ backgroundColor: '#00B6F1' }} className="text-white p-4 mb-4 text-center">
            <div className="text-sm font-bold mb-1">Account number</div>
            <div className="text-3xl font-bold">600485895</div>
          </div>

          {/* Contact info box */}
          <div style={{ backgroundColor: '#D9EEF7' }} className="text-black p-4 text-sm">
            <div className="font-bold mb-3">Any questions?</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs flex items-center justify-center w-6 h-6">📞</div>
              <div>
                <div className="font-bold">0000 000 0000</div>
                <div className="text-xs">Mon - Fri 8am to 6pm</div>
                <div className="text-xs">Sat 9am to 1pm</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-3">
              <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs flex items-center justify-center w-6 h-6">🌐</div>
              <span className="font-bold">britishgas.co.uk/business</span>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code and Address Block */}
      <div className="flex items-start gap-6 mb-8">
        {/* QR Code */}
        <div className="w-16 h-16 border-2 border-gray-800 flex items-center justify-center bg-white">
          <div className="grid grid-cols-4 gap-px">
            {Array.from({length: 16}).map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}></div>
            ))}
          </div>
        </div>

        {/* Address with blue L marker */}
        <div className="flex items-start gap-4">
          <div style={{ backgroundColor: '#00B6F1', width: '4px', height: '120px' }}></div>
          <div className="text-sm text-gray-700 leading-tight">
            <div className="font-bold">HEAD OFFICE</div>
            <div className="font-bold">ANOTHER PLC</div>
            <div>10 EXAMPLE STREET</div>
            <div>ANYTOWN</div>
            <div>COUNTYSHIRE</div>
            <div>AB12 3CD</div>
          </div>
        </div>
      </div>

      {/* Bill Title and Date Range */}
      <div className="mb-8">
        <h1 className="text-3xl font-normal mb-3" style={{ color: '#00B6F1' }}>Your business electricity bill</h1>
        <div className="text-base font-bold mb-2">Head Office, Another Plc, 10 Example Street, Anytown, Countyshire AB12 3CD</div>
        <div className="text-base text-gray-700 mb-4">27 February 2014 - 27 March 2014</div>
        <div className="border-t-2 border-gray-800"></div>
      </div>

      {/* Main Content Area with Side Boxes */}
      <div className="flex gap-8">
        {/* Left Column - Main Content */}
        <div className="flex-1">
          {/* Your Account Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-normal mb-6" style={{ color: '#00B6F1' }}>Your account</h2>
            
            {/* Since your previous bill */}
            <div className="mb-8">
              <div className="text-base font-bold mb-4">Since your previous bill</div>
              
              <table className="w-full text-base">
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td className="py-2">Outstanding balance on 10 February 2014</td>
                    <td className="py-2 text-right">£61.14</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2">Cheque received – 20 February 2014</td>
                    <td className="py-2 text-right">£61.14 CR</td>
                  </tr>
                  <tr className="border-b-2 border-gray-800">
                    <td className="py-3 font-bold">Balance from last bill</td>
                    <td className="py-3 text-right font-bold">£0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* New charges this bill */}
            <div className="mb-8">
              <div className="text-base font-bold mb-4">New charges this bill (see over for details)</div>
              
              <table className="w-full text-base">
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td className="py-2">Electricity charges</td>
                    <td className="py-2 text-right">£23.51</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2">Standing charge</td>
                    <td className="py-2 text-right">£35.45</td>
                  </tr>
                  <tr className="border-b-2 border-gray-800">
                    <td className="py-3 font-bold">Total charges exc VAT</td>
                    <td className="py-3 text-right font-bold">£58.96</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2">VAT</td>
                    <td className="py-2 text-right">£2.95</td>
                  </tr>
                  <tr className="border-b-2 border-gray-800">
                    <td className="py-3 font-bold">Total new charges this bill inc VAT</td>
                    <td className="py-3 text-right font-bold">£61.91</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Side boxes */}
        <div className="w-80 space-y-6">
          {/* Fixed Price Energy Plan Box */}
          <div style={{ backgroundColor: '#F3F3F3' }} className="p-4 text-sm border border-gray-300">
            <div className="font-bold mb-3">Your Fixed Price Energy Plan will renew on 16/07/15</div>
            <div className="text-gray-700 leading-relaxed">
              Your new Fixed Price Energy Plan will end on 16/07/15. We'll write to you around 60 days before this date to tell you about your options, including how to end your plan. To discuss your energy account with us, please call us on 0330 100 005.
            </div>
          </div>

          {/* Estimated Readings Box */}
          <div style={{ backgroundColor: '#FFFF00' }} className="p-4 text-sm border border-gray-300">
            <div className="font-bold mb-3">Your charges this month are based on ESTIMATED readings</div>
            <div className="text-gray-700 leading-relaxed">
              To keep your charges accurate go to britishgas.co.uk/business/read and help us with your latest reading.
            </div>
          </div>

          {/* Business Value Box */}
          <div style={{ backgroundColor: '#D9EEF7' }} className="p-4 text-sm border border-gray-300">
            <div className="font-bold mb-3">We value your business</div>
            <div className="text-gray-700 leading-relaxed">
              If we can help explain any element of your bill or support your business in reducing bills, please contact us.
            </div>
          </div>
        </div>
      </div>

      {/* Total Amount Due Section */}
      <div className="border-t-2 border-gray-800 pt-8 mt-12">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-normal" style={{ color: '#00B6F1' }}>Total amount now due</h2>
          <div className="text-5xl font-bold" style={{ color: '#00B6F1' }}>£61.91</div>
        </div>
        <div className="text-base mt-4 text-gray-700">Please pay this by 10 April 2014</div>
      </div>
    </div>
  );
};

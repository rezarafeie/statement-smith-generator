
import React from 'react';
import { UserDetails } from '@/utils/dataGenerator';

interface UKUtilityBillProps {
  userDetails: UserDetails;
}

export const UKUtilityBill: React.FC<UKUtilityBillProps> = ({ userDetails }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', lineHeight: '1.3' }}>
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        {/* Left side - Logo and tagline */}
        <div className="flex flex-col">
          <img 
            src="/lovable-uploads/6bb6c790-c984-4579-a1dd-cd589be1de20.png" 
            alt="British Gas" 
            className="h-12 mb-1"
          />
          <div className="text-sm text-blue-400 font-normal">Looking after your world</div>
        </div>

        {/* Right side - Bill info and Account Box */}
        <div className="text-right">
          {/* Bill details above account box */}
          <div className="mb-3 text-xs text-gray-700">
            <div className="mb-1"><strong>Bill date:</strong> 31 Mar 2014</div>
            <div className="mb-1"><strong>Bill number:</strong> 000000000</div>
            <div className="mb-1">This is a VAT invoice</div>
            <div><strong>VAT registration number:</strong> 000 000 000 00</div>
          </div>
          
          {/* Account number box */}
          <div style={{ backgroundColor: '#00B6F1' }} className="text-white p-3 mb-3 text-center">
            <div className="text-xs font-bold mb-1">Account number</div>
            <div className="text-2xl font-bold">600485895</div>
          </div>

          {/* Contact info box */}
          <div style={{ backgroundColor: '#D9EEF7' }} className="text-black p-3 text-xs">
            <div className="font-bold mb-2">Any questions?</div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs">📞</span>
              <span className="font-bold">0000 000 0000</span>
            </div>
            <div className="text-xs mb-1">Mon - Fri 8am to 6pm</div>
            <div className="text-xs mb-3">Sat 9am to 1pm</div>
            
            <div className="flex items-center gap-2">
              <span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-xs">🌐</span>
              <span className="font-bold">britishgas.co.uk/business</span>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code and Address Block */}
      <div className="flex items-start gap-4 mb-6">
        {/* QR Code */}
        <div className="w-12 h-12 border border-gray-800 flex items-center justify-center bg-white">
          <div className="grid grid-cols-4 gap-px">
            {Array.from({length: 16}).map((_, i) => (
              <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}></div>
            ))}
          </div>
        </div>

        {/* Address with blue L marker */}
        <div className="flex items-start gap-3">
          <div style={{ backgroundColor: '#0072CE' }} className="w-1 h-20"></div>
          <div className="text-sm text-gray-700">
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
      <div className="mb-6">
        <h1 className="text-2xl font-normal mb-2" style={{ color: '#0072CE' }}>Your business electricity bill</h1>
        <div className="text-sm font-bold mb-1">Head Office, Another Plc, 10 Example Street, Anytown, Countyshire AB12 3CD</div>
        <div className="text-sm text-gray-700 mb-4">27 February 2014 - 27 March 2014</div>
        <div className="border-t border-gray-400"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        {/* Side boxes - positioned absolutely to float right */}
        <div className="float-right w-64 ml-6 space-y-4">
          {/* Fixed Price Energy Plan Box */}
          <div style={{ backgroundColor: '#F3F3F3' }} className="p-3 text-xs border border-gray-300">
            <div className="font-bold mb-2">Your Fixed Price Energy Plan will renew on 16/07/15</div>
            <div className="text-gray-700 leading-relaxed">
              Your new Fixed Price Energy Plan will end on 16/07/15. We'll write to you around 60 days before this date to tell you about your options, including how to end your plan. To discuss your energy account with us, please call us on 0330 100 005.
            </div>
          </div>

          {/* Estimated Readings Box */}
          <div style={{ backgroundColor: '#FFF200' }} className="p-3 text-xs border border-gray-300">
            <div className="font-bold mb-2">Your charges this month are based on ESTIMATED readings</div>
            <div className="text-gray-700 leading-relaxed">
              To keep your charges accurate go to britishgas.co.uk/business/read and help us with your latest reading.
            </div>
          </div>

          {/* Business Value Box */}
          <div style={{ backgroundColor: '#D9EEF7' }} className="p-3 text-xs border border-gray-300">
            <div className="font-bold mb-2">We value your business</div>
            <div className="text-gray-700 leading-relaxed">
              If we can help explain any element of your bill or support your business in reducing bills, please contact us.
            </div>
          </div>
        </div>

        {/* Your Account Section */}
        <div className="mb-8" style={{ marginRight: '280px' }}>
          <h2 className="text-xl font-normal mb-4" style={{ color: '#0072CE' }}>Your account</h2>
          
          {/* Since your previous bill */}
          <div className="mb-6">
            <div className="text-sm font-bold mb-3">Since your previous bill</div>
            
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="py-1">Outstanding balance on 10 February 2014</td>
                  <td className="py-1 text-right">£61.14</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-1">Cheque received – 20 February 2014</td>
                  <td className="py-1 text-right">£61.14 CR</td>
                </tr>
                <tr className="border-b-2 border-gray-600">
                  <td className="py-2 font-bold">Balance from last bill</td>
                  <td className="py-2 text-right font-bold">£0.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* New charges this bill */}
          <div className="mb-6">
            <div className="text-sm font-bold mb-3">New charges this bill (see over for details)</div>
            
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="py-1">Electricity charges</td>
                  <td className="py-1 text-right">£23.51</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-1">Standing charge</td>
                  <td className="py-1 text-right">£35.45</td>
                </tr>
                <tr className="border-b-2 border-gray-600">
                  <td className="py-2 font-bold">Total charges exc VAT</td>
                  <td className="py-2 text-right font-bold">£58.96</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-1">VAT</td>
                  <td className="py-1 text-right">£2.95</td>
                </tr>
                <tr className="border-b-2 border-gray-600">
                  <td className="py-2 font-bold">Total new charges this bill inc VAT</td>
                  <td className="py-2 text-right font-bold">£61.91</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Clear float */}
        <div className="clear-both"></div>
      </div>

      {/* Total Amount Due Section */}
      <div className="border-t-2 border-gray-400 pt-6 text-center">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-normal" style={{ color: '#0072CE' }}>Total amount now due</h2>
          <div className="text-4xl font-bold" style={{ color: '#0072CE' }}>£61.91</div>
        </div>
        <div className="text-sm mt-3 text-gray-700">Please pay this by 10 April 2014</div>
      </div>
    </div>
  );
};

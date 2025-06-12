
import React from 'react';
import { UserDetails } from '@/utils/dataGenerator';

interface EONUtilityBillProps {
  userDetails: UserDetails;
}

export const EONUtilityBill: React.FC<EONUtilityBillProps> = ({ userDetails }) => {
  return (
    <div className="w-full mx-auto bg-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif', maxWidth: '210mm', minHeight: '297mm', padding: '20px' }}>
      <div style={{ fontSize: '11px', lineHeight: '1.3' }}>
        {/* Header - Two Column Layout */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Left Column - Logo and Address */}
          <div>
            {/* Logo */}
            <div className="mb-4">
              <img 
                src="/lovable-uploads/e97b991c-300c-43af-9d18-cc5459757879.png" 
                alt="E.ON Next" 
                className="h-12"
              />
            </div>

            {/* Address - Bigger size */}
            <div style={{ fontSize: '12px', lineHeight: '1.3' }}>
              <div className="font-medium">{userDetails.name}</div>
              <div>2 Frederick Street</div>
              <div>Kings Cross</div>
              <div>London</div>
              <div>WC1X 0ND</div>
              <div>+447412375153</div>
            </div>
          </div>

          {/* Right Column - Contact Info, Account Number, etc. */}
          <div className="space-y-3">
            {/* Contact Info - Bigger size */}
            <div>
              <div className="font-bold mb-2" style={{ color: '#ec1c24', fontSize: '12px' }}>Get in touch with us</div>
              <div className="flex items-center gap-2 mb-1" style={{ fontSize: '11px' }}>
                <img src="/lovable-uploads/b888e67f-9614-4f1e-835e-4c71b2db3bc0.png" alt="Website" className="w-3 h-3" />
                <span>eonnext.com/contact</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: '11px' }}>
                <img src="/lovable-uploads/1cc87fd3-7bdb-47bf-a469-508150f70210.png" alt="Email" className="w-3 h-3" />
                <span>hi@eonnext.com</span>
              </div>
            </div>

            {/* QR Code moved down */}
            <div className="flex justify-end mt-4">
              <img src="/lovable-uploads/90e5f195-4d01-4e97-aca8-111a0f74f712.png" alt="QR Code" className="w-16 h-16" />
            </div>

            {/* Account Number Box - Smaller text and matching document color */}
            <div>
              <div className="font-bold mb-2 flex items-center gap-1" style={{ color: '#ec1c24', fontSize: '12px' }}>
                <img src="/lovable-uploads/422992aa-59ff-4459-a271-99363753e72d.png" alt="Account" className="w-3 h-3" />
                Your account number:
              </div>
              <div className="text-left">
                <span className="block text-gray-900" style={{ fontSize: '12px', fontWeight: '400' }}>A-73398C00</span>
                <div className="flex justify-start mt-2">
                  <div className="flex" style={{ height: '4px', width: '80px' }}>
                    <div className="flex-1" style={{ backgroundColor: '#ffd700' }}></div>
                    <div className="flex-1" style={{ backgroundColor: '#1d70b8' }}></div>
                    <div className="flex-1" style={{ backgroundColor: '#ec1c24' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bill Reference moved down */}
            <div style={{ fontSize: '10px' }} className="mt-4">
              <div>Bill Reference: 72513189 (29th Jul. 2023)</div>
            </div>
            
            {/* Estimated Annual Cost */}
            <div>
              <div className="font-bold mb-2" style={{ color: '#ec1c24', fontSize: '12px' }}>Your estimated annual cost</div>
              <div style={{ fontSize: '11px' }} className="space-y-1">
                <div><span className="font-bold">£4435.01</span> a year for electricity</div>
                <div><span className="font-bold">£4322.87</span> a year for gas</div>
              </div>
              <div style={{ fontSize: '9px' }} className="mt-2 text-gray-600 leading-tight">
                This is an estimate based on your expected annual energy usage, and your current tariff rates, charges and discounts, including VAT. Actual bills will vary depending on your usage and tariff selection. More information about your current tariff can be found overleaf.
              </div>
            </div>

            <hr className="border-gray-400 my-2" />

            {/* Could you pay less section */}
            <div>
              <div className="font-bold mb-2" style={{ color: '#ec1c24', fontSize: '12px' }}>Could you pay less?</div>
              <div style={{ fontSize: '9px' }} className="text-gray-700 italic mb-2">
                Remember - it might be worth thinking about switching your tariff or supplier.
              </div>
              <div style={{ fontSize: '9px' }} className="text-gray-600 mb-2">
                For your <strong>electricity</strong> (on meter point 1900005170146)
              </div>
              <div className="font-bold mb-1" style={{ fontSize: '10px' }}>Good to know.</div>
              <div style={{ fontSize: '9px' }} className="text-gray-700 mb-2">
                You're already on our cheapest tariff for your <strong>electricity</strong> usage. We'll let you know if this changes.
              </div>
              <div style={{ fontSize: '9px' }} className="text-gray-600 mb-2">
                For your <strong>gas</strong> (on meter point 711310402)
              </div>
              <div className="font-bold mb-1" style={{ fontSize: '10px' }}>Good to know.</div>
              <div style={{ fontSize: '9px' }} className="text-gray-700">
                You're already on our cheapest tariff for your <strong>gas</strong> usage. We'll let you know if this changes.
              </div>
            </div>
          </div>
        </div>

        {/* Main Title and Date Range - Two Column Layout (Left side only) */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          {/* Left Column - Title Information */}
          <div>
            <h1 className="font-bold mb-1 text-gray-900" style={{ fontSize: '24px', fontWeight: 'bold' }}>Your energy account</h1>
            <div className="font-bold mb-1" style={{ fontSize: '14px', fontWeight: 'bold' }}>for 2 Frederick Street Kings Cross London WC1X 0ND.</div>
            <div className="font-normal mb-1" style={{ fontSize: '12px', fontWeight: 'normal' }}>29th Aug. 2022 - 28th Sept. 2022</div>
          </div>
          {/* Right Column - Empty */}
          <div></div>
        </div>

        {/* Previous Balance */}
        <div className="mb-3">
          <div className="bg-gray-800 text-white p-3 flex justify-between items-center" style={{ fontSize: '11px' }}>
            <span className="font-bold">On 29th Jun. 2023 your previous balance was</span>
            <span className="font-normal">£872.46 DR</span>
          </div>
        </div>

        {/* Charges Section */}
        <div className="mb-3">
          <h2 className="font-bold mb-2" style={{ color: '#ec1c24', fontSize: '14px' }}>1. We have charged you</h2>
          <div style={{ fontSize: '11px' }} className="mb-2">Based on your meter readings.</div>
          
          <table className="w-full mb-3" style={{ fontSize: '11px' }}>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="py-2">Electricity</td>
                <td className="py-2 text-center">28th Jun. 2023 - 27th Jul. 2023</td>
                <td className="py-2 text-right font-medium">£82.52 DR</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2">Gas</td>
                <td className="py-2 text-center">28th Jun. 2023 - 27th Jul. 2023</td>
                <td className="py-2 text-right font-medium">£34.48 DR</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Section */}
        <div className="mb-3">
          <h2 className="font-bold mb-2" style={{ color: '#ec1c24', fontSize: '14px' }}>2. You have paid</h2>
          <table className="w-full mb-3" style={{ fontSize: '11px' }}>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="py-2">Direct Debit collection</td>
                <td className="py-2 text-right font-medium">20th Jul. 2023 £422.20 CR</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* New Balance */}
        <div className="mb-4">
          <div className="bg-gray-800 text-white p-3 flex justify-between items-center" style={{ fontSize: '11px' }}>
            <span className="font-bold">On 28th Jul. 2023 your new balance was</span>
            <span className="font-normal">£567.26 DR</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-6" style={{ fontSize: '11px', lineHeight: '1.4' }}>
          <p>
            You pay by monthly Direct Debit, so your payments are up to date. We regularly review how much you're paying to make sure it's the right amount and will let you know if it needs to change.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-3 border-t text-gray-600" style={{ fontSize: '9px' }}>
          <div className="flex justify-between items-end">
            <div className="max-w-xl">
              <div>E.ON Next Energy Limited Registered Office: Westwood Way, Westwood Business Park, Coventry CV4 8LG.</div>
              <div>Registered in England and Wales No: 03782443. E.ON UK plc VAT Group Registration Number: 559 0978 89</div>
            </div>
            <div>Page 1/3</div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .page-break {
            page-break-before: always;
          }
        }
        @media (max-width: 768px) {
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

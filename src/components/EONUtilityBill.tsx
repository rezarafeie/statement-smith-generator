
import React from 'react';
import { UserDetails } from '@/utils/dataGenerator';

interface EONUtilityBillProps {
  userDetails: UserDetails;
}

export const EONUtilityBill: React.FC<EONUtilityBillProps> = ({ userDetails }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div className="min-h-screen p-4" style={{ fontSize: '11px', lineHeight: '1.2' }}>
        {/* Header - Only E.ON Logo */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <img 
              src="/lovable-uploads/e97b991c-300c-43af-9d18-cc5459757879.png" 
              alt="E.ON Next" 
              className="h-10"
            />
          </div>
        </div>

        {/* Main Layout - Two Columns */}
        <div className="flex gap-4">
          {/* Left Column - Main Content */}
          <div className="flex-1" style={{ maxWidth: '58%' }}>
            {/* Address and QR Code */}
            <div className="flex justify-between items-start mb-4">
              <div style={{ fontSize: '10px', lineHeight: '1.1' }}>
                <div className="font-medium">{userDetails.name}</div>
                <div>2 Frederick Street</div>
                <div>Kings Cross</div>
                <div>London</div>
                <div>WC1X 0ND</div>
                <div>+447412375153</div>
              </div>
              <img src="/lovable-uploads/90e5f195-4d01-4e97-aca8-111a0f74f712.png" alt="QR Code" className="w-10 h-10" />
            </div>

            {/* Main Title */}
            <div className="mb-4">
              <h1 className="font-bold mb-1 text-gray-900" style={{ fontSize: '20px' }}>Your energy account</h1>
              <div className="font-bold mb-1" style={{ fontSize: '12px' }}>for 2 Frederick Street Kings Cross London WC1X 0ND.</div>
              <div className="font-normal mb-3" style={{ fontSize: '12px' }}>29th Aug. 2022 - 28th Sept. 2022</div>
            </div>

            {/* Previous Balance */}
            <div className="mb-3">
              <div className="bg-gray-800 text-white p-2 flex justify-between items-center" style={{ fontSize: '11px' }}>
                <span className="font-bold">On 29th Jun. 2023 your previous balance was</span>
                <span className="font-normal">£872.46 DR</span>
              </div>
            </div>

            {/* Charges Section */}
            <div className="mb-3">
              <h2 className="font-bold mb-1" style={{ color: '#e31e24', fontSize: '12px' }}>1. We have charged you</h2>
              <div style={{ fontSize: '10px' }} className="mb-2">Based on your meter readings.</div>
              
              <table className="w-full mb-2" style={{ fontSize: '10px' }}>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-1">Electricity</td>
                    <td className="py-1 text-center">28th Jun. 2023 - 27th Jul. 2023</td>
                    <td className="py-1 text-right font-medium">£82.52 DR</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-1">Gas</td>
                    <td className="py-1 text-center">28th Jun. 2023 - 27th Jul. 2023</td>
                    <td className="py-1 text-right font-medium">£34.48 DR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Section */}
            <div className="mb-3">
              <h2 className="font-bold mb-1" style={{ color: '#e31e24', fontSize: '12px' }}>2. You have paid</h2>
              <table className="w-full mb-2" style={{ fontSize: '10px' }}>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-1">Direct Debit collection</td>
                    <td className="py-1 text-right font-medium">20th Jul. 2023 £422.20 CR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* New Balance */}
            <div className="mb-3">
              <div className="bg-gray-800 text-white p-2 flex justify-between items-center" style={{ fontSize: '11px' }}>
                <span className="font-bold">On 28th Jul. 2023 your new balance was</span>
                <span className="font-normal">£567.26 DR</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mb-3" style={{ fontSize: '10px', lineHeight: '1.2' }}>
              <p>
                You pay by monthly Direct Debit, so your payments are up to date. We regularly review how much you're paying to make sure it's the right amount and will let you know if it needs to change.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ width: '42%' }}>
            {/* Contact Info */}
            <div className="mb-3" style={{ fontSize: '10px' }}>
              <div className="font-bold mb-2" style={{ color: '#e31e24', fontSize: '11px' }}>Get in touch with us</div>
              <div className="flex items-center gap-1 mb-1">
                <img src="/lovable-uploads/b888e67f-9614-4f1e-835e-4c71b2db3bc0.png" alt="Website" className="w-3 h-3" />
                <span>eonnext.com/contact</span>
              </div>
              <div className="flex items-center gap-1">
                <img src="/lovable-uploads/1cc87fd3-7bdb-47bf-a469-508150f70210.png" alt="Email" className="w-3 h-3" />
                <span>hi@eonnext.com</span>
              </div>
            </div>

            {/* Account Number Box */}
            <div className="mb-3">
              <div className="font-bold mb-2 flex items-center gap-1" style={{ color: '#e31e24', fontSize: '11px' }}>
                <img src="/lovable-uploads/422992aa-59ff-4459-a271-99363753e72d.png" alt="Account" className="w-3 h-3" />
                Your account number:
              </div>
              <div className="bg-white border border-gray-600 p-2 text-center" style={{ borderWidth: '1px' }}>
                <span className="font-bold" style={{ fontSize: '16px' }}>A-73398C00</span>
                <div className="flex justify-center mt-1">
                  <img src="/lovable-uploads/c05923a2-25e4-4f2d-ac23-9ff3ee9ee5e1.png" alt="Color bars" className="h-1" />
                </div>
              </div>
            </div>

            {/* Bill Reference */}
            <div style={{ fontSize: '10px' }} className="mb-3">
              <div>Bill Reference: 72513189 (29th Jul. 2023)</div>
            </div>
            
            {/* Estimated Annual Cost */}
            <div className="mb-3">
              <div className="font-bold mb-2" style={{ color: '#e31e24', fontSize: '11px' }}>Your estimated annual cost</div>
              <div style={{ fontSize: '11px' }} className="space-y-1">
                <div><span className="font-bold">£4435.01</span> a year for electricity</div>
                <div><span className="font-bold">£4322.87</span> a year for gas</div>
              </div>
              <div style={{ fontSize: '9px' }} className="mt-2 text-gray-600 leading-tight">
                This is an estimate based on your expected annual energy usage, and your current tariff rates, charges and discounts, including VAT. Actual bills will vary depending on your usage and tariff selection. More information about your current tariff can be found overleaf.
              </div>
            </div>

            <hr className="border-gray-400 mb-3" />

            {/* Could you pay less section */}
            <div className="mb-3">
              <div className="font-bold mb-1" style={{ color: '#e31e24', fontSize: '11px' }}>Could you pay less?</div>
              <div style={{ fontSize: '9px' }} className="text-gray-700 italic mb-2">
                Remember - it might be worth thinking about switching your tariff or supplier.
              </div>
              <div style={{ fontSize: '9px' }} className="text-gray-600">
                For your <strong>electricity</strong> (on meter point 1900005170146)
              </div>
            </div>

            {/* Good to know sections */}
            <div className="mb-2">
              <div className="font-bold mb-1" style={{ fontSize: '11px' }}>Good to know.</div>
              <div style={{ fontSize: '9px' }} className="text-gray-700 mb-2">
                You're already on our cheapest tariff for your <strong>electricity</strong> usage. We'll let you know if this changes.
              </div>
              <div style={{ fontSize: '9px' }} className="text-gray-600 mb-2">
                For your <strong>gas</strong> (on meter point 711310402)
              </div>
              <div className="font-bold mb-1" style={{ fontSize: '11px' }}>Good to know.</div>
              <div style={{ fontSize: '9px' }} className="text-gray-700">
                You're already on our cheapest tariff for your <strong>gas</strong> usage. We'll let you know if this changes.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-2 border-t text-gray-600" style={{ fontSize: '9px' }}>
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
          .flex {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};


import React from 'react';
import { UserDetails } from '@/utils/dataGenerator';

interface EONUtilityBillProps {
  userDetails: UserDetails;
}

export const EONUtilityBill: React.FC<EONUtilityBillProps> = ({ userDetails }) => {
  // Parse the formatted address string (format: "street|city, postcode|country")
  const parseAddress = (address: string) => {
    const parts = address.split('|');
    if (parts.length >= 3) {
      const street = parts[0];
      const cityPostcode = parts[1].split(', ');
      const city = cityPostcode[0];
      const postcode = cityPostcode[1] || '';
      return { street, city, postcode };
    }
    return { street: address, city: '', postcode: '' };
  };

  const { street, city, postcode } = parseAddress(userDetails.address);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div className="min-h-screen p-8" style={{ fontSize: '14px', lineHeight: '1.4' }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          {/* Left - E.ON Next Logo */}
          <div>
            <img 
              src="/lovable-uploads/e97b991c-300c-43af-9d18-cc5459757879.png" 
              alt="E.ON Next" 
              className="h-16"
            />
          </div>

          {/* Right - Contact Info */}
          <div className="text-right">
            <div className="font-bold mb-2" style={{ color: '#ec1c24', fontSize: '14px' }}>Get in touch with us</div>
            <div className="flex items-center justify-end gap-2 mb-1" style={{ fontSize: '12px' }}>
              <img src="/lovable-uploads/b888e67f-9614-4f1e-835e-4c71b2db3bc0.png" alt="Website" className="w-4 h-4" />
              <span>eonnext.com/contact</span>
            </div>
            <div className="flex items-center justify-end gap-2" style={{ fontSize: '12px' }}>
              <img src="/lovable-uploads/1cc87fd3-7bdb-47bf-a469-508150f70210.png" alt="Email" className="w-4 h-4" />
              <span>hi@eonnext.com</span>
            </div>
          </div>
        </div>

        {/* Main Layout - Two Columns */}
        <div className="flex gap-8">
          {/* Left Column - Main Content */}
          <div className="flex-1" style={{ maxWidth: '60%' }}>
            {/* Address and QR Code */}
            <div className="flex justify-between items-start mb-8">
              <div style={{ fontSize: '13px', lineHeight: '1.3' }}>
                <div className="font-medium">{userDetails.name}</div>
                <div>2 Frederick Street</div>
                <div>Kings Cross</div>
                <div>London</div>
                <div>WC1X 0ND</div>
                <div>+447412375153</div>
              </div>
              <img src="/lovable-uploads/90e5f195-4d01-4e97-aca8-111a0f74f712.png" alt="QR Code" className="w-16 h-16" />
            </div>

            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-normal mb-2 text-gray-800">Your energy account</h1>
              <div className="text-lg mb-2">for 2 Frederick Street Kings Cross London WC1X 0ND.</div>
              <div className="text-lg font-semibold mb-6">29th Aug. 2022 - 28th Sept. 2022</div>
            </div>

            {/* Previous Balance */}
            <div className="mb-6">
              <div className="bg-gray-700 text-white p-3 flex justify-between items-center" style={{ fontSize: '14px' }}>
                <span className="font-medium">On 29th Jun. 2023 your previous balance was</span>
                <span className="font-bold">£872.46 DR</span>
              </div>
            </div>

            {/* Charges Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: '#ec1c24' }}>1. We have charged you</h2>
              <div style={{ fontSize: '13px' }} className="mb-3">Based on your meter readings.</div>
              
              <table className="w-full mb-4" style={{ fontSize: '14px' }}>
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
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: '#ec1c24' }}>2. You have paid</h2>
              <table className="w-full mb-4" style={{ fontSize: '14px' }}>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-2">Direct Debit collection</td>
                    <td className="py-2 text-right font-medium">20th Jul. 2023 £422.20 CR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* New Balance */}
            <div className="mb-6">
              <div className="bg-gray-700 text-white p-3 flex justify-between items-center" style={{ fontSize: '14px' }}>
                <span className="font-medium">On 28th Jul. 2023 your new balance was</span>
                <span className="font-bold">£567.26 DR</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mb-6" style={{ fontSize: '13px', lineHeight: '1.4' }}>
              <p>
                You pay by monthly Direct Debit, so your payments are up to date. We regularly review how much you're paying to make sure it's the right amount and will let you know if it needs to change.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ width: '40%' }}>
            {/* Account Number Box */}
            <div className="mb-6">
              <div className="font-bold mb-3 flex items-center gap-2" style={{ color: '#ec1c24', fontSize: '14px' }}>
                <img src="/lovable-uploads/422992aa-59ff-4459-a271-99363753e72d.png" alt="Account" className="w-4 h-4" />
                Your account number:
              </div>
              <div className="bg-white border-2 border-gray-300 p-4 rounded text-center">
                <span className="font-bold text-xl">A-73398C00</span>
                <div className="flex justify-center mt-3">
                  <img src="/lovable-uploads/c05923a2-25e4-4f2d-ac23-9ff3ee9ee5e1.png" alt="Color bars" className="h-3" />
                </div>
              </div>
            </div>

            {/* Bill Reference */}
            <div style={{ fontSize: '13px' }} className="mb-6">
              <div>Bill Reference: 72513189 (29th Jul. 2023)</div>
            </div>
            
            {/* Estimated Annual Cost */}
            <div className="mb-6">
              <div className="font-bold mb-3" style={{ color: '#ec1c24', fontSize: '14px' }}>Your estimated annual cost</div>
              <div style={{ fontSize: '14px' }} className="space-y-1">
                <div><span className="font-bold">£4435.01</span> a year for electricity</div>
                <div><span className="font-bold">£4322.87</span> a year for gas</div>
              </div>
              <div style={{ fontSize: '11px' }} className="mt-3 text-gray-600 leading-tight">
                This is an estimate based on your expected annual energy usage, and your current tariff rates, charges and discounts, including VAT. Actual bills will vary depending on your usage and tariff selection. More information about your current tariff can be found overleaf.
              </div>
            </div>

            <hr className="border-gray-400 mb-6" />

            {/* Could you pay less section */}
            <div className="mb-6">
              <div className="font-bold mb-2" style={{ color: '#ec1c24', fontSize: '14px' }}>Could you pay less?</div>
              <div style={{ fontSize: '12px' }} className="text-gray-700 italic">
                Remember - it might be worth thinking about switching your tariff or supplier.
              </div>
              <div style={{ fontSize: '11px' }} className="mt-2 text-gray-600">
                For your <strong>electricity</strong> (on meter point 1900005170146)
              </div>
            </div>

            {/* Good to know sections */}
            <div className="mb-4">
              <div className="font-bold mb-2" style={{ fontSize: '14px' }}>Good to know.</div>
              <div style={{ fontSize: '12px' }} className="text-gray-700 mb-3">
                You're already on our cheapest tariff for your <strong>electricity</strong> usage. We'll let you know if this changes.
              </div>
              <div style={{ fontSize: '11px' }} className="text-gray-600 mb-3">
                For your <strong>gas</strong> (on meter point 711310402)
              </div>
              <div className="font-bold mb-2" style={{ fontSize: '14px' }}>Good to know.</div>
              <div style={{ fontSize: '12px' }} className="text-gray-700">
                You're already on our cheapest tariff for your <strong>gas</strong> usage. We'll let you know if this changes.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t text-gray-600" style={{ fontSize: '11px' }}>
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


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
      <div className="min-h-screen p-6" style={{ fontSize: '12px', lineHeight: '1.3' }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          {/* Left - E.ON Next Logo */}
          <div>
            <img 
              src="/lovable-uploads/e97b991c-300c-43af-9d18-cc5459757879.png" 
              alt="E.ON Next" 
              className="h-12"
            />
          </div>

          {/* Right - Contact Info */}
          <div className="text-right text-xs">
            <div className="font-bold mb-1" style={{ color: '#ec1c24', fontSize: '11px' }}>Get in touch with us</div>
            <div className="flex items-center justify-end gap-1 mb-0.5" style={{ fontSize: '10px' }}>
              <img src="/lovable-uploads/b888e67f-9614-4f1e-835e-4c71b2db3bc0.png" alt="Website" className="w-3 h-3" />
              <span>eonnext.com/contact</span>
            </div>
            <div className="flex items-center justify-end gap-1" style={{ fontSize: '10px' }}>
              <img src="/lovable-uploads/1cc87fd3-7bdb-47bf-a469-508150f70210.png" alt="Email" className="w-3 h-3" />
              <span>hi@eonnext.com</span>
            </div>
          </div>
        </div>

        {/* Main Layout - Two Columns */}
        <div className="flex gap-6">
          {/* Left Column - Main Content */}
          <div className="flex-1" style={{ maxWidth: '65%' }}>
            {/* Address and QR Code */}
            <div className="flex justify-between items-start mb-6">
              <div className="text-xs">
                <div className="font-medium">{userDetails.name}</div>
                <div>{street}</div>
                <div>{city}</div>
                <div>{postcode}</div>
                <div>+447412375153</div>
              </div>
              <img src="/lovable-uploads/90e5f195-4d01-4e97-aca8-111a0f74f712.png" alt="QR Code" className="w-12 h-12" />
            </div>

            {/* Main Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-normal mb-1 text-gray-800">Your energy account</h1>
              <div className="text-base mb-1">for {street}, {city} {postcode}.</div>
              <div className="text-base font-semibold mb-4">29th Aug. 2022 - 28th Sept. 2022</div>
            </div>

            {/* Previous Balance */}
            <div className="mb-4">
              <div className="bg-gray-700 text-white p-2 flex justify-between items-center text-xs">
                <span className="font-medium">On 29th Jun. 2023 your previous balance was</span>
                <span className="font-bold">£872.46 DR</span>
              </div>
            </div>

            {/* Charges Section */}
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2" style={{ color: '#ec1c24' }}>1. We have charged you</h2>
              <div className="text-xs mb-2">Based on your meter readings.</div>
              
              <table className="w-full mb-3 text-xs">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-1">Electricity</td>
                    <td className="py-1 text-center">28th Jun. 2023 - 27th Jul. 2023</td>
                    <td className="py-1 text-right">£82.52 DR</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-1">Gas</td>
                    <td className="py-1 text-center">28th Jun. 2023 - 27th Jul. 2023</td>
                    <td className="py-1 text-right">£34.48 DR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Section */}
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2" style={{ color: '#ec1c24' }}>2. You have paid</h2>
              <table className="w-full mb-3 text-xs">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-1">Direct Debit collection</td>
                    <td className="py-1 text-right">20th Jul. 2023 £422.20 CR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* New Balance */}
            <div className="mb-4">
              <div className="bg-gray-700 text-white p-2 flex justify-between items-center text-xs">
                <span className="font-medium">On 28th Jul. 2023 your new balance was</span>
                <span className="font-bold">£567.26 DR</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mb-4 p-3 bg-gray-50 border-l-4" style={{ borderLeftColor: '#1d70b8' }}>
              <p className="text-xs">
                You pay by monthly Direct Debit, so your payments are up to date. We regularly review how much you're paying to make sure it's the right amount and will let you know if it needs to change.
              </p>
            </div>

            {/* Usage Summary */}
            <div className="mb-4">
              <h3 className="font-bold mb-2 text-sm">How much did you use?</h3>
              <div className="text-xs space-y-0.5">
                <div><strong>Average daily electricity usage:</strong> 7.4 kWh</div>
                <div><strong>Average daily gas usage:</strong> 1.8 m³</div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ width: '35%' }}>
            {/* Account Number Box */}
            <div className="mb-4">
              <div className="font-bold mb-2 flex items-center gap-1 text-xs" style={{ color: '#ec1c24' }}>
                <img src="/lovable-uploads/422992aa-59ff-4459-a271-99363753e72d.png" alt="Account" className="w-3 h-3" />
                Your account number:
              </div>
              <div className="bg-white border-2 border-gray-300 p-3 rounded text-center">
                <span className="font-bold text-lg">A-73398C00</span>
                <div className="flex justify-center mt-2">
                  <img src="/lovable-uploads/c05923a2-25e4-4f2d-ac23-9ff3ee9ee5e1.png" alt="Color bars" className="h-2" />
                </div>
              </div>
            </div>

            {/* Bill Reference */}
            <div className="text-xs mb-4">
              <div>Bill Reference: 72513189 (29th Jul. 2023)</div>
            </div>
            
            {/* Estimated Annual Cost */}
            <div className="mb-4">
              <div className="font-bold mb-2 text-xs" style={{ color: '#ec1c24' }}>Your estimated annual cost</div>
              <div className="text-xs space-y-0.5">
                <div><span className="font-bold">£4435.01</span> a year for electricity</div>
                <div><span className="font-bold">£4322.87</span> a year for gas</div>
              </div>
              <div className="text-xs mt-2 text-gray-600" style={{ fontSize: '10px' }}>
                This is an estimate based on your expected annual energy usage, and your current tariff rates, charges and discounts, including VAT.
              </div>
            </div>

            {/* Could you pay less section */}
            <div className="mb-4 p-2 bg-gray-50 border-l-4" style={{ borderLeftColor: '#ec1c24' }}>
              <div className="font-bold text-xs mb-1" style={{ color: '#ec1c24' }}>Could you pay less?</div>
              <div className="text-xs text-gray-700" style={{ fontSize: '10px' }}>
                Check if you could save by switching to a different tariff at eonnext.com/tariffs
              </div>
            </div>

            {/* Good to know sections */}
            <div className="mb-4 p-2 bg-gray-50 border-l-4" style={{ borderLeftColor: '#1d70b8' }}>
              <div className="font-bold text-xs mb-1" style={{ color: '#1d70b8' }}>Good to know</div>
              <div className="text-xs text-gray-700" style={{ fontSize: '10px' }}>
                We'll send you a bill every month. If you'd like to receive it by email instead, you can change this in your online account.
              </div>
            </div>

            <div className="mb-4 p-2 bg-gray-50 border-l-4" style={{ borderLeftColor: '#1d70b8' }}>
              <div className="font-bold text-xs mb-1" style={{ color: '#1d70b8' }}>Meter point numbers</div>
              <div className="text-xs text-gray-700" style={{ fontSize: '10px' }}>
                <div><strong>Electricity:</strong> 2200024502395</div>
                <div><strong>Gas:</strong> 6141011401006</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t text-xs text-gray-600" style={{ fontSize: '10px' }}>
          <div className="flex justify-between">
            <div>E.ON Next Energy Limited Registered Office: Westwood Way, Westwood Business Park, Coventry CV4 8LG.</div>
            <div>Page 1/1</div>
          </div>
          <div>Registered in England and Wales No: 03782443. E.ON UK plc VAT Group Registration Number: 559 0978 89</div>
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

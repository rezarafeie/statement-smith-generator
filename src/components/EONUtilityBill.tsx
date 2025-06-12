
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
  const phone = '+447412375153'; // Default phone number

  return (
    <div className="w-full max-w-4xl mx-auto bg-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div className="min-h-screen p-8" style={{ fontSize: '14px', lineHeight: '1.4' }}>
        {/* Header with Logo and Contact Info */}
        <div className="flex justify-between items-start mb-8">
          {/* Left - E.ON Next Logo */}
          <div className="flex flex-col">
            <img 
              src="/lovable-uploads/e97b991c-300c-43af-9d18-cc5459757879.png" 
              alt="E.ON Next" 
              className="h-16 mb-2"
            />
          </div>

          {/* Right - Contact Info */}
          <div className="text-right text-sm">
            <div className="mb-4">
              <div className="font-bold mb-2" style={{ color: '#ec1c24' }}>Get in touch with us</div>
              <div className="flex items-center justify-end gap-2 mb-1">
                <img src="/lovable-uploads/b888e67f-9614-4f1e-835e-4c71b2db3bc0.png" alt="Website" className="w-4 h-4" />
                <span>eonnext.com/contact</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <img src="/lovable-uploads/1cc87fd3-7bdb-47bf-a469-508150f70210.png" alt="Email" className="w-4 h-4" />
                <span>hi@eonnext.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex gap-8 mb-8">
          {/* Left Column */}
          <div className="flex-1">
            {/* Customer Address and QR Code */}
            <div className="flex items-start gap-4 mb-8">
              <div className="text-sm flex-1">
                <div className="font-medium">{userDetails.name}</div>
                <div>{street}</div>
                <div>{city}</div>
                <div>{postcode}</div>
                <div>{phone}</div>
              </div>
              <img src="/lovable-uploads/90e5f195-4d01-4e97-aca8-111a0f74f712.png" alt="QR Code" className="w-16 h-16" />
            </div>

            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-normal mb-2 text-gray-800">Your energy account</h1>
              <div className="text-lg mb-2">for {street}, {city} {postcode}.</div>
              <div className="text-lg font-semibold mb-6">29th Aug. 2022 - 28th Sept. 2022</div>
            </div>

            {/* Usage Summary */}
            <div className="mb-8">
              <h3 className="font-bold mb-3">How much did you use?</h3>
              <div className="text-sm space-y-1">
                <div><strong>Average daily electricity usage:</strong> 7.4 kWh</div>
                <div><strong>Average daily gas usage:</strong> 1.8 m³</div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-80">
            {/* Account Number Box */}
            <div className="mb-6">
              <div className="font-bold mb-2 flex items-center gap-2" style={{ color: '#ec1c24' }}>
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
            <div className="text-sm mb-6">
              <div>Bill Reference: 72513189 (29th Jul. 2023)</div>
            </div>
            
            {/* Estimated Annual Cost */}
            <div className="mb-6">
              <div className="font-bold mb-3" style={{ color: '#ec1c24' }}>Your estimated annual cost</div>
              <div className="text-sm space-y-1">
                <div><span className="font-bold">£4435.01</span> a year for electricity</div>
                <div><span className="font-bold">£4322.87</span> a year for gas</div>
              </div>
              <div className="text-xs mt-3 text-gray-600">
                This is an estimate based on your expected annual energy usage, and your current tariff rates, charges and discounts, including VAT.
              </div>
            </div>

            {/* Could you pay less section */}
            <div className="mb-6 p-3 bg-gray-50 border-l-4" style={{ borderLeftColor: '#ec1c24' }}>
              <div className="font-bold text-sm mb-2" style={{ color: '#ec1c24' }}>Could you pay less?</div>
              <div className="text-xs text-gray-700">
                Check if you could save by switching to a different tariff at eonnext.com/tariffs
              </div>
            </div>
          </div>
        </div>

        {/* Previous Balance */}
        <div className="mb-6">
          <div className="bg-gray-700 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">On 29th Jun. 2023 your previous balance was</span>
            <span className="font-bold">£872.46 DR</span>
          </div>
        </div>

        {/* Charges Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#ec1c24' }}>1. We have charged you</h2>
          <div className="text-sm mb-3">Based on your meter readings.</div>
          
          <table className="w-full mb-4 border-collapse">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="py-2">Electricity</td>
                <td className="py-2 text-center">28th Jun. 2023 - 27th Jul. 2023</td>
                <td className="py-2 text-right">£82.52 DR</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2">Gas</td>
                <td className="py-2 text-center">28th Jun. 2023 - 27th Jul. 2023</td>
                <td className="py-2 text-right">£34.48 DR</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#ec1c24' }}>2. You have paid</h2>
          <table className="w-full mb-4 border-collapse">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="py-2">Direct Debit collection</td>
                <td className="py-2 text-right">20th Jul. 2023 £422.20 CR</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* New Balance */}
        <div className="mb-6">
          <div className="bg-gray-700 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">On 28th Jul. 2023 your new balance was</span>
            <span className="font-bold">£567.26 DR</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-6 p-4 bg-gray-50 border-l-4" style={{ borderLeftColor: '#1d70b8' }}>
          <p className="text-sm">
            You pay by monthly Direct Debit, so your payments are up to date. We regularly review how much you're paying to make sure it's the right amount and will let you know if it needs to change.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t text-xs text-gray-600">
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
          .w-80 {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

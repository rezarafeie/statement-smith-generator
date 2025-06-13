import React from 'react';
import { generateEONUserDetails } from '@/utils/dataGenerator';

interface EONUtilityBillProps {
  userDetails?: any;
}

export const EONUtilityBill: React.FC<EONUtilityBillProps> = ({ userDetails: providedUserDetails }) => {
  // Generate random UK user details if not provided
  const userDetails = providedUserDetails || generateEONUserDetails();
  
  // Parse address properly
  const addressParts = userDetails.address.split('|');
  const streetAddress = addressParts[0] || `${Math.floor(Math.random() * 999) + 1} High Street`;
  const area1 = addressParts[1] || 'London';
  const area2 = addressParts[2] || 'Greater London';
  const postcode = addressParts[3] || 'SW1A 1AA';
  
  // Use provided phone number or generate one
  const phoneNumber = userDetails.phoneNumber || `+44${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  
  // Generate random bill amounts
  const electricityAmount = (Math.random() * 100 + 50).toFixed(2);
  const gasAmount = (Math.random() * 60 + 20).toFixed(2);
  const totalCharges = (parseFloat(electricityAmount) + parseFloat(gasAmount)).toFixed(2);
  const previousBalance = (Math.random() * 1000 + 500).toFixed(2);
  const payment = (Math.random() * 500 + 300).toFixed(2);
  const newBalance = (parseFloat(previousBalance) + parseFloat(totalCharges) - parseFloat(payment)).toFixed(2);
  const estimatedElectricity = (Math.random() * 2000 + 3000).toFixed(2);
  const estimatedGas = (Math.random() * 2000 + 3000).toFixed(2);

  return (
    <div className="eon-bill-container w-full mx-auto bg-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif', maxWidth: '210mm', minHeight: '297mm', padding: '20px' }}>
      <div className="eon-bill-content" style={{ fontSize: '11px', lineHeight: '1.3' }}>
        {/* Header - Three Column Layout */}
        <div className="eon-header flex justify-between mb-6">
          {/* Left Column - Logo and Customer Address */}
          <div className="eon-left-column flex-1 max-w-xs">
            {/* Logo */}
            <div className="mb-4">
              <img 
                src="/lovable-uploads/e97b991c-300c-43af-9d18-cc5459757879.png" 
                alt="E.ON Next" 
                className="eon-logo h-20"
              />
            </div>

            {/* Customer Address */}
            <div className="eon-customer-address" style={{ fontSize: '13px', lineHeight: '1.3' }}>
              <div className="font-medium">{userDetails.name}</div>
              <div>{streetAddress}</div>
              <div>{area1}</div>
              <div>{area2}</div>
              <div>{postcode}</div>
              <div>{phoneNumber}</div>
            </div>
          </div>

          {/* Middle Column - Spacer */}
          <div className="eon-spacer flex-1"></div>

          {/* Right Column - Contact Info, Account Number, Bill Reference and QR Code */}
          <div className="eon-right-column w-80 space-y-4">
            {/* Contact Info */}
            <div>
              <div className="font-bold mb-2" style={{ color: '#ec1c24', fontSize: '12px' }}>Get in touch with us</div>
              <div className="flex items-center gap-2 mb-1" style={{ fontSize: '12px' }}>
                <img src="/lovable-uploads/b888e67f-9614-4f1e-835e-4c71b2db3bc0.png" alt="Website" className="w-3 h-3" />
                <span>eonnext.com/contact</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: '12px' }}>
                <img src="/lovable-uploads/1cc87fd3-7bdb-47bf-a469-508150f70210.png" alt="Email" className="w-3 h-3" />
                <span>hi@eonnext.com</span>
              </div>
            </div>

            {/* Account Number Box */}
            <div>
              <div className="font-bold mb-2 flex items-center gap-1" style={{ color: '#ec1c24', fontSize: '12px' }}>
                <img src="/lovable-uploads/422992aa-59ff-4459-a271-99363753e72d.png" alt="Account" className="w-3 h-3" />
                Your account number:
              </div>
              <div className="text-left">
                <span className="block text-black" style={{ fontSize: '10px', fontWeight: '400' }}>{userDetails.accountNumber}</span>
                <div className="flex justify-start mt-2">
                  <div className="flex" style={{ height: '4px', width: '80px' }}>
                    <div className="flex-1" style={{ backgroundColor: '#ffd700' }}></div>
                    <div className="flex-1" style={{ backgroundColor: '#1d70b8' }}></div>
                    <div className="flex-1" style={{ backgroundColor: '#ec1c24' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bill Reference and QR Code - Side by Side - Positioned exactly opposite the customer address */}
            <div className="eon-qr-section flex items-start justify-between" style={{ marginTop: '60px' }}>
              <div style={{ fontSize: '10px' }}>
                <div>Bill Reference: {userDetails.sortCode}</div>
                <div>({new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '.')})</div>
              </div>
              
              {/* QR Code positioned exactly opposite the customer address */}
              <div className="ml-4">
                <img src="/lovable-uploads/90e5f195-4d01-4e97-aca8-111a0f74f712.png" alt="QR Code" className="eon-qr-code w-16 h-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Proper Two Column Layout */}
        <div className="eon-main-content flex gap-8">
          {/* Left Column - Main Account Information */}
          <div className="eon-main-column flex-1">
            {/* Title and Date Range */}
            <h1 className="font-bold mb-1 text-gray-900" style={{ fontSize: '24px', fontWeight: 'bold' }}>Your energy account</h1>
            <div className="font-bold mb-1" style={{ fontSize: '14px', fontWeight: 'bold' }}>for {streetAddress} {area1} {area2} {postcode}.</div>
            <div className="font-normal mb-3" style={{ fontSize: '12px', fontWeight: 'normal' }}>{userDetails.statementPeriod}</div>

            {/* Previous Balance */}
            <div className="mb-3">
              <div className="bg-gray-800 text-white p-3 flex justify-between items-center" style={{ fontSize: '11px' }}>
                <span className="font-bold">On {new Date(Date.now() - 30*24*60*60*1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '.')} your previous balance was</span>
                <span className="font-normal">£{previousBalance} DR</span>
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
                    <td className="py-2 text-center">{userDetails.statementPeriod}</td>
                    <td className="py-2 text-right font-medium">£{electricityAmount} DR</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2">Gas</td>
                    <td className="py-2 text-center">{userDetails.statementPeriod}</td>
                    <td className="py-2 text-right font-medium">£{gasAmount} DR</td>
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
                    <td className="py-2 text-right font-medium">{new Date(Date.now() - 10*24*60*60*1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '.')} £{payment} CR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* New Balance */}
            <div className="mb-4">
              <div className="bg-gray-800 text-white p-3 flex justify-between items-center" style={{ fontSize: '11px' }}>
                <span className="font-bold">On {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '.')} your new balance was</span>
                <span className="font-normal">£{newBalance} DR</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mb-6" style={{ fontSize: '11px', lineHeight: '1.4' }}>
              <p>
                You pay by monthly Direct Debit, so your payments are up to date. We regularly review how much you're paying to make sure it's the right amount and will let you know if it needs to change.
              </p>
            </div>
          </div>

          {/* Right Column - Estimated Costs and Tariff Info */}
          <div className="eon-sidebar w-80 space-y-4">
            {/* Estimated Annual Cost */}
            <div>
              <div className="font-bold mb-2" style={{ color: '#ec1c24', fontSize: '12px' }}>Your estimated annual cost</div>
              <div style={{ fontSize: '11px' }} className="space-y-1">
                <div><span className="font-bold">£{estimatedElectricity}</span> a year for electricity</div>
                <div><span className="font-bold">£{estimatedGas}</span> a year for gas</div>
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
                For your <strong>electricity</strong> (on meter point {Math.floor(1000000000000 + Math.random() * 9000000000000)})
              </div>
              <div className="font-bold mb-1" style={{ fontSize: '10px' }}>Good to know.</div>
              <div style={{ fontSize: '9px' }} className="text-gray-700 mb-2">
                You're already on our cheapest tariff for your <strong>electricity</strong> usage. We'll let you know if this changes.
              </div>
              <div style={{ fontSize: '9px' }} className="text-gray-600 mb-2">
                For your <strong>gas</strong> (on meter point {Math.floor(100000000 + Math.random() * 900000000)})
              </div>
              <div className="font-bold mb-1" style={{ fontSize: '10px' }}>Good to know.</div>
              <div style={{ fontSize: '9px' }} className="text-gray-700">
                You're already on our cheapest tariff for your <strong>gas</strong> usage. We'll let you know if this changes.
              </div>
            </div>
          </div>
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
      `}</style>
    </div>
  );
};

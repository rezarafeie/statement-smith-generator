
import React from 'react';
import { generateEONUserDetails } from '@/utils/dataGenerator';

interface EONUtilityBillProps {
  userDetails?: any;
}

export const EONUtilityBill: React.FC<EONUtilityBillProps> = ({ userDetails: providedUserDetails }) => {
  // Generate random UK user details if not provided
  const userDetails = providedUserDetails || generateEONUserDetails();
  
  console.log('EON Bill - User Details:', userDetails);
  
  // Parse address properly with new format: fullAddress|addressLine2|city|postcode
  const addressParts = userDetails.address.split('|');
  const streetAddress = addressParts[0] || userDetails.fullAddress || `${Math.floor(Math.random() * 999) + 1} High Street`;
  const addressLine2 = addressParts[1] || userDetails.addressLine2 || '';
  const city = addressParts[2] || userDetails.city || 'London';
  const postcode = addressParts[3] || userDetails.postcode || 'SW1A 1AA';
  const country = userDetails.country || 'UNITED KINGDOM';
  
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
    <div className="eon-bill-container bg-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif', width: '794px', minHeight: '1123px', padding: '20px' }}>
      <div className="eon-bill-content" style={{ fontSize: '11px', lineHeight: '1.3' }}>
        {/* Header */}
        <div className="eon-header" style={{ marginBottom: '20px' }}>
          {/* Logo */}
          <div style={{ marginBottom: '12px' }}>
            <img 
              src="/lovable-uploads/e97b991c-300c-43af-9d18-cc5459757879.png" 
              alt="E.ON Next" 
              className="eon-logo"
              style={{ height: '80px' }}
            />
          </div>

          {/* Address and QR Code Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            {/* Customer Address and QR Code Container */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              {/* Customer Address */}
              <div className="eon-customer-address" style={{ fontSize: '13px', lineHeight: '1.2' }}>
                <div style={{ fontWeight: '600' }}>{userDetails.name}</div>
                <div>{streetAddress}</div>
                {addressLine2 && <div>{addressLine2}</div>}
                <div>{city}</div>
                <div>{postcode}</div>
                <div>{country}</div>
                <div>{phoneNumber}</div>
              </div>

              {/* QR Code - positioned next to address */}
              <div>
                <img src="/lovable-uploads/90e5f195-4d01-4e97-aca8-111a0f74f712.png" alt="QR Code" className="eon-qr-code" style={{ width: '64px', height: '64px' }} />
              </div>
            </div>

            {/* Contact Info and Account Details */}
            <div style={{ width: '280px' }}>
              {/* Contact Info */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#ec1c24', fontSize: '11px' }}>Get in touch with us</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px', fontSize: '10px' }}>
                  <img src="/lovable-uploads/b888e67f-9614-4f1e-835e-4c71b2db3bc0.png" alt="Website" style={{ width: '12px', height: '12px' }} />
                  <span>eonnext.com/contact</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px' }}>
                  <img src="/lovable-uploads/1cc87fd3-7bdb-47bf-a469-508150f70210.png" alt="Email" style={{ width: '12px', height: '12px' }} />
                  <span>hi@eonnext.com</span>
                </div>
              </div>

              {/* Account Number Box */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px', color: '#ec1c24', fontSize: '11px' }}>
                  <img src="/lovable-uploads/422992aa-59ff-4459-a271-99363753e72d.png" alt="Account" style={{ width: '12px', height: '12px' }} />
                  Your account number:
                </div>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ display: 'block', color: 'black', fontSize: '10px', fontWeight: '400' }}>{userDetails.accountNumber}</span>
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '6px' }}>
                    <img 
                      src="/lovable-uploads/c05923a2-25e4-4f2d-ac23-9ff3ee9ee5e1.png" 
                      alt="Color line" 
                      style={{ width: '80px', height: '4px', display: 'block' }}
                      onError={(e) => {
                        console.log('Color line image failed to load');
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={() => console.log('Color line image loaded successfully')}
                    />
                  </div>
                </div>
              </div>

              {/* Bill Reference */}
              <div style={{ fontSize: '9px' }}>
                <div>Bill Reference: {userDetails.sortCode} ({new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '.')})</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Adjusted Column Layout */}
        <div className="eon-main-content" style={{ display: 'flex', gap: '40px' }}>
          {/* Left Column - Main Account Information */}
          <div className="eon-main-column" style={{ width: '480px' }}>
            {/* Title and Date Range */}
            <h1 style={{ fontWeight: 'bold', marginBottom: '3px', color: '#111827', fontSize: '30px' }}>Your energy account</h1>
            <div style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '16px', color: '#111827' }}>for {streetAddress}{addressLine2 ? `, ${addressLine2}` : ''} {city} {postcode}.</div>
            <div style={{ fontWeight: 'normal', marginBottom: '10px', fontSize: '11px', color: '#4b5563' }}>{userDetails.statementPeriod}</div>

            {/* Previous Balance */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ backgroundColor: '#1f2937', color: 'white', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                <span style={{ fontWeight: 'bold' }}>On {new Date(Date.now() - 30*24*60*60*1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '.')} your previous balance was</span>
                <span style={{ fontWeight: 'normal' }}>£{previousBalance} DR</span>
              </div>
            </div>

            {/* Charges Section */}
            <div style={{ marginBottom: '8px' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '5px', color: '#ec1c24', fontSize: '15px' }}>1. We have charged you</h2>
              <div style={{ fontSize: '11px', marginBottom: '5px', color: '#4b5563' }}>Based on your meter readings.</div>
              
              <table style={{ width: '100%', marginBottom: '8px', fontSize: '11px' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #d1d5db' }}>
                    <td style={{ paddingTop: '4px', paddingBottom: '4px' }}>Electricity</td>
                    <td style={{ paddingTop: '4px', paddingBottom: '4px', textAlign: 'center' }}>{userDetails.statementPeriod}</td>
                    <td style={{ paddingTop: '4px', paddingBottom: '4px', textAlign: 'right', fontWeight: '500' }}>£{electricityAmount} DR</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #d1d5db' }}>
                    <td style={{ paddingTop: '4px', paddingBottom: '4px' }}>Gas</td>
                    <td style={{ paddingTop: '4px', paddingBottom: '4px', textAlign: 'center' }}>{userDetails.statementPeriod}</td>
                    <td style={{ paddingTop: '4px', paddingBottom: '4px', textAlign: 'right', fontWeight: '500' }}>£{gasAmount} DR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Section */}
            <div style={{ marginBottom: '8px' }}>
              <h2 style={{ fontWeight: 'bold', marginBottom: '5px', color: '#ec1c24', fontSize: '15px' }}>2. You have paid</h2>
              <table style={{ width: '100%', marginBottom: '8px', fontSize: '11px' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #d1d5db' }}>
                    <td style={{ paddingTop: '4px', paddingBottom: '4px' }}>Direct Debit collection</td>
                    <td style={{ paddingTop: '4px', paddingBottom: '4px', textAlign: 'right', fontWeight: '500' }}>{new Date(Date.now() - 10*24*60*60*1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '.')} £{payment} CR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* New Balance */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{ backgroundColor: '#1f2937', color: 'white', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                <span style={{ fontWeight: 'bold' }}>On {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(',', '.')} your new balance was</span>
                <span style={{ fontWeight: 'normal' }}>£{newBalance} DR</span>
              </div>
            </div>

            {/* Payment Info */}
            <div style={{ marginBottom: '12px', fontSize: '11px', lineHeight: '1.3', color: '#374151' }}>
              <p>
                You pay by monthly Direct Debit, so your payments are up to date. We regularly review how much you're paying to make sure it's the right amount and will let you know if it needs to change.
              </p>
            </div>
          </div>

          {/* Right Column - Estimated Costs and Tariff Info */}
          <div className="eon-sidebar" style={{ width: '240px' }}>
            {/* Estimated Annual Cost */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#ec1c24', fontSize: '12px' }}>Your estimated annual cost</div>
              <div style={{ fontSize: '11px' }}>
                <div style={{ marginBottom: '2px' }}><span style={{ fontWeight: 'bold' }}>£{estimatedElectricity}</span> a year for electricity</div>
                <div><span style={{ fontWeight: 'bold' }}>£{estimatedGas}</span> a year for gas</div>
              </div>
              <div style={{ fontSize: '9px', marginTop: '5px', color: '#4b5563', lineHeight: '1.2' }}>
                This is an estimate based on your expected annual energy usage, and your current tariff rates, charges and discounts, including VAT. Actual bills will vary depending on your usage and tariff selection. More information about your current tariff can be found overleaf.
              </div>
            </div>

            <hr style={{ borderColor: '#9ca3af', margin: '5px 0' }} />

            {/* Could you pay less section */}
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#ec1c24', fontSize: '12px' }}>Could you pay less?</div>
              <div style={{ fontSize: '9px', color: '#374151', fontStyle: 'italic', marginBottom: '5px' }}>
                Remember - it might be worth thinking about switching your tariff or supplier.
              </div>
              <div style={{ fontSize: '9px', color: '#4b5563', marginBottom: '5px' }}>
                For your <strong>electricity</strong> (on meter point {Math.floor(1000000000000 + Math.random() * 9000000000000)})
              </div>
              <div style={{ fontWeight: 'bold', marginBottom: '2px', fontSize: '10px' }}>Good to know.</div>
              <div style={{ fontSize: '9px', color: '#374151', marginBottom: '5px' }}>
                You're already on our cheapest tariff for your <strong>electricity</strong> usage. We'll let you know if this changes.
              </div>
              <div style={{ fontSize: '9px', color: '#4b5563', marginBottom: '5px' }}>
                For your <strong>gas</strong> (on meter point {Math.floor(100000000 + Math.random() * 900000000)})
              </div>
              <div style={{ fontWeight: 'bold', marginBottom: '2px', fontSize: '10px' }}>Good to know.</div>
              <div style={{ fontSize: '9px', color: '#374151' }}>
                You're already on our cheapest tariff for your <strong>gas</strong> usage. We'll let you know if this changes.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '20px', paddingTop: '8px', borderTop: '1px solid #e5e7eb', color: '#4b5563', fontSize: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ maxWidth: '500px' }}>
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
        
        img.eon-logo {
          margin: 50px 0px 0px 50px !important;
        }
        
        img.eon-qr-code {
          margin: 140px 0px 0px 220px !important;
        }
        
        .eon-customer-address {
          margin: 50px -50px 0px 50px !important;
          font-size: 14px !important;
        }
      `}</style>
    </div>
  );
};

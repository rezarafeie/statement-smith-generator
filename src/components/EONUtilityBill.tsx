
import React from 'react';
import { UserDetails } from '@/utils/dataGenerator';

interface EONUtilityBillProps {
  userDetails: UserDetails;
}

export const EONUtilityBill: React.FC<EONUtilityBillProps> = ({ userDetails }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Page 1 - Summary */}
      <div className="min-h-screen p-8 pb-16" style={{ fontSize: '14px', lineHeight: '1.4' }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          {/* Left - E.ON Next Logo */}
          <div className="flex flex-col">
            <img 
              src="/lovable-uploads/e97b991c-300c-43af-9d18-cc5459757879.png" 
              alt="E.ON Next" 
              className="h-20 mb-2"
            />
          </div>

          {/* Right - Contact Info */}
          <div className="text-right text-sm">
            <div className="mb-4">
              <div className="font-bold text-red-600 mb-2">Get in touch with us</div>
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="text-gray-600">🌐</span>
                <span>eonnext.com/contact</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-gray-600">✉</span>
                <span>hi@eonnext.com</span>
              </div>
            </div>
            
            <div>
              <div className="font-bold text-red-600 mb-2">Your account number:</div>
              <div className="bg-gray-100 p-2 rounded border text-center">
                <span className="font-bold text-lg">A-73398C00</span>
                <div className="flex justify-center mt-1">
                  <div className="w-8 h-1 bg-blue-500 mr-1"></div>
                  <div className="w-8 h-1 bg-yellow-400 mr-1"></div>
                  <div className="w-8 h-1 bg-red-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Address and QR Code */}
        <div className="flex items-start gap-8 mb-8">
          <div className="text-sm">
            <div>Soloman Bisrat</div>
            <div>2 Frederick Street</div>
            <div>Kings Cross</div>
            <div>London</div>
            <div>WC1X 0ND</div>
            <div>+447412375153</div>
          </div>
          
          {/* QR Code */}
          <div className="w-16 h-16 border-2 border-black flex items-center justify-center bg-white">
            <div className="grid grid-cols-8 gap-px">
              {Array.from({length: 64}).map((_, i) => (
                <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}></div>
              ))}
            </div>
          </div>

          <div className="flex-1 text-right">
            <div className="text-sm mb-4">Bill Reference: 72513189 (29th Jul. 2023)</div>
            
            <div className="mb-4">
              <div className="font-bold text-red-600 mb-2">Your estimated annual cost</div>
              <div><span className="font-bold">£4435.01</span> a year for electricity</div>
              <div><span className="font-bold">£4322.87</span> a year for gas</div>
              <div className="text-sm mt-2 text-gray-600">
                This is an estimate based on your expected annual energy usage, and your current tariff rates, charges and discounts, including VAT. Actual bills will vary depending on your usage and tariff selection. More information about your current tariff can be found overleaf.
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-normal mb-2 text-gray-800">Your energy account</h1>
          <div className="text-lg mb-6">for 2 Frederick Street Kings Cross London WC1X 0ND.</div>
          <div className="text-lg font-semibold mb-8">29th Aug. 2022 - 28th Sept. 2022</div>
        </div>

        {/* Previous Balance */}
        <div className="mb-6">
          <div className="bg-gray-700 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">On 29th Jun. 2023 your previous balance was</span>
            <span className="font-bold">£872.46 DR</span>
          </div>
        </div>

        {/* Charges Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-red-600 mb-4">1. We have charged you</h2>
          <div className="text-sm mb-3">Based on your meter readings.</div>
          
          <table className="w-full mb-4">
            <tbody>
              <tr className="border-b">
                <td className="py-2">Electricity</td>
                <td className="py-2 text-center">28th Jun. 2023 - 27th Jul. 2023</td>
                <td className="py-2 text-right">£82.52 DR</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Gas</td>
                <td className="py-2 text-center">28th Jun. 2023 - 27th Jul. 2023</td>
                <td className="py-2 text-right">£34.48 DR</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-red-600 mb-4">2. You have paid</h2>
          <table className="w-full mb-4">
            <tbody>
              <tr className="border-b">
                <td className="py-2">Direct Debit collection</td>
                <td className="py-2 text-right">20th Jul. 2023 £422.20 CR</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* New Balance */}
        <div className="mb-8">
          <div className="bg-gray-700 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">On 28th Jul. 2023 your new balance was</span>
            <span className="font-bold">£567.26 DR</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-8 p-4 bg-gray-50 border-l-4 border-blue-500">
          <p className="text-sm">
            You pay by monthly Direct Debit, so your payments are up to date. We regularly review how much you're paying to make sure it's the right amount and will let you know if it needs to change.
          </p>
        </div>

        {/* Right Side Boxes */}
        <div className="flex gap-8">
          <div className="flex-1"></div>
          <div className="w-80 space-y-4">
            <div className="p-4 bg-gray-50 border">
              <div className="font-bold mb-2 text-red-600">Could you pay less?</div>
              <div className="text-sm mb-2">
                Remember – it might be worth thinking about switching your tariff or supplier.
              </div>
              <div className="text-xs mb-2">
                For your <strong>electricity</strong> (on meter point 1900005170146)
              </div>
              <div className="font-bold mb-2">Good to know.</div>
              <div className="text-sm mb-2">
                You're already on our cheapest tariff for your <strong>electricity</strong> usage. We'll let you know if this changes.
              </div>
              <div className="text-xs mb-2">
                For your <strong>gas</strong> (on meter point 711310402)
              </div>
              <div className="font-bold mb-2">Good to know.</div>
              <div className="text-sm">
                You're already on our cheapest tariff for your <strong>gas</strong> usage. We'll let you know if this changes.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-4 border-t text-xs text-gray-600">
          <div className="flex justify-between">
            <div>E.ON Next Energy Limited Registered Office: Westwood Way, Westwood Business Park, Coventry CV4 8LG.</div>
            <div>Page 1/3</div>
          </div>
          <div>Registered in England and Wales No: 03782443. E.ON UK plc VAT Group Registration Number: 559 0978 89</div>
        </div>
      </div>

      {/* Page 2 - Detailed Charges */}
      <div className="min-h-screen p-8 pb-16 page-break" style={{ fontSize: '14px', lineHeight: '1.4' }}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">Your detailed charges</h1>
        </div>

        {/* Electricity Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-blue-600">Electricity</h2>
          
          <div className="flex gap-8">
            <div className="flex-1">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">Period</th>
                    <th className="border border-gray-300 p-3 text-center">Previous Reading</th>
                    <th className="border border-gray-300 p-3 text-center">Current Reading</th>
                    <th className="border border-gray-300 p-3 text-center">Units Used</th>
                    <th className="border border-gray-300 p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">28 Jun - 27 Jul 2023</td>
                    <td className="border border-gray-300 p-3 text-center">12,456</td>
                    <td className="border border-gray-300 p-3 text-center">12,678</td>
                    <td className="border border-gray-300 p-3 text-center">222 kWh</td>
                    <td className="border border-gray-300 p-3 text-right">£65.12</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Standing Charge</td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3 text-center">30 days</td>
                    <td className="border border-gray-300 p-3 text-right">£12.30</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-bold">Subtotal</td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3 text-right font-bold">£77.42</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">VAT @ 5%</td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3 text-right">£3.87</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 p-3 font-bold">Total Electricity</td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3 text-right font-bold">£81.29</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="w-64">
              <div className="p-4 bg-blue-50 border border-blue-200">
                <h3 className="font-bold mb-3 text-blue-600">Your electricity tariff</h3>
                <div className="text-sm space-y-2">
                  <div><strong>Tariff:</strong> Next Online v1</div>
                  <div><strong>Rate:</strong> 29.32p per kWh</div>
                  <div><strong>Standing charge:</strong> 41p per day</div>
                  <div><strong>Payment method:</strong> Monthly Direct Debit</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gas Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-red-600">Gas</h2>
          
          <div className="flex gap-8">
            <div className="flex-1">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">Period</th>
                    <th className="border border-gray-300 p-3 text-center">Previous Reading</th>
                    <th className="border border-gray-300 p-3 text-center">Current Reading</th>
                    <th className="border border-gray-300 p-3 text-center">Units Used</th>
                    <th className="border border-gray-300 p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">28 Jun - 27 Jul 2023</td>
                    <td className="border border-gray-300 p-3 text-center">8,245</td>
                    <td className="border border-gray-300 p-3 text-center">8,298</td>
                    <td className="border border-gray-300 p-3 text-center">53 m³</td>
                    <td className="border border-gray-300 p-3 text-right">£25.15</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Standing Charge</td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3 text-center">30 days</td>
                    <td className="border border-gray-300 p-3 text-right">£7.50</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-bold">Subtotal</td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3 text-right font-bold">£32.65</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">VAT @ 5%</td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3 text-right">£1.63</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 p-3 font-bold">Total Gas</td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3"></td>
                    <td className="border border-gray-300 p-3 text-right font-bold">£34.28</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="w-64">
              <div className="p-4 bg-red-50 border border-red-200">
                <h3 className="font-bold mb-3 text-red-600">Your gas tariff</h3>
                <div className="text-sm space-y-2">
                  <div><strong>Tariff:</strong> Next Online v1</div>
                  <div><strong>Rate:</strong> 7.51p per kWh</div>
                  <div><strong>Standing charge:</strong> 25p per day</div>
                  <div><strong>Payment method:</strong> Monthly Direct Debit</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-4 border-t text-xs text-gray-600">
          <div className="flex justify-between">
            <div>E.ON Next Energy Limited Registered Office: Westwood Way, Westwood Business Park, Coventry CV4 8LG.</div>
            <div>Page 2/3</div>
          </div>
          <div>Registered in England and Wales No: 03782443. E.ON UK plc VAT Group Registration Number: 559 0978 89</div>
        </div>
      </div>

      {/* Page 3 - Contact & Usage */}
      <div className="min-h-screen p-8 pb-16 page-break" style={{ fontSize: '14px', lineHeight: '1.4' }}>
        <div className="flex gap-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-6">Contact us</h2>
            
            <div className="mb-8">
              <h3 className="font-bold mb-3">Get in touch</h3>
              <div className="space-y-2 text-sm">
                <div>📧 Email: hi@eonnext.com</div>
                <div>📞 Phone: 0808 501 5200</div>
                <div>🌐 Online: eonnext.com/contact</div>
                <div>📱 Facebook: facebook.com/EONNext</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-3">Advice and complaints</h3>
              <div className="text-sm space-y-2">
                <p>If you're struggling to pay your bills, we're here to help. Visit eonnext.com/help or call us.</p>
                <p>If you have a complaint, we'll try to resolve it quickly. If we can't, you can contact the Energy Ombudsman for free.</p>
                <p><strong>Energy Ombudsman:</strong> 0330 440 1624 or ombudsman-services.org/energy</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-3">How much did you use?</h3>
              <div className="text-sm space-y-2">
                <div><strong>Average daily electricity usage:</strong> 7.4 kWh</div>
                <div><strong>Average daily gas usage:</strong> 1.8 m³</div>
                <p className="text-xs text-gray-600 mt-2">
                  Based on your usage during this billing period. Usage may vary seasonally.
                </p>
              </div>
            </div>
          </div>

          <div className="w-80">
            <div className="bg-gradient-to-b from-red-500 to-red-600 text-white p-6 rounded">
              <h3 className="font-bold text-lg mb-4">Important information</h3>
              <div className="text-sm space-y-3">
                <div>
                  <div className="font-semibold">Your usage this month:</div>
                  <div>Electricity: 222 kWh</div>
                  <div>Gas: 53 m³</div>
                </div>
                <div>
                  <div className="font-semibold">Compared to average:</div>
                  <div>Electricity: 12% above average</div>
                  <div>Gas: 5% below average</div>
                </div>
                <div className="text-xs mt-4 pt-4 border-t border-red-400">
                  <p>Visit eonnext.com for energy saving tips and advice on reducing your bills.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-4 border-t text-xs text-gray-600">
          <div className="flex justify-between">
            <div>E.ON Next Energy Limited Registered Office: Westwood Way, Westwood Business Park, Coventry CV4 8LG.</div>
            <div>Page 3/3</div>
          </div>
          <div>Registered in England and Wales No: 03782443. E.ON UK plc VAT Group Registration Number: 559 0978 89</div>
        </div>
      </div>

      <style jsx>{`
        .page-break {
          page-break-before: always;
        }
        @media print {
          .page-break {
            page-break-before: always;
          }
        }
      `}</style>
    </div>
  );
};

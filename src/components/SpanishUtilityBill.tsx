import React from 'react';
import { UserDetails, Transaction } from '../utils/dataGenerator';

interface SpanishUtilityBillProps {
  userDetails: UserDetails;
  utilityData?: {
    consumptionKwh: number;
    totalAmount: number;
    billPeriod: string;
    billNumber: string;
    contractNumber: string;
    meterNumber: string;
    electricityAmount: number;
    gasAmount: number;
    taxAmount: number;
    equipmentRental: number;
    vatAmount: number;
  };
}

export const SpanishUtilityBill: React.FC<SpanishUtilityBillProps> = ({ 
  userDetails, 
  utilityData
}) => {
  // Generate dynamic utility data if not provided
  const dynamicUtilityData = utilityData || {
    consumptionKwh: Math.floor(Math.random() * 200) + 100,
    totalAmount: parseFloat((Math.random() * 50 + 25).toFixed(2)),
    billPeriod: userDetails.statementPeriod || '15/12/2024 - 22/01/2025',
    billNumber: `2021${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}O`,
    contractNumber: `CO-2024-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}_1_9`,
    meterNumber: Math.floor(Math.random() * 1000000000).toString().padStart(10, '0'),
    electricityAmount: parseFloat((Math.random() * 20 + 10).toFixed(2)),
    gasAmount: parseFloat((Math.random() * 15 + 5).toFixed(2)),
    taxAmount: parseFloat((Math.random() * 2 + 1).toFixed(2)),
    equipmentRental: parseFloat((Math.random() * 1.5 + 0.5).toFixed(2)),
    vatAmount: parseFloat((Math.random() * 8 + 4).toFixed(2))
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} €`;
  };

  // Helper function to format address in 3-line structure
  const formatAddress = (address: string | undefined) => {
    if (!address) return ['N/A'];
    
    // Check if address uses the new pipe-separated format
    if (address.includes('|')) {
      return address.split('|');
    }
    
    // Handle legacy comma-separated format
    const parts = address.split(', ');
    if (parts.length >= 3) {
      // Try to restructure: [street], [city, postcode], [country]
      const street = parts[0];
      const cityPostcode = parts.slice(1, -1).join(', ');
      const country = parts[parts.length - 1].toUpperCase();
      return [street, cityPostcode, country];
    }
    
    // Fallback for simple addresses
    return parts;
  };

  const addressLines = formatAddress(userDetails.address);

  return (
    <div id="utility-bill" className="bg-white text-black text-sm" style={{ width: '210mm', minHeight: '270mm', margin: '0 auto', fontFamily: '"Times New Roman", Georgia, serif' }}>
      {/* Header with Fenie Energía logo */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/d29366bf-af9a-4484-93b6-c1d912d3464a.png" 
              alt="Fenie Energía" 
              className="h-20 w-auto mr-8"
            />
          </div>
          <div className="text-right text-xs space-y-1 max-w-xs">
            <div><strong>Razón Social:</strong> {userDetails.name}</div>
            <div><strong>NIF / CIF:</strong> {Math.floor(Math.random() * 1000000000)}</div>
            <div><strong>CUPS:</strong> ES{Math.floor(Math.random() * 10000000000000000).toString().padStart(16, '0')}FT</div>
            <div><strong>Dir. Suministro:</strong> {addressLines[0]}</div>
            <div><strong>Contrato Acceso:</strong> {Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}I</div>
            <div><strong>Empresa Distribuidora:</strong> IBERDROLA DISTRIBUCION ELECTRICA, S.A.</div>
          </div>
        </div>

        {/* Bill Details Section */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="font-bold mb-2">Datos Factura</h3>
            <div className="text-xs space-y-1">
              <div><strong>Fecha de Factura:</strong> {new Date().toLocaleDateString('es-ES')}</div>
              <div><strong>Período Facturación:</strong> {dynamicUtilityData.billPeriod}</div>
              <div><strong>Factura Nº:</strong> {dynamicUtilityData.billNumber}</div>
              <div><strong>Nº de Contrato:</strong> {dynamicUtilityData.contractNumber}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-sm">{userDetails.name}</div>
            <div className="text-xs mt-1 space-y-1">
              {addressLines.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Energy Consumption Table */}
        <div className="border-2 border-black rounded-lg mb-6">
          <div className="bg-gray-100 p-3 font-bold text-center text-sm">
            Término de energía variable
          </div>
          <div className="text-right text-sm font-bold p-2 pr-4">
            Importe Total
          </div>
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2 text-left">Precio Peaje</th>
                <th className="border border-gray-300 p-2 text-left">Precio Coste Energía</th>
                <th className="border border-gray-300 p-2 text-left">Precio Total</th>
                <th className="border border-gray-300 p-2 text-left">Consumo</th>
                <th className="border border-gray-300 p-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">P1:</td>
                <td className="border border-gray-300 p-2">{(Math.random() * 0.1 + 0.05).toFixed(6)} €/kWh</td>
                <td className="border border-gray-300 p-2">+ {(Math.random() * 0.1 + 0.05).toFixed(6)}€/kWh=</td>
                <td className="border border-gray-300 p-2">{(Math.random() * 0.2 + 0.1).toFixed(6)}€/kWh</td>
                <td className="border border-gray-300 p-2">x {Math.floor(dynamicUtilityData.consumptionKwh * 0.6)},00kWh = {dynamicUtilityData.electricityAmount.toFixed(2)} €</td>
                <td className="border border-gray-300 p-2 font-bold">{(dynamicUtilityData.electricityAmount + dynamicUtilityData.gasAmount).toFixed(2)}€</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">P2:</td>
                <td className="border border-gray-300 p-2">{(Math.random() * 0.01 + 0.001).toFixed(6)} €/kWh</td>
                <td className="border border-gray-300 p-2">+ {(Math.random() * 0.1 + 0.05).toFixed(6)}€/kWh=</td>
                <td className="border border-gray-300 p-2">{(Math.random() * 0.1 + 0.05).toFixed(6)}€/kWh</td>
                <td className="border border-gray-300 p-2">x {Math.floor(dynamicUtilityData.consumptionKwh * 0.4)},00kWh = {dynamicUtilityData.gasAmount.toFixed(2)} €</td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Power Term */}
        <div className="border-2 border-black rounded-lg mb-6">
          <div className="bg-gray-100 p-3 font-bold text-center text-sm">
            Término de potencia
          </div>
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2 text-left">Contratada</th>
                <th className="border border-gray-300 p-2 text-left">Máximo</th>
                <th className="border border-gray-300 p-2 text-left">Precio Peaje</th>
                <th className="border border-gray-300 p-2 text-left">Precio Potencia Fenie Energía</th>
                <th className="border border-gray-300 p-2 text-left">Precio Total</th>
                <th className="border border-gray-300 p-2 text-left">A Facturar</th>
                <th className="border border-gray-300 p-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">P1: {(Math.random() * 2 + 2).toFixed(3)}kW</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">{(Math.random() * 0.2 + 0.05).toFixed(6)}€/kWh día</td>
                <td className="border border-gray-300 p-2">+ 0€/kWh día=</td>
                <td className="border border-gray-300 p-2">{(Math.random() * 0.2 + 0.05).toFixed(6)}€/kWh día x</td>
                <td className="border border-gray-300 p-2">{(Math.random() * 2 + 2).toFixed(2)}kWx {Math.floor(Math.random() * 10 + 30)}días =</td>
                <td className="border border-gray-300 p-2 font-bold">{(Math.random() * 20 + 10).toFixed(2)}€</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Reactive Energy */}
        <div className="border-2 border-black rounded-lg mb-6">
          <div className="bg-gray-100 p-3 font-bold text-center text-sm">
            Energía reactiva
          </div>
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2 text-left">Consumo</th>
                <th className="border border-gray-300 p-2 text-left">Cos phi</th>
                <th className="border border-gray-300 p-2 text-left">Precio</th>
                <th className="border border-gray-300 p-2 text-left">Exceso</th>
                <th className="border border-gray-300 p-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">P1: 0,00kVarh</td>
                <td className="border border-gray-300 p-2">1,00</td>
                <td className="border border-gray-300 p-2">0,000000€/kWh</td>
                <td className="border border-gray-300 p-2">x 0,00kVarh =</td>
                <td className="border border-gray-300 p-2 font-bold">0,00€</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Taxes and Additional Charges */}
        <div className="space-y-2 text-xs mb-6">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span><strong>Impuesto electricidad</strong> 5,112696323% s/ {(dynamicUtilityData.electricityAmount + dynamicUtilityData.gasAmount).toFixed(2)} €</span>
            <span className="font-bold">{dynamicUtilityData.taxAmount.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span><strong>Alquiler Equipo medida</strong> ( Nº Contador {dynamicUtilityData.meterNumber}):</span>
            <span className="font-bold">{dynamicUtilityData.equipmentRental.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between border-b-2 border-black pb-2">
            <span><strong>IVA</strong> 21,00% s/ {(dynamicUtilityData.electricityAmount + dynamicUtilityData.gasAmount + dynamicUtilityData.taxAmount + dynamicUtilityData.equipmentRental).toFixed(2)}</span>
            <span className="font-bold">{dynamicUtilityData.vatAmount.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between pt-2 text-lg font-bold">
            <span>TOTAL FACTURA:</span>
            <span>{formatCurrency(dynamicUtilityData.totalAmount)}</span>
          </div>
        </div>

        {/* Payment and Contact Information */}
        <div className="grid grid-cols-2 gap-6 text-xs">
          <div className="border-2 border-black rounded-lg p-4">
            <h4 className="font-bold mb-2">Datos de Pago</h4>
            <p className="mb-2">El importe de la presente factura le será adeudado a partir del {new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString('es-ES')} en:</p>
            <div className="font-mono text-sm font-bold">
              Banco 0182-2294-31-0201XXXXXX
            </div>
          </div>
          <div className="border-2 border-black rounded-lg p-4">
            <h4 className="font-bold mb-2">Atención al Cliente y Reclamaciones</h4>
            <p className="mb-2">En horario comercial de su Agente Energético:</p>
            <div className="space-y-1">
              <p>Y las 24 horas en el <strong>900 215 470</strong></p>
              <p>o <strong>clientes@fenieenergia.es</strong></p>
              <p className="border-t pt-2 mt-2">
                <strong>Telf. Averías de la Distribuidora:</strong> 900 171 171
              </p>
            </div>
          </div>
        </div>

        {/* Footer with regulatory information */}
        <div className="mt-8 text-xs text-center space-y-2 border-t pt-4">
          <p className="font-bold">
            Factura emitida en Madrid Fenie Energía S.A., inscrita en el Registro Mercantil de Madrid Tomo 27.814, Folio 44, Hoja M-503244, CIF A-85808036
          </p>
          <p>
            Domicilio social: C/Jacinto Benavente, 28 Planta Baja Edificio Tripark (28232) Las Rozas (Madrid)
          </p>
          <p>
            Le informamos que sus datos son tratados por FENIE ENERGÍA, S.A sólo para gestiones contables, fiscales y administrativas y se almacenan de conformidad en el fichero "CLIENTES" 
            debidamente protegido e inscrito en el Registro de la AGPD. Dichos datos
          </p>
          <p>
            sólo serían cedidos a entidades o Administraciones Públicas competentes, siempre que otras normativas así lo establezcan. Usted podrá ejercitar sus derechos ARCO 
            enviándonos carta debidamente firmada junto con fotocopia de su DNI/NIF.
          </p>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { UserDetails, Transaction } from '../utils/dataGenerator';

interface SpanishUtilityBillProps {
  userDetails: UserDetails;
  utilityData?: {
    consumptionKwh: number;
    totalAmount: number;
    billPeriod: string;
  };
}

export const SpanishUtilityBill: React.FC<SpanishUtilityBillProps> = ({ 
  userDetails, 
  utilityData = {
    consumptionKwh: 127,
    totalAmount: 36.65,
    billPeriod: '15/12/2024 - 22/01/2025'
  }
}) => {
  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} €`;
  };

  return (
    <div id="utility-bill" className="bg-white text-black font-sans text-sm" style={{ width: '210mm', minHeight: '270mm', margin: '0 auto' }}>
      {/* Header with Fenie Energía logo */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <img 
              src="/lovable-uploads/d29366bf-af9a-4484-93b6-c1d912d3464a.png" 
              alt="Fenie Energía" 
              className="h-16 w-auto"
            />
          </div>
          <div className="text-right text-xs">
            <div><strong>Razón Social:</strong> {userDetails.name}</div>
            <div><strong>NIF / CIF:</strong> 16799560S</div>
            <div><strong>CUPS:</strong> ES0021000007301376FT</div>
            <div><strong>Dir. Suministro:</strong> {userDetails.address.split(',')[0]}</div>
            <div><strong>Contrato Acceso:</strong> 0005031826I</div>
            <div><strong>Empresa Distribuidora:</strong> IBERDROLA DISTRIBUCION ELECTRICA, S.A.</div>
          </div>
        </div>

        {/* Bill Details */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="font-bold mb-2">Datos Factura</h3>
            <div className="text-xs space-y-1">
              <div>Fecha de Factura: {new Date().toLocaleDateString('es-ES')}</div>
              <div>Período Facturación: {utilityData.billPeriod}</div>
              <div>Factura Nº: 202107041814O</div>
              <div>Nº de Contrato: CO-2024-049579_1_9</div>
            </div>
          </div>
          <div>
            <div className="text-right">
              <div className="font-bold">{userDetails.name}</div>
              <div className="text-xs mt-1">
                {userDetails.address.split(', ').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Energy Consumption Table */}
        <div className="border-2 border-black rounded mb-6">
          <div className="bg-gray-100 p-2 font-bold text-center">
            Término de energía variable
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
                <td className="border border-gray-300 p-2">0,062021 €/kWh</td>
                <td className="border border-gray-300 p-2">0,086517€/kWh=</td>
                <td className="border border-gray-300 p-2">0,148529€/kWh</td>
                <td className="border border-gray-300 p-2">{utilityData.consumptionKwh},00kWh =</td>
                <td className="border border-gray-300 p-2">18,86€</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Power Term */}
        <div className="border-2 border-black rounded mb-6">
          <div className="bg-gray-100 p-2 font-bold text-center">
            Término de potencia
          </div>
          <table className="w-full border-collapse text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Contratada: 3,450kW</td>
                <td className="border border-gray-300 p-2">Precio Peaje: 0,104229€/kWh día</td>
                <td className="border border-gray-300 p-2">Precio Total: 0,104229€/kWh día x 3,45kWx 37días =</td>
                <td className="border border-gray-300 p-2">13,30€</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Taxes and Total */}
        <div className="space-y-2 text-xs mb-6">
          <div className="flex justify-between">
            <span>Impuesto electricidad: 5,11269632% s/ 27,88 €</span>
            <span>1,43 €</span>
          </div>
          <div className="flex justify-between">
            <span>Alquiler Equipo medida ( Nº Contador 0043643392):</span>
            <span>0,98 €</span>
          </div>
          <div className="flex justify-between">
            <span>IVA: 21,00% s/ 30,29</span>
            <span>6,36€</span>
          </div>
          <div className="border-t-2 border-black pt-2 flex justify-between font-bold">
            <span>TOTAL FACTURA:</span>
            <span>{formatCurrency(utilityData.totalAmount)}</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="grid grid-cols-2 gap-6 text-xs">
          <div className="border-2 border-black rounded p-4">
            <h4 className="font-bold mb-2">Datos de Pago</h4>
            <p>El importe de la presente factura le será adeudado a partir del 22/01/2025 en:</p>
            <div className="mt-4 font-mono">
              Banco 0182-2294-31-0201XXXXXX
            </div>
          </div>
          <div className="border-2 border-black rounded p-4">
            <h4 className="font-bold mb-2">Atención al Cliente y Reclamaciones</h4>
            <p>En horario comercial de su Agente Energético:</p>
            <div className="mt-2">
              <p>Y las 24 horas en el 900 215 470 o clientes@fenieenergia.es</p>
              <p>Telf. Averías de la Distribuidora: 900 171 171</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

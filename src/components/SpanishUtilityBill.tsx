
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
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/d29366bf-af9a-4484-93b6-c1d912d3464a.png" 
              alt="Fenie Energía" 
              className="h-20 w-auto mr-8"
            />
          </div>
          <div className="text-right text-xs space-y-1 max-w-xs">
            <div><strong>Razón Social:</strong> {userDetails.name}</div>
            <div><strong>NIF / CIF:</strong> 167995605</div>
            <div><strong>CUPS:</strong> ES0021000007301376FT</div>
            <div><strong>Dir. Suministro:</strong> {userDetails.address.split(',')[0]}</div>
            <div><strong>Contrato Acceso:</strong> 0005031826I</div>
            <div><strong>Empresa Distribuidora:</strong> IBERDROLA DISTRIBUCION ELECTRICA, S.A.</div>
          </div>
        </div>

        {/* Bill Details Section */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="font-bold mb-2">Datos Factura</h3>
            <div className="text-xs space-y-1">
              <div><strong>Fecha de Factura:</strong> 25/01/2025</div>
              <div><strong>Período Facturación:</strong> {utilityData.billPeriod}</div>
              <div><strong>Factura Nº:</strong> 202107041814O</div>
              <div><strong>Nº de Contrato:</strong> CO-2024-049579_1_9</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-sm">{userDetails.name}</div>
            <div className="text-xs mt-1 space-y-1">
              <div>Paseo de Santa Matilde, 1</div>
              <div>Valdecilla, Cantabria, 39724</div>
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
                <td className="border border-gray-300 p-2">0,062021 €/kWh</td>
                <td className="border border-gray-300 p-2">+ 0,086517€/kWh=</td>
                <td className="border border-gray-300 p-2">0,148529€/kWh</td>
                <td className="border border-gray-300 p-2">x 69,00kWh = 10,25 €</td>
                <td className="border border-gray-300 p-2 font-bold">14,58€</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">P2:</td>
                <td className="border border-gray-300 p-2">0,002215 €/kWh</td>
                <td className="border border-gray-300 p-2">+ 0,072361€/kWh=</td>
                <td className="border border-gray-300 p-2">0,074576€/kWh</td>
                <td className="border border-gray-300 p-2">x 58,00kWh = 4,33 €</td>
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
                <td className="border border-gray-300 p-2">P1: 3,450kW</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">0,104229€/kWh día</td>
                <td className="border border-gray-300 p-2">+ 0€/kWh día=</td>
                <td className="border border-gray-300 p-2">0,104229€/kWh día x</td>
                <td className="border border-gray-300 p-2">3,45kWx 37días =</td>
                <td className="border border-gray-300 p-2 font-bold">13,30€</td>
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
            <span><strong>Impuesto electricidad</strong> 5,112696323% s/ 27,88 €</span>
            <span className="font-bold">1,43 €</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span><strong>Alquiler Equipo medida</strong> ( Nº Contador 0043643392):</span>
            <span className="font-bold">0,98 €</span>
          </div>
          <div className="flex justify-between border-b-2 border-black pb-2">
            <span><strong>IVA</strong> 21,00% s/ 30,29</span>
            <span className="font-bold">6,36€</span>
          </div>
          <div className="flex justify-between pt-2 text-lg font-bold">
            <span>TOTAL FACTURA:</span>
            <span>{formatCurrency(utilityData.totalAmount)}</span>
          </div>
        </div>

        {/* Payment and Contact Information */}
        <div className="grid grid-cols-2 gap-6 text-xs">
          <div className="border-2 border-black rounded-lg p-4">
            <h4 className="font-bold mb-2">Datos de Pago</h4>
            <p className="mb-2">El importe de la presente factura le será adeudado a partir del 22/01/2025 en:</p>
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

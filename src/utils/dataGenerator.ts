export interface Transaction {
  date: string;
  description: string;
  amount: number;
  balance: number;
  type: 'credit' | 'debit';
}

export interface UserDetails {
  name: string;
  address: string;
  accountNumber: string;
  sortCode: string;
  statementPeriod: string;
}

const firstNames = ['James', 'Sarah', 'Michael', 'Emma', 'David', 'Lucy', 'Thomas', 'Sophie', 'Daniel', 'Charlotte'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

const streets = ['High Street', 'Church Lane', 'Victoria Road', 'King Street', 'Queen Street', 'Park Avenue', 'Mill Lane'];
const cities = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Sheffield', 'Bristol', 'Edinburgh'];

// Spanish address data
const spanishFirstNames = ['José', 'María', 'Antonio', 'Carmen', 'Francisco', 'Ana', 'Manuel', 'Isabel', 'David', 'Pilar'];
const spanishLastNames = ['García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín'];

const spanishStreetTypes = ['Calle', 'Avenida', 'Paseo', 'Plaza', 'Travesía', 'Carrer', 'Ronda', 'Callejón'];
const spanishStreetNames = [
  'de la Constitución', 'Mayor', 'de Alcalá', 'Gran Vía', 'del Carmen', 'de la Paz', 
  'Real', 'de Balmes', 'de Goya', 'de Serrano', 'del Prado', 'de Velázquez',
  'de Andalucía', 'de Castilla', 'del Sol', 'de la Luna', 'de los Reyes',
  'de Valencia', 'de Barcelona', 'de Madrid', 'de Sevilla'
];

const spanishCities = [
  { name: 'Madrid', postalCodes: ['28001', '28002', '28003', '28004', '28005', '28006', '28007', '28008', '28009', '28010'] },
  { name: 'Barcelona', postalCodes: ['08001', '08002', '08003', '08004', '08005', '08006', '08007', '08008', '08009', '08010'] },
  { name: 'Valencia', postalCodes: ['46001', '46002', '46003', '46004', '46005', '46006', '46007', '46008', '46009', '46010'] },
  { name: 'Sevilla', postalCodes: ['41001', '41002', '41003', '41004', '41005', '41006', '41007', '41008', '41009', '41010'] },
  { name: 'Zaragoza', postalCodes: ['50001', '50002', '50003', '50004', '50005', '50006', '50007', '50008', '50009', '50010'] },
  { name: 'Málaga', postalCodes: ['29001', '29002', '29003', '29004', '29005', '29006', '29007', '29008', '29009', '29010'] },
  { name: 'Murcia', postalCodes: ['30001', '30002', '30003', '30004', '30005', '30006', '30007', '30008', '30009', '30010'] },
  { name: 'Palma', postalCodes: ['07001', '07002', '07003', '07004', '07005', '07006', '07007', '07008', '07009', '07010'] },
  { name: 'Bilbao', postalCodes: ['48001', '48002', '48003', '48004', '48005', '48006', '48007', '48008', '48009', '48010'] },
  { name: 'Alicante', postalCodes: ['03001', '03002', '03003', '03004', '03005', '03006', '03007', '03008', '03009', '03010'] }
];

const merchants = [
  'TESCO STORES', 'SAINSBURYS', 'ASDA STORES', 'MORRISONS', 'WAITROSE',
  'AMAZON UK', 'UBER', 'SPOTIFY', 'NETFLIX', 'SHELL', 'BP',
  'COSTA COFFEE', 'STARBUCKS', 'GREGGS', 'MCDONALDS', 'KFC',
  'JOHN LEWIS', 'M&S', 'ZARA', 'H&M', 'PRIMARK',
  'RENT PAYMENT', 'COUNCIL TAX', 'UTILITIES', 'INSURANCE',
  'SALARY', 'BONUS', 'REFUND', 'TRANSFER'
];

export const generateSpanishUserDetails = (customData?: Partial<UserDetails>): UserDetails => {
  const firstName = spanishFirstNames[Math.floor(Math.random() * spanishFirstNames.length)];
  const lastName = spanishLastNames[Math.floor(Math.random() * spanishLastNames.length)];
  
  // Generate Spanish address
  const streetType = spanishStreetTypes[Math.floor(Math.random() * spanishStreetTypes.length)];
  const streetName = spanishStreetNames[Math.floor(Math.random() * spanishStreetNames.length)];
  const houseNumber = Math.floor(Math.random() * 200) + 1;
  const city = spanishCities[Math.floor(Math.random() * spanishCities.length)];
  const postalCode = city.postalCodes[Math.floor(Math.random() * city.postalCodes.length)];
  
  const accountNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
  const sortCode = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`;
  
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);
  const endDate = new Date();
  
  // Format dates as dd/mm/yyyy
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  // Create properly formatted Spanish address: Street | City, Postcode | Country
  const formattedAddress = `${streetType} ${streetName}, ${houseNumber}|${city.name}, ${postalCode}|SPAIN`;
  
  const defaultData = {
    name: `${firstName} ${lastName}`,
    address: formattedAddress,
    accountNumber,
    sortCode,
    statementPeriod: `${formatDate(startDate)} to ${formatDate(endDate)}`
  };

  // Filter out undefined, null, and empty string values from custom data
  const filteredCustomData = customData ? Object.fromEntries(
    Object.entries(customData).filter(([_, value]) => 
      value !== undefined && value !== null && value !== ''
    )
  ) : {};

  // Merge filtered custom data with default data
  return {
    ...defaultData,
    ...filteredCustomData
  };
};

export const generateUserDetails = (customData?: Partial<UserDetails>): UserDetails => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const street = streets[Math.floor(Math.random() * streets.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  
  const houseNumber = Math.floor(Math.random() * 999) + 1;
  const postcode = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  
  const accountNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
  const sortCode = `${Math.floor(10 + Math.random() * 90)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(10 + Math.random() * 90)}`;
  
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);
  const endDate = new Date();
  
  // Format dates as dd/mm/yyyy to match Metro Bank template
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  // Create properly formatted address: Street | City, Postcode | Country
  const formattedAddress = `${houseNumber} ${street}|${city}, ${postcode}|UNITED KINGDOM`;
  
  const defaultData = {
    name: `${firstName} ${lastName}`,
    address: formattedAddress,
    accountNumber,
    sortCode,
    statementPeriod: `${formatDate(startDate)} to ${formatDate(endDate)}`
  };

  // Filter out undefined, null, and empty string values from custom data
  const filteredCustomData = customData ? Object.fromEntries(
    Object.entries(customData).filter(([_, value]) => 
      value !== undefined && value !== null && value !== ''
    )
  ) : {};

  // Merge filtered custom data with default data
  return {
    ...defaultData,
    ...filteredCustomData
  };
};

export const generateTransactions = (count: number = 15, initialBalance?: number): Transaction[] => {
  const transactions: Transaction[] = [];
  let balance = initialBalance || (2500 + Math.random() * 5000); // Starting balance
  
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);
  
  // Format date as dd/mm/yyyy to match Metro Bank template
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  for (let i = 0; i < count; i++) {
    const transactionDate = new Date(startDate);
    transactionDate.setDate(startDate.getDate() + Math.floor((30 / count) * i) + Math.floor(Math.random() * 3));
    
    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
    const isCredit = Math.random() < 0.3; // 30% chance of credit
    
    let amount: number;
    if (isCredit) {
      if (merchant === 'SALARY') {
        amount = 2500 + Math.random() * 2000;
      } else if (merchant === 'BONUS') {
        amount = 500 + Math.random() * 1000;
      } else {
        amount = 10 + Math.random() * 200;
      }
      balance += amount;
    } else {
      if (merchant === 'RENT PAYMENT') {
        amount = 800 + Math.random() * 700;
      } else if (merchant.includes('TESCO') || merchant.includes('SAINSBURY') || merchant.includes('ASDA')) {
        amount = 20 + Math.random() * 80;
      } else if (merchant === 'COUNCIL TAX' || merchant === 'UTILITIES') {
        amount = 100 + Math.random() * 200;
      } else {
        amount = 5 + Math.random() * 50;
      }
      balance -= amount;
    }
    
    transactions.push({
      date: formatDate(transactionDate),
      description: merchant,
      amount: Math.round(amount * 100) / 100,
      balance: Math.round(balance * 100) / 100,
      type: isCredit ? 'credit' : 'debit'
    });
  }
  
  return transactions.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/').map(Number);
    const [dayB, monthB, yearB] = b.date.split('/').map(Number);
    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);
    return dateA.getTime() - dateB.getTime();
  });
};

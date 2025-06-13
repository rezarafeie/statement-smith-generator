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
  phoneNumber?: string;
  city?: string;
  fullAddress?: string;
  addressLine2?: string;
  postcode?: string;
  country?: string;
}

const firstNames = ['James', 'Sarah', 'Michael', 'Emma', 'David', 'Lucy', 'Thomas', 'Sophie', 'Daniel', 'Charlotte'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

const streets = ['High Street', 'Church Lane', 'Victoria Road', 'King Street', 'Queen Street', 'Park Avenue', 'Mill Lane'];
const cities = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Sheffield', 'Bristol', 'Edinburgh'];

// UK specific data for E.ON bills
const ukFirstNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Kimberly', 'Deborah', 'Dorothy'];

const ukLastNames = ['Smith', 'Jones', 'Taylor', 'Williams', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts', 'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'White', 'Watson', 'Jackson', 'Wright', 'Green', 'Harris', 'Cooper', 'King', 'Lee', 'Martin', 'Clarke', 'James', 'Morgan', 'Hughes', 'Edwards', 'Hill', 'Moore', 'Clark', 'Harrison', 'Scott', 'Young', 'Morris', 'Hall', 'Ward', 'Turner', 'Carter', 'Phillips', 'Mitchell', 'Patel', 'Adams', 'Campbell', 'Anderson', 'Allen', 'Cook'];

const ukStreetNames = ['High Street', 'Church Lane', 'Victoria Road', 'King Street', 'Queen Street', 'Park Avenue', 'Mill Lane', 'Station Road', 'Main Street', 'The Green', 'Manor Road', 'Church Street', 'Park Road', 'Victoria Street', 'Albert Road', 'Queensway', 'King\'s Road', 'The Avenue', 'Oak Tree Lane', 'Rose Gardens', 'Cedar Close', 'Elm Grove', 'Beech Road', 'Maple Drive', 'Willow Way', 'Birch Avenue', 'Pine Close', 'Cherry Tree Road', 'Orchard Lane', 'Garden Close'];

const ukCities = [
  { name: 'London', area: 'Greater London' },
  { name: 'Birmingham', area: 'West Midlands' },
  { name: 'Manchester', area: 'Greater Manchester' },
  { name: 'Leeds', area: 'West Yorkshire' },
  { name: 'Liverpool', area: 'Merseyside' },
  { name: 'Sheffield', area: 'South Yorkshire' },
  { name: 'Bristol', area: 'Bristol' },
  { name: 'Newcastle', area: 'Tyne and Wear' },
  { name: 'Leicester', area: 'Leicestershire' },
  { name: 'Nottingham', area: 'Nottinghamshire' },
  { name: 'Coventry', area: 'West Midlands' },
  { name: 'Bradford', area: 'West Yorkshire' },
  { name: 'Reading', area: 'Berkshire' },
  { name: 'Oxford', area: 'Oxfordshire' },
  { name: 'Cambridge', area: 'Cambrideshire' }
];

// Generate UK postcode
const generateUKPostcode = (): string => {
  const areas = ['SW', 'SE', 'NW', 'NE', 'W', 'E', 'N', 'S', 'EC', 'WC', 'M', 'B', 'L', 'LS', 'S', 'BS', 'NE', 'LE', 'NG', 'CV', 'BD', 'RG', 'OX', 'CB'];
  const area = areas[Math.floor(Math.random() * areas.length)];
  const district = Math.floor(Math.random() * 99) + 1;
  const sector = Math.floor(Math.random() * 9) + 1;
  const unit = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${area}${district} ${sector}${unit}`;
};

// Generate UK phone number
const generateUKPhone = (): string => {
  const prefix = Math.floor(Math.random() * 9000) + 1000;
  const number = Math.floor(Math.random() * 900000) + 100000;
  return `+44${prefix}${number}`;
};

// Generate E.ON specific data
export const generateEONUserDetails = (customData?: Partial<UserDetails>): UserDetails => {
  const firstName = ukFirstNames[Math.floor(Math.random() * ukFirstNames.length)];
  const lastName = ukLastNames[Math.floor(Math.random() * ukLastNames.length)];
  const streetName = ukStreetNames[Math.floor(Math.random() * ukStreetNames.length)];
  const city = ukCities[Math.floor(Math.random() * ukCities.length)];
  const houseNumber = Math.floor(Math.random() * 999) + 1;
  const postcode = generateUKPostcode();
  
  const accountNumber = `A-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const billReference = Math.floor(10000000 + Math.random() * 90000000).toString();
  const phoneNumber = generateUKPhone();
  
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);
  const endDate = new Date();
  
  const formatDate = (date: Date) => {
    const day = date.getDate().toString();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}${day.endsWith('1') && day !== '11' ? 'st' : day.endsWith('2') && day !== '12' ? 'nd' : day.endsWith('3') && day !== '13' ? 'rd' : 'th'} ${month}. ${year}`;
  };
  
  // Build address from custom fields if provided, otherwise use generated data
  let finalCity = customData?.city || city.name;
  let finalPostcode = customData?.postcode || postcode;
  let finalStreetAddress = customData?.fullAddress || `${houseNumber} ${streetName}`;
  let finalAddressLine2 = customData?.addressLine2 || '';
  let finalCountry = customData?.country || 'UNITED KINGDOM';
  
  // Build formatted address with pipe separation
  // Format: fullAddress|addressLine2|city|postcode
  let formattedAddress = `${finalStreetAddress}`;
  if (finalAddressLine2) {
    formattedAddress += `|${finalAddressLine2}`;
  } else {
    formattedAddress += '|';
  }
  formattedAddress += `|${finalCity}|${finalPostcode}`;
  
  const defaultData = {
    name: `${firstName} ${lastName}`,
    address: formattedAddress,
    accountNumber,
    sortCode: billReference,
    statementPeriod: `${formatDate(startDate)} - ${formatDate(endDate)}`,
    phoneNumber,
    city: finalCity,
    fullAddress: finalStreetAddress,
    addressLine2: finalAddressLine2,
    postcode: finalPostcode,
    country: finalCountry
  };

  // Filter out undefined, null, and empty string values from custom data
  const filteredCustomData = customData ? Object.fromEntries(
    Object.entries(customData).filter(([_, value]) => 
      value !== undefined && value !== null && value !== ''
    )
  ) : {};

  return {
    ...defaultData,
    ...filteredCustomData,
    // Ensure address is rebuilt if any address components were customized
    address: customData?.fullAddress || customData?.addressLine2 || customData?.city || customData?.postcode 
      ? `${filteredCustomData.fullAddress || finalStreetAddress}|${filteredCustomData.addressLine2 || finalAddressLine2}|${filteredCustomData.city || finalCity}|${filteredCustomData.postcode || finalPostcode}`
      : formattedAddress
  };
};

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
  
  // Use custom data if provided, otherwise use generated data
  const finalCity = customData?.city || city.name;
  const finalPostcode = customData?.postcode || postalCode;
  const finalStreetAddress = customData?.fullAddress || `${streetType} ${streetName}, ${houseNumber}`;
  const finalAddressLine2 = customData?.addressLine2 || '';
  const finalCountry = customData?.country || 'SPAIN';
  
  // Create properly formatted Spanish address: Street | AddressLine2 | City, Postcode | Country
  let formattedAddress = `${finalStreetAddress}`;
  if (finalAddressLine2) {
    formattedAddress += `|${finalAddressLine2}`;
  } else {
    formattedAddress += '|';
  }
  formattedAddress += `|${finalCity}, ${finalPostcode}|${finalCountry}`;
  
  const defaultData = {
    name: `${firstName} ${lastName}`,
    address: formattedAddress,
    accountNumber,
    sortCode,
    statementPeriod: `${formatDate(startDate)} to ${formatDate(endDate)}`,
    city: finalCity,
    fullAddress: finalStreetAddress,
    addressLine2: finalAddressLine2,
    postcode: finalPostcode,
    country: finalCountry
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
    ...filteredCustomData,
    // Ensure address is rebuilt if any address components were customized
    address: customData?.fullAddress || customData?.addressLine2 || customData?.city || customData?.postcode || customData?.country
      ? `${filteredCustomData.fullAddress || finalStreetAddress}|${filteredCustomData.addressLine2 || finalAddressLine2}|${filteredCustomData.city || finalCity}, ${filteredCustomData.postcode || finalPostcode}|${filteredCustomData.country || finalCountry}`
      : formattedAddress
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
  
  // Use custom data if provided, otherwise use generated data
  const finalCity = customData?.city || city;
  const finalPostcode = customData?.postcode || postcode;
  const finalStreetAddress = customData?.fullAddress || `${houseNumber} ${street}`;
  const finalAddressLine2 = customData?.addressLine2 || '';
  const finalCountry = customData?.country || 'UNITED KINGDOM';
  
  // Create properly formatted address: Street | AddressLine2 | City, Postcode | Country
  let formattedAddress = `${finalStreetAddress}`;
  if (finalAddressLine2) {
    formattedAddress += `|${finalAddressLine2}`;
  } else {
    formattedAddress += '|';
  }
  formattedAddress += `|${finalCity}, ${finalPostcode}|${finalCountry}`;
  
  const defaultData = {
    name: `${firstName} ${lastName}`,
    address: formattedAddress,
    accountNumber,
    sortCode,
    statementPeriod: `${formatDate(startDate)} to ${formatDate(endDate)}`,
    city: finalCity,
    fullAddress: finalStreetAddress,
    addressLine2: finalAddressLine2,
    postcode: finalPostcode,
    country: finalCountry
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
    ...filteredCustomData,
    // Ensure address is rebuilt if any address components were customized
    address: customData?.fullAddress || customData?.addressLine2 || customData?.city || customData?.postcode || customData?.country
      ? `${filteredCustomData.fullAddress || finalStreetAddress}|${filteredCustomData.addressLine2 || finalAddressLine2}|${filteredCustomData.city || finalCity}, ${filteredCustomData.postcode || finalPostcode}|${filteredCustomData.country || finalCountry}`
      : formattedAddress
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

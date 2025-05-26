
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

const merchants = [
  'TESCO STORES', 'SAINSBURYS', 'ASDA STORES', 'MORRISONS', 'WAITROSE',
  'AMAZON UK', 'UBER', 'SPOTIFY', 'NETFLIX', 'SHELL', 'BP',
  'COSTA COFFEE', 'STARBUCKS', 'GREGGS', 'MCDONALDS', 'KFC',
  'JOHN LEWIS', 'M&S', 'ZARA', 'H&M', 'PRIMARK',
  'RENT PAYMENT', 'COUNCIL TAX', 'UTILITIES', 'INSURANCE',
  'SALARY', 'BONUS', 'REFUND', 'TRANSFER'
];

export const generateUserDetails = (): UserDetails => {
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
  
  return {
    name: `${firstName} ${lastName}`,
    address: `${houseNumber} ${street}, ${city}, ${postcode}`,
    accountNumber,
    sortCode,
    statementPeriod: `${formatDate(startDate)} to ${formatDate(endDate)}`
  };
};

export const generateTransactions = (count: number = 15): Transaction[] => {
  const transactions: Transaction[] = [];
  let balance = 2500 + Math.random() * 5000; // Starting balance
  
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

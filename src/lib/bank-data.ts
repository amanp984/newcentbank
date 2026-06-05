export const CUSTOMER = {
  name: "RAJESH KUMAR",
  customerId: "892345126789",
  cif: "892345126789",
  accountNumber: "7823 0091 4521 8834",
  accountNumberRaw: "78230091452188 34",
  ifsc: "CBIN0281234",
  kyc: "KYC-2024-CBIN-89234",
  mobile: "+91 98xxxxxx12",
  email: "ra*****@gmail.com",
  address: "12, MG Road, Andheri East, Mumbai, Maharashtra - 400069",
  branch: "Mumbai Andheri East Branch, Central Bank, Andheri East, Mumbai - 400069",
  accountLimit: "₹50,00,000",
  rewardPoints: 12840,
  lastLogin: "28 May 2026, 09:42 AM IST",
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  reference: string;
  type: "credit" | "debit";
  amount: number;
  balance: number;
};

export const TRANSACTIONS: Transaction[] = [
  { id: "t1", date: "28 May 2026", description: "UPI to SWIGGY", reference: "UPI/426712345671", type: "debit", amount: 485, balance: 148230.75 },
  { id: "t2", date: "27 May 2026", description: "Salary Credit — ABC Technologies", reference: "NEFT/ABCT456712", type: "credit", amount: 85000, balance: 148715.75 },
  { id: "t3", date: "27 May 2026", description: "EMI Debit — Home Loan", reference: "ACH/8845213344", type: "debit", amount: 28456, balance: 63715.75 },
  { id: "t4", date: "26 May 2026", description: "UPI to AMAZON", reference: "UPI/426712345123", type: "debit", amount: 2349, balance: 92171.75 },
  { id: "t5", date: "25 May 2026", description: "UPI to ZOMATO", reference: "UPI/426712344889", type: "debit", amount: 620, balance: 94520.75 },
  { id: "t6", date: "24 May 2026", description: "NEFT from MAHESH KUMAR", reference: "NEFT/HDFC2245612", type: "credit", amount: 5000, balance: 95140.75 },
  { id: "t7", date: "23 May 2026", description: "ATM Withdrawal — Andheri", reference: "ATM/451223", type: "debit", amount: 10000, balance: 90140.75 },
  { id: "t8", date: "22 May 2026", description: "Interest Credit", reference: "INT/202605", type: "credit", amount: 312.5, balance: 100140.75 },
];

export const BENEFICIARIES = [
  {
    id: "b1",
    name: "MAHESH KUMAR",
    bank: "HDFC BANK",
    upi: "HDFC0BHOKVAN",
    account: "50100xxxxxx456",
    ifsc: "HDFC0001234",
    addedOn: "12 Mar 2026",
    status: "Verified",
  },
  {
    id: "b2",
    name: "GOVIND SHUKLA",
    bank: "ICICI BANK",
    upi: "ICICI7ASHOKV",
    account: "62540xxxxxx981",
    ifsc: "ICIC0006254",
    addedOn: "05 Apr 2026",
    status: "Verified",
  },
];

export const CARDS = [
  {
    id: "c1",
    type: "Debit Card — RuPay Platinum",
    masked: "5234 XXXX XXXX 8834",
    expiry: "08/29",
    status: "Active" as "Active" | "Blocked",
  },
];

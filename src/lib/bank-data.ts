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
  balance?: number;
};

export const TRANSACTIONS: Transaction[] = [];

export function computeBalance(txns: Transaction[] = TRANSACTIONS): number {
  return txns.reduce((s, t) => s + (t.type === "credit" ? t.amount : -t.amount), 0);
}

/** Input is newest-first; returns newest-first with running balance attached. */
export function withRunningBalance(txns: Transaction[] = TRANSACTIONS): Required<Transaction>[] {
  const oldestFirst = [...txns].reverse();
  let running = 0;
  const enriched = oldestFirst.map((t) => {
    running += t.type === "credit" ? t.amount : -t.amount;
    return { ...t, balance: running } as Required<Transaction>;
  });
  return enriched.reverse();
}

export function formatINR(n: number): string {
  return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

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

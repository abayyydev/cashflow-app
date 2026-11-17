export type TransactionType = 'pemasukan' | 'pengeluaran';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string; // Format: YYYY-MM-DD
  note?: string;
  createdAt: number;
}

export type TransactionFormData = {
  type: TransactionType;
  amount: number;
  category: string;
  date: string;
  note?: string;
};

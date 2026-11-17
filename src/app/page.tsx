'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import SummaryCards from '@/components/SummaryCards';
import MonthFilter from '@/components/MonthFilter';
import TransactionList from '@/components/TransactionList';
import TransactionModal from '@/components/TransactionModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { useCashflow, useIsMounted } from '@/hooks/useCashflow';
import { Transaction, TransactionFormData } from '@/types/cashflow';
import { getCurrentYearMonth, formatMonthYear } from '@/utils/format';

export default function CashflowApp() {
  const {
    transactions,
    isLoaded,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useCashflow();

  const isMounted = useIsMounted();
  const [selectedMonthOverride, setSelectedMonthOverride] = useState<string | null>(null);

  // Jika belum di-override oleh user, gunakan bulan berjalan setelah mounted, atau 'all' saat SSR
  const currentMonth = isMounted ? getCurrentYearMonth() : 'all';
  const selectedMonth = selectedMonthOverride ?? currentMonth;

  // State Modal Tambah/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  // State Modal Konfirmasi Hapus
  const [deletingTransaction, setDeletingTransaction] =
    useState<Transaction | null>(null);

  // Ambil daftar bulan unik yang ada di transaksi
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    transactions.forEach((tx) => {
      if (tx.date && tx.date.length >= 7) {
        months.add(tx.date.substring(0, 7));
      }
    });
    return Array.from(months);
  }, [transactions]);

  // Filter transaksi berdasarkan bulan yang dipilih
  const filteredTransactions = useMemo(() => {
    if (selectedMonth === 'all') {
      return transactions;
    }
    return transactions.filter(
      (tx) => tx.date && tx.date.startsWith(selectedMonth)
    );
  }, [transactions, selectedMonth]);

  // Hitung total ringkasan
  const summary = useMemo(() => {
    let income = 0;
    let expense = 0;

    filteredTransactions.forEach((tx) => {
      if (tx.type === 'pemasukan') {
        income += tx.amount;
      } else {
        expense += tx.amount;
      }
    });

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [filteredTransactions]);

  // Handler Buka Modal Tambah
  const handleOpenAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  // Handler Buka Modal Edit
  const handleOpenEditModal = (tx: Transaction) => {
    setEditingTransaction(tx);
    setIsModalOpen(true);
  };

  // Handler Simpan Transaksi (Tambah atau Edit)
  const handleSaveTransaction = (formData: TransactionFormData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, formData);
    } else {
      addTransaction(formData);
    }
    // Jika transaksi baru dibuat dengan tanggal bulan tertentu, user tetap bisa melihatnya
    if (formData.date && selectedMonth !== 'all') {
      const txMonth = formData.date.substring(0, 7);
      if (txMonth !== selectedMonth) {
        setSelectedMonthOverride(txMonth);
      }
    }
  };

  // Handler Hapus Transaksi
  const handleConfirmDelete = () => {
    if (deletingTransaction) {
      deleteTransaction(deletingTransaction.id);
      setDeletingTransaction(null);
    }
  };

  const filterLabel =
    selectedMonth === 'all'
      ? 'Semua Waktu'
      : formatMonthYear(selectedMonth);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col pb-24 sm:pb-12">
      {/* Header Aplikasi */}
      <Header />

      {/* Konten Utama */}
      <main className="max-w-2xl w-full mx-auto px-4 py-5 space-y-5 flex-1">
        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-zinc-400">Memuat catatan keuangan...</p>
          </div>
        ) : (
          <>
            {/* Filter Bulan */}
            <MonthFilter
              selectedMonth={selectedMonth}
              onSelectMonth={setSelectedMonthOverride}
              availableMonths={availableMonths}
            />

            {/* Kartu Ringkasan (Saldo, Pemasukan, Pengeluaran) */}
            <SummaryCards
              income={summary.income}
              expense={summary.expense}
              balance={summary.balance}
              filterLabel={filterLabel}
            />

            {/* Daftar Transaksi */}
            <TransactionList
              transactions={filteredTransactions}
              onEdit={handleOpenEditModal}
              onDelete={setDeletingTransaction}
              onAddNew={handleOpenAddModal}
            />
          </>
        )}
      </main>

      {/* Floating Action Button (FAB) untuk Tambah Transaksi di Mobile & Desktop */}
      <div className="fixed bottom-5 inset-x-0 max-w-2xl mx-auto px-4 pointer-events-none z-40 flex justify-end">
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="pointer-events-auto shadow-xl shadow-emerald-600/30 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold px-5 py-3.5 rounded-2xl flex items-center gap-2 transition-all cursor-pointer"
          aria-label="Tambah Transaksi Baru"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-sm">Tambah Transaksi</span>
        </button>
      </div>

      {/* Modal Tambah & Edit Transaksi */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveTransaction}
        initialData={editingTransaction}
      />

      {/* Modal Konfirmasi Hapus */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingTransaction)}
        transaction={deletingTransaction}
        onClose={() => setDeletingTransaction(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

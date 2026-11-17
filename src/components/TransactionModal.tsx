'use client';

import React, { useState } from 'react';
import {
  Transaction,
  TransactionFormData,
  TransactionType,
} from '@/types/cashflow';
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
  formatRupiah,
  getTodayDateString,
} from '@/utils/format';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => void;
  initialData?: Transaction | null;
}

function TransactionFormDialog({
  onClose,
  onSubmit,
  initialData,
}: {
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => void;
  initialData?: Transaction | null;
}) {
  const isEditing = Boolean(initialData);

  const [type, setType] = useState<TransactionType>(
    initialData ? initialData.type : 'pengeluaran'
  );
  const [amountStr, setAmountStr] = useState<string>(
    initialData ? String(initialData.amount) : ''
  );
  const [date, setDate] = useState<string>(
    initialData ? initialData.date : getTodayDateString()
  );
  const [note, setNote] = useState<string>(initialData?.note || '');
  const [error, setError] = useState<string>('');

  const activeCategories =
    type === 'pemasukan' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const [category, setCategory] = useState<string>(() => {
    if (initialData) {
      const cats =
        initialData.type === 'pemasukan'
          ? INCOME_CATEGORIES
          : EXPENSE_CATEGORIES;
      return cats.includes(initialData.category)
        ? initialData.category
        : 'Lainnya';
    }
    return EXPENSE_CATEGORIES[0];
  });

  const [customCategory, setCustomCategory] = useState<string>(() => {
    if (initialData) {
      const cats =
        initialData.type === 'pemasukan'
          ? INCOME_CATEGORIES
          : EXPENSE_CATEGORIES;
      return cats.includes(initialData.category) ? '' : initialData.category;
    }
    return '';
  });

  // Saat tipe berubah di form baru, reset default kategori
  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    const newCategories =
      newType === 'pemasukan' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    if (!newCategories.includes(category)) {
      setCategory(newCategories[0]);
      setCustomCategory('');
    }
  };

  const handleQuickAddAmount = (addValue: number) => {
    const current = Number(amountStr) || 0;
    setAmountStr(String(current + addValue));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = Number(amountStr);

    if (!amountStr || isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Nominal harus berupa angka yang lebih dari 0.');
      return;
    }

    const finalCategory =
      category === 'Lainnya' && customCategory.trim()
        ? customCategory.trim()
        : category.trim();

    if (!finalCategory) {
      setError('Silakan pilih atau isi kategori transaksi.');
      return;
    }

    if (!date) {
      setError('Silakan pilih tanggal transaksi.');
      return;
    }

    onSubmit({
      type,
      amount: Math.round(parsedAmount),
      category: finalCategory,
      date,
      note: note.trim() || undefined,
    });

    onClose();
  };

  const numericAmount = Number(amountStr) || 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {isEditing ? 'Edit Transaksi' : 'Tambah Transaksi'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Tutup modal"
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
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Pemilih Tipe: Pengeluaran vs Pemasukan */}
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
              Tipe Transaksi
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
              <button
                type="button"
                onClick={() => handleTypeChange('pengeluaran')}
                className={`py-2.5 px-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  type === 'pengeluaran'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 13l-5 5m0 0l-5-5m5 5V6"
                  />
                </svg>
                Pengeluaran
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange('pemasukan')}
                className={`py-2.5 px-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  type === 'pemasukan'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                Pemasukan
              </button>
            </div>
          </div>

          {/* Nominal */}
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
              Nominal (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-zinc-400 text-base">
                Rp
              </span>
              <input
                type="number"
                inputMode="numeric"
                min="1"
                placeholder="0"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>
            {numericAmount > 0 && (
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Terbaca: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{formatRupiah(numericAmount)}</span>
              </div>
            )}

            {/* Quick buttons nominal */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[10000, 50000, 100000, 500000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickAddAmount(val)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  +{val >= 1000000 ? `${val / 1000000}jt` : `${val / 1000}rb`}
                </button>
              ))}
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
              Kategori
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2 max-h-32 overflow-y-auto p-0.5">
              {activeCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    category === cat
                      ? type === 'pemasukan'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-rose-600 text-white shadow-xs'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Jika kategori Lainnya dipilih, tampilkan input kustom */}
            {category === 'Lainnya' && (
              <input
                type="text"
                placeholder="Tulis nama kategori kustom..."
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            )}
          </div>

          {/* Tanggal */}
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
              Tanggal Transaksi
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Catatan (Opsional) */}
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
              Catatan <span className="font-normal text-zinc-400">(opsional)</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: Belanja mingguan, makan siang..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={150}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white shadow-md transition-all active:scale-98 cursor-pointer ${
                type === 'pemasukan'
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                  : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/30'
              }`}
            >
              {isEditing ? 'Perbarui Transaksi' : 'Simpan Transaksi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TransactionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TransactionModalProps) {
  if (!isOpen) return null;

  return (
    <TransactionFormDialog
      key={initialData ? initialData.id : 'create-new'}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={initialData}
    />
  );
}

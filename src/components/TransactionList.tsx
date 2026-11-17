'use client';

import React from 'react';
import { Transaction } from '@/types/cashflow';
import { formatDateIndonesian, formatRupiah } from '@/utils/format';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
  onAddNew: () => void;
}

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
  onAddNew,
}: TransactionListProps) {
  // Urutkan transaksi dari yang paling baru (berdasarkan tanggal, lalu createdAt)
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date);
    }
    return b.createdAt - a.createdAt;
  });

  // Tampilan kosong (Empty state) jika belum ada transaksi
  if (sortedTransactions.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-12 text-center shadow-xs">
        <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-zinc-800 dark:text-zinc-200">
          Belum Ada Transaksi
        </h3>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto mt-1 mb-6">
          Belum ada catatan keuangan untuk periode ini. Mulai catat transaksi pertama Anda sekarang!
        </p>
        <button
          type="button"
          onClick={onAddNew}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/30 transition-all active:scale-98 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Transaksi Sekarang
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
          Daftar Transaksi ({sortedTransactions.length})
        </h2>
        <span className="text-xs text-zinc-400">Diurutkan terbaru</span>
      </div>

      <div className="space-y-2.5">
        {sortedTransactions.map((tx) => {
          const isIncome = tx.type === 'pemasukan';

          return (
            <div
              key={tx.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 sm:p-4 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex items-center justify-between gap-3"
            >
              {/* Sisi Kiri: Ikon & Detail */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isIncome
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400'
                      : 'bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400'
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isIncome ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M17 13l-5 5m0 0l-5-5m5 5V6"
                      />
                    )}
                  </svg>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 truncate">
                      {tx.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isIncome
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                      }`}
                    >
                      {isIncome ? 'Pemasukan' : 'Pengeluaran'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    <span>{formatDateIndonesian(tx.date)}</span>
                    {tx.note && (
                      <>
                        <span>•</span>
                        <span className="italic truncate max-w-[120px] sm:max-w-[200px]">
                          {tx.note}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Sisi Kanan: Nominal & Tombol Aksi */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right">
                  <div
                    className={`font-bold text-sm sm:text-base ${
                      isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {isIncome ? '+ ' : '- '}
                    {formatRupiah(tx.amount)}
                  </div>
                </div>

                {/* Tombol Edit */}
                <button
                  type="button"
                  onClick={() => onEdit(tx)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 dark:text-zinc-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-950/30 transition-colors cursor-pointer"
                  title="Edit transaksi"
                  aria-label="Edit transaksi"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>

                {/* Tombol Hapus */}
                <button
                  type="button"
                  onClick={() => onDelete(tx)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-rose-600 hover:bg-rose-50 dark:text-zinc-400 dark:hover:text-rose-400 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  title="Hapus transaksi"
                  aria-label="Hapus transaksi"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

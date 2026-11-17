'use client';

import React from 'react';
import { Transaction } from '@/types/cashflow';
import { formatDateIndonesian, formatRupiah } from '@/utils/format';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  transaction: Transaction | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  transaction,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen || !transaction) return null;

  const isIncome = transaction.type === 'pemasukan';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        <h3 className="text-center font-bold text-lg text-zinc-900 dark:text-zinc-100">
          Hapus Transaksi?
        </h3>
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4">
          Tindakan ini tidak dapat dibatalkan.
        </p>

        {/* Info Card Transaksi */}
        <div className="bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 rounded-xl p-3.5 mb-5 space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Tipe:</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded-full ${
                isIncome
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
              }`}
            >
              {isIncome ? 'Pemasukan' : 'Pengeluaran'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Kategori:</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {transaction.category}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Nominal:</span>
            <span
              className={`font-bold ${
                isIncome ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isIncome ? '+ ' : '- '}
              {formatRupiah(transaction.amount)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Tanggal:</span>
            <span className="text-zinc-700 dark:text-zinc-300">
              {formatDateIndonesian(transaction.date)}
            </span>
          </div>
          {transaction.note && (
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Catatan:</span>
              <span className="text-zinc-700 dark:text-zinc-300 italic truncate max-w-[150px]">
                {transaction.note}
              </span>
            </div>
          )}
        </div>

        {/* Tombol Konfirmasi */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 font-semibold text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/30 transition-all cursor-pointer"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

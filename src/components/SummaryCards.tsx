'use client';

import React from 'react';
import { formatRupiah } from '@/utils/format';

interface SummaryCardsProps {
  income: number;
  expense: number;
  balance: number;
  filterLabel?: string;
}

export default function SummaryCards({
  income,
  expense,
  balance,
  filterLabel,
}: SummaryCardsProps) {
  const isPositiveBalance = balance >= 0;

  return (
    <section className="space-y-3">
      {/* Kartu Saldo Utama */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white p-5 rounded-2xl shadow-lg border border-zinc-700/50">
        <div className="flex items-center justify-between text-zinc-300 text-xs font-medium mb-1">
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Saldo Bersih {filterLabel ? `(${filterLabel})` : ''}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
              isPositiveBalance
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}
          >
            {isPositiveBalance ? 'Surplus' : 'Defisit'}
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-1">
          <span
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isPositiveBalance ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositiveBalance ? '' : '- '}
            {formatRupiah(Math.abs(balance))}
          </span>
        </div>
      </div>

      {/* Kartu Rincian: Pemasukan & Pengeluaran */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Pemasukan */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-2xl transition-all">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
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
            </span>
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              Pemasukan
            </span>
          </div>
          <div className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 truncate">
            {formatRupiah(income)}
          </div>
        </div>

        {/* Total Pengeluaran */}
        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 p-4 rounded-2xl transition-all">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-900/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
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
            </span>
            <span className="text-xs font-semibold text-rose-800 dark:text-rose-300">
              Pengeluaran
            </span>
          </div>
          <div className="text-base sm:text-lg font-bold text-rose-600 dark:text-rose-400 truncate">
            {formatRupiah(expense)}
          </div>
        </div>
      </div>
    </section>
  );
}

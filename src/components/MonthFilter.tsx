'use client';

import React from 'react';
import { formatMonthYear, getCurrentYearMonth } from '@/utils/format';
import { useIsMounted } from '@/hooks/useCashflow';

interface MonthFilterProps {
  selectedMonth: string; // 'all' or 'YYYY-MM'
  onSelectMonth: (month: string) => void;
  availableMonths: string[]; // List of YYYY-MM that have transactions
}

export function getPreviousMonth(yearMonth: string): string {
  if (!yearMonth || !yearMonth.includes('-')) return '';
  const [year, month] = yearMonth.split('-').map(Number);
  const date = new Date(year, month - 2, 1);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export function getNextMonth(yearMonth: string): string {
  if (!yearMonth || !yearMonth.includes('-')) return '';
  const [year, month] = yearMonth.split('-').map(Number);
  const date = new Date(year, month, 1);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export default function MonthFilter({
  selectedMonth,
  onSelectMonth,
  availableMonths,
}: MonthFilterProps) {
  const isMounted = useIsMounted();
  const currentYearMonth = isMounted ? getCurrentYearMonth() : '';

  const isAll = selectedMonth === 'all';
  const effectiveMonth = isAll ? currentYearMonth : selectedMonth;

  // Gabungkan bulan saat ini dengan bulan-bulan dari transaksi
  const allMonthsSet = new Set<string>();
  if (currentYearMonth) {
    allMonthsSet.add(currentYearMonth);
  }
  availableMonths.forEach((m) => allMonthsSet.add(m));
  const monthOptions = Array.from(allMonthsSet).sort((a, b) => b.localeCompare(a));

  const handlePrevMonth = () => {
    if (!effectiveMonth) return;
    const prev = getPreviousMonth(effectiveMonth);
    if (prev) onSelectMonth(prev);
  };

  const handleNextMonth = () => {
    if (!effectiveMonth) return;
    const next = getNextMonth(effectiveMonth);
    if (next) onSelectMonth(next);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        {/* Tombol Bulan Sebelumnya */}
        <button
          type="button"
          onClick={handlePrevMonth}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors shrink-0 active:scale-95 cursor-pointer"
          title="Bulan sebelumnya"
          aria-label="Bulan sebelumnya"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Tampilan & Selector Bulan */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative inline-flex items-center">
            <select
              value={selectedMonth}
              onChange={(e) => onSelectMonth(e.target.value)}
              className="appearance-none bg-transparent font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 pr-6 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg py-1 px-2"
              aria-label="Pilih bulan filter"
            >
              <option value="all" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                Semua Bulan
              </option>
              {monthOptions.map((ym) => (
                <option
                  key={ym}
                  value={ym}
                  className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                >
                  {formatMonthYear(ym)} {ym === currentYearMonth ? '(Bulan Ini)' : ''}
                </option>
              ))}
            </select>
            <svg
              className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <span className="text-[11px] text-zinc-400">
            {isAll ? 'Menampilkan semua riwayat' : formatMonthYear(selectedMonth)}
          </span>
        </div>

        {/* Tombol Bulan Berikutnya */}
        <button
          type="button"
          onClick={handleNextMonth}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors shrink-0 active:scale-95 cursor-pointer"
          title="Bulan berikutnya"
          aria-label="Bulan berikutnya"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Quick Pills */}
      <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
        <button
          type="button"
          onClick={() => currentYearMonth && onSelectMonth(currentYearMonth)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            selectedMonth === currentYearMonth && currentYearMonth
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          Bulan Ini
        </button>
        <button
          type="button"
          onClick={() => onSelectMonth('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            selectedMonth === 'all'
              ? 'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900 shadow-xs'
              : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          Semua Riwayat
        </button>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Transaction } from '@/types/cashflow';
import { formatRupiah, formatDateIndonesian } from '@/utils/format';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  filterLabel: string;
  onClearAll: () => void;
}

export default function ExportModal({
  isOpen,
  onClose,
  transactions,
  filteredTransactions,
  filterLabel,
  onClearAll,
}: ExportModalProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  // Format teks ringkasan untuk berbagi
  const generateSummaryText = () => {
    let income = 0;
    let expense = 0;
    filteredTransactions.forEach((tx) => {
      if (tx.type === 'pemasukan') income += tx.amount;
      else expense += tx.amount;
    });

    const lines = [
      `📊 Laporan Cash Flow (${filterLabel})`,
      `Total Pemasukan: ${formatRupiah(income)}`,
      `Total Pengeluaran: ${formatRupiah(expense)}`,
      `Saldo Bersih: ${income - expense >= 0 ? '' : '- '}${formatRupiah(Math.abs(income - expense))}`,
      `Total Catatan: ${filteredTransactions.length} transaksi`,
      '',
      '--- Rincian Transaksi ---',
    ];

    filteredTransactions.slice(0, 15).forEach((tx, idx) => {
      const sign = tx.type === 'pemasukan' ? '(+)' : '(-)';
      lines.push(
        `${idx + 1}. [${formatDateIndonesian(tx.date)}] ${tx.category}: ${sign} ${formatRupiah(tx.amount)}${tx.note ? ` (${tx.note})` : ''}`
      );
    });

    if (filteredTransactions.length > 15) {
      lines.push(`... dan ${filteredTransactions.length - 15} transaksi lainnya.`);
    }

    lines.push('', 'Dicatat menggunakan aplikasi Cash Flow (Abayyydev Cashflow).');
    return lines.join('\n');
  };

  // Berbagi via Web Share API atau salin teks
  const handleShare = async () => {
    const text = generateSummaryText();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Laporan Keuangan Cash Flow - ${filterLabel}`,
          text: text,
        });
        return;
      } catch {
        // Jika dibatalkan user atau gagal, fallback ke copy
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch {
      alert('Teks laporan berhasil disiapkan:\n\n' + text);
    }
  };

  // Unduh CSV
  const handleDownloadCSV = () => {
    const rows = [
      ['ID', 'Tipe', 'Kategori', 'Nominal', 'Tanggal', 'Catatan'],
      ...transactions.map((tx) => [
        `"${tx.id}"`,
        `"${tx.type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}"`,
        `"${tx.category.replace(/"/g, '""')}"`,
        tx.amount,
        `"${tx.date}"`,
        `"${(tx.note || '').replace(/"/g, '""')}"`,
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cashflow_transaksi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExecuteClear = () => {
    onClearAll();
    setConfirmClear(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Menu & Ekspor Laporan
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Tutup menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {copySuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Ringkasan laporan berhasil disalin ke clipboard!</span>
            </div>
          )}

          {/* Opsi 1: Bagikan Ringkasan Laporan */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Laporan Keuangan
            </h3>
            <button
              type="button"
              onClick={handleShare}
              className="w-full p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-left flex items-center justify-between gap-3 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    Bagikan Ringkasan Laporan
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Kirim laporan {filterLabel} ke WhatsApp, Email, atau Catatan
                  </div>
                </div>
              </div>
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Opsi 2: Ekspor ke CSV / Spreadsheet */}
            <button
              type="button"
              onClick={handleDownloadCSV}
              className="w-full p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/50 hover:bg-teal-50/50 dark:hover:bg-teal-950/20 text-left flex items-center justify-between gap-3 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    Ekspor Seluruh Data (CSV)
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Unduh file CSV untuk dibuka di Excel atau Google Sheets
                  </div>
                </div>
              </div>
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Opsi 3: Kebijakan Privasi */}
          <div className="space-y-1.5 pt-2">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Legalitas & Bantuan
            </h3>
            <Link
              href="/privacy"
              onClick={onClose}
              className="w-full p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 text-left flex items-center justify-between gap-3 transition-colors block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    Kebijakan Privasi
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Baca transparansi pengolahan & keamanan data Anda
                  </div>
                </div>
              </div>
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Opsi 4: Hak Hapus Data (Clear Data) */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
              Zona Bahaya
            </h3>
            {!confirmClear ? (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="w-full p-3 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus Seluruh Data Transaksi (Reset)
              </button>
            ) : (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 space-y-2.5">
                <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">
                  Apakah Anda yakin ingin menghapus <strong>seluruh {transactions.length} transaksi</strong>? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="flex-1 py-2 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleExecuteClear}
                    className="flex-1 py-2 px-3 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-xs transition-colors"
                  >
                    Ya, Hapus Semua
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

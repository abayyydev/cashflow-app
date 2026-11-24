'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col pb-12">
      {/* Top Bar / Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30 shadow-xs">
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Aplikasi
          </Link>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Kebijakan Privasi
          </span>
        </div>
      </header>

      {/* Konten Kebijakan */}
      <main className="max-w-2xl w-full mx-auto px-4 py-6 space-y-6">
        {/* Judul & Status Update */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Privasi Aman & Lokal
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Kebijakan Privasi
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Terakhir diperbarui: 24 November 2026 • Aplikasi: Abayyydev Cashflow
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 pt-2 leading-relaxed">
            Privasi Anda adalah prioritas utama kami. Dokumen kebijakan privasi ini menjelaskan secara transparan bagaimana aplikasi <strong>Cash Flow (Abayyydev Cashflow)</strong> mengelola data Anda saat menggunakan aplikasi ini.
          </p>
        </div>

        {/* Bagian 1: Data yang Diproses */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">1</span>
            Data Apa yang Diproses?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Aplikasi ini hanya memproses data transaksi keuangan yang Anda masukkan secara sukarela, yang mencakup:
          </p>
          <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-300 space-y-1 pl-1">
            <li><strong>Tipe Transaksi:</strong> Pemasukan atau Pengeluaran.</li>
            <li><strong>Nominal:</strong> Jumlah nominal uang dalam satuan Rupiah.</li>
            <li><strong>Kategori Transaksi:</strong> Kategori pilihan atau kategori kustom yang Anda buat (contoh: Makanan, Gaji, Belanja).</li>
            <li><strong>Tanggal Transaksi:</strong> Waktu transaksi terjadi.</li>
            <li><strong>Catatan Opsional:</strong> Deskripsi atau catatan singkat mengenai transaksi yang Anda tulis.</li>
          </ul>
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-3 text-xs text-emerald-800 dark:text-emerald-300">
            Kami <strong>TIDAK</strong> mengumpulkan data pribadi sensitif seperti identitas KTP, nomor rekening bank, kartu kredit/debit, kata sandi perbankan, daftar kontak, lokasi GPS, maupun data biometrik.
          </div>
        </section>

        {/* Bagian 2: Tempat Data Disimpan */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">2</span>
            Di Mana Data Disimpan?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Seluruh data transaksi keuangan Anda disimpan <strong>100% secara lokal di perangkat Anda sendiri</strong> menggunakan penyimpanan lokal peramban (Web Storage / <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs text-emerald-600">localStorage</code> dengan kunci <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs text-emerald-600">cashflow-transactions</code>).
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Aplikasi ini tidak memiliki server database terpusat untuk menyimpan data keuangan Anda, tidak memiliki Server Actions, dan tidak mengirimkan catatan keuangan Anda ke cloud kami. Data Anda tetap berada di tangan Anda.
          </p>
        </section>

        {/* Bagian 3: Pembagian Data ke Pihak Ketiga */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">3</span>
            Apakah Data Dibagikan ke Pihak Ketiga?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <strong>TIDAK.</strong> Kami tidak pernah menjual, menyewakan, membagikan, atau memindahtangankan catatan keuangan Anda kepada pihak ketiga mana pun, termasuk jaringan periklanan, broker data, atau entitas komersial lainnya.
          </p>
        </section>

        {/* Bagian 4: Hal yang Perlu Diketahui / Keterbatasan Kode Sumber */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">4</span>
            Keterbukaan Mengenai Layanan Hosting
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Berdasarkan konfigurasi teknis kode sumber:
          </p>
          <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-300 space-y-1.5 pl-1">
            <li>
              Aplikasi ini dikonfigurasi untuk memuat aset web dari penyedia hosting cloud (<code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs">Vercel</code> di tautan <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs">https://cashflow-app-vert.vercel.app/</code>).
            </li>
            <li>
              Penyedia hosting (Vercel) secara standar dapat mencatat log teknis HTTP jaringan (seperti alamat IP, jenis perangkat/peramban, dan waktu akses) untuk tujuan stabilitas jaringan dan keamanan server web. <strong>Log teknis tersebut tidak memuat konten transaksi keuangan Anda</strong> karena data keuangan berada dalam <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs">localStorage</code> perangkat Anda.
            </li>
            <li>
              <em>Hal yang tidak bisa kami pastikan langsung dari kode repositori:</em> Kami tidak dapat memastikan jika pihak penyedia hosting di masa mendatang menerapkan konfigurasi analitik tingkat CDN atau skrip pelacak pihak ketiga di luar file sumber project ini tanpa sepengetahuan pengguna. Namun saat ini, tidak ada pustaka analitik pihak ketiga yang disematkan dalam kode aplikasi ini.
            </li>
          </ul>
        </section>

        {/* Bagian 5: Hak Pengguna & Penghapusan Data */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">5</span>
            Hak Pengguna & Penghapusan Data (Data Deletion)
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Anda memiliki kendali penuh atas seluruh data Anda:
          </p>
          <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-300 space-y-1.5 pl-1">
            <li><strong>Menghapus Transaksi Tertentu:</strong> Anda dapat menghapus transaksi kapan saja melalui tombol ikon tempat sampah di samping setiap item transaksi.</li>
            <li><strong>Menghapus Seluruh Data Transaksi:</strong> Anda dapat mereset dan menghapus seluruh catatan transaksi secara permanen melalui fitur menu <em>Ekspor & Pengaturan</em> di halaman utama aplikasi.</li>
            <li><strong>Menghapus Melalui Pengaturan Perangkat:</strong> Anda juga dapat menghapus seluruh data kapan saja melalui menu Android: <em>Pengaturan &gt; Aplikasi &gt; Abayyydev Cashflow &gt; Penyimpanan &gt; Hapus Data (Clear Data)</em> atau dengan mencopot pemasangan (uninstall) aplikasi.</li>
          </ul>
        </section>

        {/* Bagian 6: Penggunaan Offline */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">6</span>
            Dukungan Penggunaan Offline
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Karena data Anda tersimpan secara lokal, aplikasi ini tetap dapat digunakan untuk mencatat dan meninjau keuangan Anda meskipun perangkat Anda tidak terhubung ke jaringan internet (mode offline).
          </p>
        </section>

        {/* Bagian 7: Kontak Pengembang */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">7</span>
            Kontak Pengembang
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Jika Anda memiliki pertanyaan, saran, atau kekhawatiran terkait kebijakan privasi ini atau pengelolaan data pada aplikasi Cash Flow, silakan hubungi tim pengembang kami melalui:
          </p>
          <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Email Pengembang:</p>
              <a
                href="mailto:inovasiadigiatalacademy@gmail.com"
                className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                [inovasiadigiatalacademy@gmail.com]
              </a>
            </div>
          </div>
        </section>

        {/* Tombol Kembali di Bawah */}
        <div className="pt-2 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm shadow-md hover:bg-zinc-800 transition-colors"
          >
            Kembali ke Aplikasi Utama
          </Link>
        </div>
      </main>
    </div>
  );
}

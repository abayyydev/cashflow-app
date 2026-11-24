'use client';

import React, { useState, useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot(): boolean {
  if (typeof navigator === 'undefined') return true;
  return navigator.onLine;
}

function getServerSnapshot(): boolean {
  return true;
}

export default function OfflineIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isOnline || isDismissed) {
    return null;
  }

  return (
    <div className="bg-amber-500 text-white px-4 py-2.5 shadow-md flex items-center justify-between gap-3 text-xs sm:text-sm animate-in slide-in-from-top duration-200">
      <div className="flex items-center gap-2 min-w-0">
        <svg className="w-5 h-5 shrink-0 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 4.243a9 9 0 01-2.828-5.657m0 0l2.828-2.829m-2.828 2.829L3 3"
          />
        </svg>
        <span className="truncate">
          <strong>Mode Offline:</strong> Anda tidak terhubung ke internet. Semua data tetap tersimpan aman di perangkat.
        </span>
      </div>
      <button
        type="button"
        onClick={() => setIsDismissed(true)}
        className="px-2 py-1 rounded bg-amber-600 hover:bg-amber-700 text-[11px] font-semibold shrink-0 cursor-pointer transition-colors"
        aria-label="Tutup pemberitahuan offline"
      >
        Tutup
      </button>
    </div>
  );
}

'use client';

import { useSyncExternalStore, useCallback } from 'react';
import { Transaction, TransactionFormData } from '@/types/cashflow';

const STORAGE_KEY = 'cashflow-transactions';

const emptySubscribe = () => () => {};

export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function dispatchStorageEvent() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cashflow-updated'));
  }
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('cashflow-updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('cashflow-updated', callback);
  };
}

function getSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  return localStorage.getItem(STORAGE_KEY) || '[]';
}

function getServerSnapshot(): string {
  return '[]';
}

export function useCashflow() {
  const isLoaded = useIsMounted();
  const rawData = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  let transactions: Transaction[] = [];
  try {
    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed)) {
      transactions = parsed;
    }
  } catch (error) {
    console.error('Gagal parsing cashflow data:', error);
  }

  const saveToStorage = useCallback((items: Transaction[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      dispatchStorageEvent();
    } catch (error) {
      console.error('Gagal menyimpan data ke localStorage:', error);
    }
  }, []);

  const addTransaction = useCallback(
    (formData: TransactionFormData) => {
      const newTransaction: Transaction = {
        ...formData,
        id:
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `tx-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        createdAt: Date.now(),
      };

      let current: Transaction[] = [];
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) current = JSON.parse(stored);
      } catch {}
      const updated = [newTransaction, ...current];
      saveToStorage(updated);
    },
    [saveToStorage]
  );

  const updateTransaction = useCallback(
    (id: string, formData: TransactionFormData) => {
      let current: Transaction[] = [];
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) current = JSON.parse(stored);
      } catch {}
      const updated = current.map((item) =>
        item.id === id ? { ...item, ...formData } : item
      );
      saveToStorage(updated);
    },
    [saveToStorage]
  );

  const deleteTransaction = useCallback(
    (id: string) => {
      let current: Transaction[] = [];
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) current = JSON.parse(stored);
      } catch {}
      const updated = current.filter((item) => item.id !== id);
      saveToStorage(updated);
    },
    [saveToStorage]
  );

  return {
    transactions,
    isLoaded,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}

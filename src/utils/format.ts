export const INCOME_CATEGORIES = [
  'Gaji',
  'Usaha / Bisnis',
  'Bonus',
  'Investasi',
  'Hadiah',
  'Lainnya',
];

export const EXPENSE_CATEGORIES = [
  'Makanan & Minuman',
  'Transportasi',
  'Belanja',
  'Tagihan & Utilitas',
  'Hiburan',
  'Kesehatan',
  'Pendidikan',
  'Keluarga',
  'Lainnya',
];

export function formatRupiah(amount: number): string {
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString('id-ID');
  return `Rp ${formatted}`;
}

export function formatDateIndonesian(dateString: string): string {
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    if (!year || !month || !day) return dateString;

    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('id-ID', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatMonthYear(yearMonthString: string): string {
  try {
    const [year, month] = yearMonthString.split('-').map(Number);
    if (!year || !month) return yearMonthString;

    const date = new Date(year, month - 1, 1);
    return date.toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return yearMonthString;
  }
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getCurrentYearMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

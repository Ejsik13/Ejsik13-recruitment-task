import type { Order } from "../types";

export const revenue = (o: Order) => o.quantity * o.unitPrice;

export function formatCurrency(value: number, currency = "EUR", digits = 2) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function groupSum<T>(
  items: T[],
  keyFn: (item: T) => string,
  valueFn: (item: T) => number,
): Array<{ key: string; value: number }> {
  const m = new Map<string, number>();
  for (const it of items) {
    const k = keyFn(it);
    m.set(k, (m.get(k) ?? 0) + valueFn(it));
  }
  return [...m.entries()]
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value);
}

export function groupStats<T>(
  items: T[],
  keyFn: (item: T) => string,
  valueFn: (item: T) => number,
): Array<{ key: string; sum: number; count: number; avg: number }> {
  const m = new Map<string, { sum: number; count: number }>();
  for (const it of items) {
    const k = keyFn(it);
    const prev = m.get(k) ?? { sum: 0, count: 0 };
    m.set(k, { sum: prev.sum + valueFn(it), count: prev.count + 1 });
  }
  return [...m.entries()]
    .map(([key, v]) => ({
      key,
      sum: v.sum,
      count: v.count,
      avg: v.sum / v.count,
    }))
    .sort((a, b) => b.sum - a.sum);
}

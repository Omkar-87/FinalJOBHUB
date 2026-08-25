import type { Job } from '@/types';

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function formatSalary(job: Pick<Job, 'salaryMin' | 'salaryMax' | 'currency' | 'salaryPeriod'>): string {
  const symbol = job.currency === 'INR' ? '₹' : '$';
  if (job.salaryPeriod === 'LPA') {
    return `${symbol}${job.salaryMin}–${job.salaryMax} LPA`;
  }
  const fmt = (n: number) => n.toLocaleString('en-IN');
  return `${symbol}${fmt(job.salaryMin)}–${fmt(job.salaryMax)}/${job.salaryPeriod}`;
}

export function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');
}

export function daysUntil(iso?: string): number | null {
  if (!iso) return null;
  const diffMs = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diffMs / 86400000));
}

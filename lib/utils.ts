export function formatDate(date: Date | string): string {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return d.toLocaleDateString('sv-SE', options);
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function isValidOlId(id: string): boolean {
  return /^[a-zA-Z0-9\-_]+$/.test(id) && id.length > 0;
}

export function cn(...classes: (string | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

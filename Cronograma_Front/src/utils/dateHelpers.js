export function formatDateKey(date) {
  return date.toISOString().split('T')[0];
}

export const formatEndDate = (dateString: string): string => {
  const date = new Date(dateString)

  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}/${String(date.getDate()).padStart(2, '0')} ${String(
    date.getUTCHours(),
  ).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}:${String(
    date.getUTCSeconds(),
  ).padStart(2, '0')}(${Intl.DateTimeFormat('ja-JP', {
    weekday: 'narrow',
  }).format(date)})`
}

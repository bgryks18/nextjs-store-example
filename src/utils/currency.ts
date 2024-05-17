export const getCurrency = (
  value: number,
  opts: Intl.NumberFormatOptions = {}
) => {
  return Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'USD',
    ...opts,
  }).format(value)
}

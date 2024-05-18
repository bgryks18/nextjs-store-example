export const getCurrency = (
  value: number,
  opts: Intl.NumberFormatOptions = {},
  country: string = 'US'
) => {
  return Intl.NumberFormat(country, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'USD',
    ...opts,
  }).format(value)
}

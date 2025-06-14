/**
 * Tool used to format a number to US currency.
 */
const currencyFormatter = Intl.NumberFormat(
    'en-US',
    {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    }
)

export default currencyFormatter;
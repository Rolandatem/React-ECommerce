/**
 * Awaitable delay.
 * @param time Number of milliseconds to wait.
 */
export const delay = (time: number) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * Tool used to format a number to US currency.
 */
export const currencyFormatter = Intl.NumberFormat(
    'en-US',
    {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    }
)
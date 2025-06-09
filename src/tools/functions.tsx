export const delay = (time: number) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const currencyFormatter = Intl.NumberFormat(
    'en-US',
    {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    }
)
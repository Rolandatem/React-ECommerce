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

/**
 * Creates a pre-set URLSearchParams object with testable options.
 * @param withDelay Indicates whether to use the 2 second latency test.
 * @param withError Indicates whether to use the API exception test.
 * @returns 
 */
export const queryString = (
    withDelay: boolean = false,
    withError: boolean = false): URLSearchParams => {
        const returnTool = new URLSearchParams();

        if (withDelay) { returnTool.append('withDelay', withDelay.toString()); }
        if (withError) { returnTool.append('withError', withError.toString()); }

        return returnTool;
    }
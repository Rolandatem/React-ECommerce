import memoize from 'lodash.memoize';
import type ITestOptions from '../interfaces/ITestOptions';

/**
 * Creates a pre-set URLSearchParams object with testable options.
 * @param options Indicates which API test options to use.
 */
const queryString = memoize((
    options: ITestOptions): URLSearchParams => {
    const params = new URLSearchParams();

    if (options.withDelay) { params.append('withDelay', options.withDelay.toString()); }
    if (options.withError) { params.append('withError', options.withError.toString()); }

    return params;
},
    //-- Use a stable JSON key
    (options: ITestOptions = {}) => {
        return JSON.stringify({
            withDelay: !!options.withDelay,
            withError: !!options.withError
        })
    });

export default queryString;
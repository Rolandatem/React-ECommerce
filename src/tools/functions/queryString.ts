/**
 * Creates a pre-set URLSearchParams object with testable options.
 * @param withDelay Indicates whether to use the 2 second latency test.
 * @param withError Indicates whether to use the API exception test.
 * @returns 
 */
const queryString = (
    withDelay: boolean = false,
    withError: boolean = false): URLSearchParams => {
    const returnTool = new URLSearchParams();

    if (withDelay) { returnTool.append('withDelay', withDelay.toString()); }
    if (withError) { returnTool.append('withError', withError.toString()); }

    return returnTool;
}

export default queryString;
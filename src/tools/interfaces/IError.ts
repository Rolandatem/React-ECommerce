/** Basic error response from an API calling tool. */
export default interface IError {
    /** Indicates whether an error has occurred. */
    hasError: boolean,

    /** Friendly message suggested from the API caller tool. */
    friendlyErrorMessage?: string
}
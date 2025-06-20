import type Error404 from "../exceptions/Error404"

type KnownErrorTypes = typeof Error404 | typeof TypeError

/**
 * Describes the structure for indicating an error that occurs when
 * using the API.
 */
export default interface IFriendlyError {
    /** Indicates that an error exists. */
    hasError: boolean,
    /** Friendly error to display to the user. */
    friendlyErrorMessage?: string,
    /** Type of the error that occured. */
    errorType?: KnownErrorTypes
}
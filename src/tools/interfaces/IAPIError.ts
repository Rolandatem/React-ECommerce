/** 
 * Exception details returned from the API when an error occurs. 
 * Values may only be displayed if in Production mode.*/
export default interface IAPIError {
    /** Exception message. */
    exceptionMessage: string,

    /** Stack trace for the exception on the API. */
    stackTrace: string
}
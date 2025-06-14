/** Defines the structure for the error indicator. */
export default interface IErrorIndicator {
    /** Message to display to user. */
    message?: string,

    /** Position for busy indicator. Valid values are 'absolute' and 'fixed' */
    position?: 'absolute' | 'fixed'
}
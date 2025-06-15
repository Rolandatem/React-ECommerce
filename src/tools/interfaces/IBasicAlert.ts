/** Describes the structure for a basic alert. */
export default interface IBasicAlert {
    /** Indicates whether the alert should show. */
    show: boolean,
    /** Header for the alert. */
    header: string,
    /** Message to display in the alert. */
    message: string
}
/** Defines structure for the busy indicator. */
export default interface IBusyIndicator {
    /** Text to display in busy indicator. */
    label?: string,

    /** Position for busy indicator. Valid values are 'absolute' and 'fixed' */
    position?: 'absolute' | 'fixed'
}
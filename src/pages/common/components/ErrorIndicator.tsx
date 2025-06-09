interface IErrorIndicator {
    /** Message to display to user. */
    message?: string,

    /** Position for busy indicator. Valid values are 'absolute' and 'fixed' */
    position?: string
}

/**
 * Display an error indicator with a transparent background.
 * 
 * props include:
 * @param message Message to display to user. Default: 'Sorry we're unable to display this.'
 * @param position CSS position to use for the indicator. Valid values are 'absolute' or 'fixed'.
 */
const ErrorIndicator = ({
    message = 'Sorry, we\'re unable to display this.',
    position = 'absolute'}: IErrorIndicator) => {

    //===========================================================================================================================
    if (position !== 'absolute' && position !== 'fixed') {
        throw new Error('Valid values for ErrorIndicator position are \'absolute\' and \'fixed\'');
    }
    const errorIndicatorPosition = position == 'absolute'
        ? 'position-absolute'
        : 'position-fixed';
    
    //===========================================================================================================================
    return (
        <div className={`${errorIndicatorPosition} z-3 top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark-transparent`}>
            <div className="bg-white px-5 py-3 rounded border border-dark d-flex align-items-center">
                <span className="pi pi-exclamation-triangle text-danger fs-md-4 fw-bold"></span>
                <span className="text-dark ms-2 fs-md-5 fw-bold">{message}</span>
            </div>
        </div>
    )
}

export default ErrorIndicator;
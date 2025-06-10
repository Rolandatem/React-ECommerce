import { Spinner } from "react-bootstrap";

interface IBusyIndicator {
    /** Text to display in busy indicator. */
    label?: string,

    /** Position for busy indicator. Valid values are 'absolute' and 'fixed' */
    position?: 'absolute' | 'fixed'
}

/**
 * Displays an indicator with a transparent background.
 * 
 * props include:
 * @param label Label to display to the user. Default: 'Loading...'
 * @param position CSS position to use for the indicator. Valid values are 'absolute' or 'fixed'.
 */
const BusyIndicator = ({
    label = 'Loading...',
    position = 'absolute'}: IBusyIndicator) => {

    //===========================================================================================================================
    if (position !== 'absolute' && position !== 'fixed') {
        throw new Error('Valid values for BusyIndicator position are \'absolute\' or \'fixed\'');
    }
    const busyIndicatorPosition = position == 'absolute'
        ? 'position-absolute'
        : 'position-fixed';

    //===========================================================================================================================
    return(
        <div className={`${busyIndicatorPosition} z-3 top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark-transparent-subtle`}>
            <div className="bg-white px-5 py-3 rounded border border-dark d-flex align-items-center">
                <Spinner animation="border" variant="dark" />
                <span className="text-dark ms-2 fs-5 fw-bold">{label}</span>
            </div>
        </div>
    )
}

export default BusyIndicator;
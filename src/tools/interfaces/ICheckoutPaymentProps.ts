import type ICheckoutPayment from "./ICheckoutPayment";

/** Describes the structure of the checkout payments component props */
export default interface ICheckoutPaymentProps {
    /** Event handler to move the user to the previous wizard step */
    onMovePrevProcess: () => void,
    /** Payment information stateful object */
    checkoutPayment: ICheckoutPayment,
    /** Checkout payment setter function */
    setCheckoutPayment: React.Dispatch<React.SetStateAction<ICheckoutPayment>>,
    /** Checkout validity check setter function */
    setCheckoutPaymentIsValid: React.Dispatch<React.SetStateAction<boolean>>
}
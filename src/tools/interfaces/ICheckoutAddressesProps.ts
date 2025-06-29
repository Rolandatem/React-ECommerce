import type ICheckoutAddresses from "./ICheckoutAddresses"

/** Desribes the structure for the checkout address component props. */
export default interface ICheckoutAddressesProps {
    /** Navigates the user to the previous step in the wizard. */
    onMovePrevProcess: () => void,
    /** Navigates the user to the next step in the wizard. */
    onMoveNextProcess: () => void
    /** Checkout address information */
    checkoutAddresses: ICheckoutAddresses,
    /** Setter for the checkoutAddresses variable. */
    setCheckoutAddresses: React.Dispatch<React.SetStateAction<ICheckoutAddresses>>,
    /** Setter for the setCheckoutAddressesIsValid validity stateful variable. */
    setCheckoutAddressesIsValid: React.Dispatch<React.SetStateAction<boolean>>
}
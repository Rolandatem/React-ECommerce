import type IShoppingCart from "./dtos/IShoppingCart";

/** Describes the structure of the checkout summary component props */
export default interface ICheckoutSummaryProps {
    /** Shopping Cart */
    cart: IShoppingCart | undefined,
    /** Flag indicating whether the use can complete the checkout. */
    canCheckout: boolean,
    /** Complete checkout event handler */
    onCompleteCheckout: () => void,
    /** Working flag for the order detail */
    loadingOrderDetail: boolean
}
import type ICheckoutAddress from "./ICheckoutAddress";

/** Describes the structure of the billing/shipping checkout component data. */
export default interface ICheckoutAddresses {
    /** Shipping Address info */
    shipping: ICheckoutAddress,
    /** Billing Address info */
    billing: ICheckoutAddress,
    /** Billing Same As Shipping */
    billingIsSameAsShipping: boolean
}
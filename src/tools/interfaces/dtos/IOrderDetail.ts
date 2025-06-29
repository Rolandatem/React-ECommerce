import type IShoppingCart from "./IShoppingCart"

/** Describes the structure of the Order Detail DTO */
export default interface IOrderDetail {
    /** DB ID **/
    id: number,
    /** Shopping Cart Id */
    shoppingCartId: number,
    /** Shopping Cart */
    shoppingCart: IShoppingCart,
    /** Order Key */
    orderKey: string,
    /** Is Complete flag. */
    isComplete: boolean,

    /** Shipping Information */
    shippingEmail: string,
    shippingFirstName: string,
    shippingLastName?: string,
    shippingAddress: string,
    shippingSuiteApt?: string,
    shippingCity: string,
    shippingState: string,
    shippingZipCode: string,
    shippingPhone: string,

    /** Billing Information */
    billingEmail: string,
    billingFirstName: string,
    billingLastName?: string,
    billingAddress: string,
    billingSuiteApt?: string,
    billingCity: string,
    billingState: string,
    billingZipCode: string,
    billingPhone: string,

    /** Payment Information */
    cardNumber: string,
    nameOnCard: string,
    expirationDate: string,
    cvv: string
}
/** Describes the structure of the outbout DTO for completing the checkout. */
export default interface IOrderDetailOut {
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
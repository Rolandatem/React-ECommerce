/** Describes the structure of the checkout payment wizard screen. */
export default interface ICheckoutPayment {
    /** Card Number */
    cardNumber: string,
    /** Name on card */
    nameOnCard: string,
    /** Expiration Date */
    expirationDate: string,
    /** CVV */
    cvv: string
}

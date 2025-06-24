/** Describes the structure of the shopping cart totals. */
export default interface ICartTotals {
    /** Sum of all lineitems original price. */
    cost: number,
    /** Sum of all lineitems sale price. */
    subTotal: number,
    /** Savings between the total original price and total sale price. */
    savings: number,
    /** Taxes off the sub total. */
    taxes: number,
    /** Final cost the cart */
    cartTotal: number
}
import type ITag from "../ITag";

/** Describes the structure of the outbout Shopping Cart Line Item DTO */
export default interface IShoppingCartLineItemOut {
    /** Product ID that color belongs to. */
    productId: number,
    /** Quantity of item to add. */
    quantity: number,
    /** Sale price at time of adding to cart. */
    salePriceAtSale: number,
    /** Original Price at time of adding to cart. */
    originalPriceAtSale: number,
    /** Total sale price at time of adding to cart. */
    totalSalePrice: number,
    /** Total original price at time of adding to cart. */
    totalOriginalPrice: number,
    /** Savings percentag at the time of adding to cart. */
    savingsPercentageAtSale: number,
    /** Color tag of item to add. */
    tag: ITag
}
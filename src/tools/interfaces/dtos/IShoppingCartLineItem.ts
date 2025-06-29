import type IShoppingCartProduct from "./IShoppingCartProduct";
import type ITag from "./ITag";

/** Describes the structure of the Shopping Cart Line Item DTO */
export default interface IShoppingCartLineItem {
    /** DB ID */
    id: number,
    /** Quantity */
    quantity: number,
    /** Sale Price when added to cart/at sale */
    salePriceAtSale: number,
    /** Original Price when added to cart/at sale */
    originalPriceAtSale: number,
    /** Total Sale price when added to cart/at sale */
    totalSalePrice: number,
    /** Total Original Price when added to cart/at sale */
    totalOriginalPrice: number,
    /** Sales Percentage when added to cart/at sale */
    savingsPercentageAtSale: number,
    /** Product Info */
    product: IShoppingCartProduct,
    /** Color Tag for item. */
    tag: ITag
}
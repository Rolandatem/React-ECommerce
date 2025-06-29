import type IProductHighlight from "./IProductHighlight"
import type IProductImage from "./IProductImage"
import type IProductTag from "./IProductTag"

/** Defines the structure of a Product. */
export default interface IProduct {
    /** DB ID */
    id: number,
    //** Product SKU */
    sku: string,
    /** Product Name */
    productName: string,
    /** Product Image URL */
    imageUrl: string,
    /** Star count out of 5 */
    stars: number,
    /** Number of reviews for the product. */
    reviews: number,
    /** Number of colors available for the product. */
    colorCount: number,
    /** Brief product description. */
    description: string,
    /** Site sale price. */
    salePrice: number,
    /** Original price. */
    originalPrice: number,
    /** Whole number representing the savings. */
    savingsPercentage: number,
    /** ID of the product category that this belongs to. */
    categoryId: number
    /** Product Tags. */
    productTags: IProductTag[]
    /** Product Highlights */
    productHighlights: IProductHighlight[]
    /** Product Images */
    productImages: IProductImage[]
}
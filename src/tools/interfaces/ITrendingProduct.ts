import type ShipType from "../enums/ShipType";

/** DTO object containing product information relative to trending products information. */
export default interface ITrendingProduct {
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
    /** Shipping type */
    shipType: ShipType
}
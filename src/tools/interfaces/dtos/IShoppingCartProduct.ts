/** Describes the structure of the light-weight Shopping Cart Product */
export default interface IShoppingCartProduct {
    /** DB ID */
    id: number,
    /** Product Name */
    productName: string,
    /** Product SKU */
    sku: string
}
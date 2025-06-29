import type IProduct from "./dtos/IProduct";
import type ITag from "./dtos/ITag";

/** Describes the structure for the props of the AddToCart product page component. */
export default interface IAddToCart {
    /** Product */
    product: IProduct,
    /** Selected Color */
    selectedColor: ITag | undefined
    /** Add to cart function from parent. */
    //onAddToCart: (lineItem: ILineItem) => void
    onAddToCart: (quantity: number) => Promise<void>
}
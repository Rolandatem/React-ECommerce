import type IProduct from "./dtos/IProduct";
import type IComponentClass from "./IComponentClass";

/** Defines the structure for the trending product card component. */
export default interface IProductCard extends IComponentClass {
    /** Product to display in card. */
    product: IProduct
}
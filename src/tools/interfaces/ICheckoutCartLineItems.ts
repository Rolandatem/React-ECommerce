import type IShoppingCart from "./dtos/IShoppingCart";
import type IShoppingCartLineItem from "./dtos/IShoppingCartLineItem";

/** Describes the structure of the check out cart line items component props. */
export default interface ICheckoutCartLineItems {
    /** Shopping cart */
    cart: IShoppingCart | undefined
    /** Event handler to move to the next process in the wizard */
    onMoveNextProcess?: () => void,
    /** Delete line item event handler. */
    onDeleteLineItem: (lineItem: IShoppingCartLineItem) => Promise<void>
    /** Update lineitem event handler. */
    onUpdateLineItem: (lineItem: IShoppingCartLineItem, newQuantity: number) => Promise<void>
}
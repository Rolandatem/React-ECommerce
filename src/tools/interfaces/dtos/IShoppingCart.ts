import type IShoppingCartLineItem from "./IShoppingCartLineItem";

/** Describes the structure of the Shopping Cart DTO */
export default interface IShoppingCart {
    /** DB ID */
    id: number,
    /** Cart GUID Key */
    cartKey: string,
    /** Line items */
    lineItems: IShoppingCartLineItem[]
}
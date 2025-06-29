import type IShoppingCartLineItem from "@/tools/interfaces/dtos/IShoppingCartLineItem";
import type ICheckoutCartLineItems from "@/tools/interfaces/ICheckoutCartLineItems";
import { useEffect, useState } from "react";

/** Hook for commonly used functionality between the desktop and mobile checkout cart line items components. */
const useCartLineItems = ({cart, onDeleteLineItem, onUpdateLineItem}: ICheckoutCartLineItems) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [lineItemToDelete, setLineItemToDelete] = useState<IShoppingCartLineItem>();
    const [modifyingLineItem, setModifyingLineItem] = useState<boolean>(false);
    const [localQuantity, setLocalQuantity] = useState<{[lineItemId: number]: string}>({});

    //===========================================================================================================================
    /**
     * Sets up an "are you sure?" modal for deleting a cart line item.
     * Temporarily saves the line item so a decision action later can reference.
     * @param lineItem The line item requested to delete.
     */
    const onRequestDeleteLineItem = (lineItem: IShoppingCartLineItem) => {
        setLineItemToDelete(lineItem);
        setShowDeleteModal(true);
    }

    //===========================================================================================================================
    /** Sets up a busy indicator while running the parent delete line item function. */
    const onDeleteLineItemApproved = async() => {
        setModifyingLineItem(true);

        try {
            await onDeleteLineItem(lineItemToDelete!);
            setShowDeleteModal(false);
        }
        finally {
            setModifyingLineItem(false);
        }
    }

    //===========================================================================================================================
    /**
     * Line item quantity input change handler. Intially accepts an empty value (in case
     * the user enters a non-character key, like backspace). If so, sets the value to an
     * empty string and returns the function. Otherwas a values keypress is evaluted and
     * rejects any input that is not a positive integer.
     * @param e React change event.
     * @param lineItem Line item that the quantity belongs to.
     */
    const onQuantityChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        lineItem: IShoppingCartLineItem) => {

        const val = e.target.value;

        if (val === '') {
            setLocalQuantity(prev => ({
                ...prev,
                [lineItem.id]: ''
            }));
            return;
        }

        if (/^\d+$/.test(val) === false) { return; }

        setLocalQuantity(prev => ({
            ...prev,
            [lineItem.id]: val
        }));
    }

    //===========================================================================================================================
    /**
     * Line item quantity blur event handler. This checks the validates the temporary quantity
     * value, if fail then sets to 1. Then check to make sure the temp value is not the
     * same value as the original line item quantity (so we only post the update to the API
     * if there is a differing value). No need to update the line item quantity as the cart
     * will be updated on update filtering back down.
     * @param lineItem Line item that the quantity belongs to.
     */
    const onQuantityBlur = (
        lineItem: IShoppingCartLineItem) => {

        const newVal = localQuantity[lineItem.id] ?? undefined;

        if (!newVal || newVal.trim() === '' || parseInt(newVal) < 1) {
            setLocalQuantity(prev => ({
                ...prev,
                [lineItem.id]: "1"
            }));
        }

        if (newVal !== lineItem.quantity.toString()) {
            onUpdateLineItem(lineItem, parseInt(newVal));
        }
    }

    //===========================================================================================================================
    /**
     * Computes the url for the product main image by using the sku.
     * @param sku Product SKU.
     * @returns Valid image url for the product.
     */
    const computeMainProductImage = (sku: string) => {
        return `/imagetypes/product/${sku}.webp`;
    }

    //===========================================================================================================================
    /**
     * Computes the url for the color swatch used in t he line item.
     * @param lineItem Line item that the color swatch is for.
     * @returns Valid image url for the color swatch.
     */
    const computeSwatchUrl = (lineItem: IShoppingCartLineItem) => {
        const characterCleaner = /[^a-zA-Z0-9\- ]/g; //--Only alphanumeric, dash, and space allowed.
        return `/imagetypes/swatch/${lineItem.product.sku}-${lineItem.tag.name.replace(characterCleaner, '')}.webp`;
    }

    //===========================================================================================================================
    /** Watches for updates on the cart and if found rebuilds the temporary quantity mapping. */
    useEffect(() => {
        if (!cart) { return; }

        const newQuantityMapping: {[lineItemId: number]: string} = {};
        cart.lineItems.forEach(li => newQuantityMapping[li.id] = li.quantity.toString());
        setLocalQuantity(newQuantityMapping);
    }, [cart])

    //===========================================================================================================================
    return {
        localQuantity,
        modifyingLineItem,
        showDeleteModal,
        lineItemToDelete,
        computeMainProductImage,
        computeSwatchUrl,
        setShowDeleteModal,
        onQuantityChange,
        onQuantityBlur,
        onRequestDeleteLineItem,
        onDeleteLineItemApproved
    }
}

export default useCartLineItems;
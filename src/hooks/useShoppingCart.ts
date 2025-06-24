import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import Error404 from "@/tools/exceptions/Error404";
import asFriendlyError from "@/tools/functions/asFriendlyError";
import queryString from "@/tools/functions/queryString";
import type IShoppingCartLineItemOut from "@/tools/interfaces/dtos/outbound/IShippingCartLineItemOut";
import type IFriendlyError from "@/tools/interfaces/IFriendlyError";
import type ITestOptions from "@/tools/interfaces/ITestOptions"
import { useCallback, useContext, useState } from "react";
import useCookies from "./useCookies";
import type IShoppingCart from "@/tools/interfaces/dtos/IShoppingCart";

/** Hook for the Shopping Cart API Endpoint. */
const useShoppingCart = (
    /** Indicates which API test options to use. */
    options: ITestOptions = { withDelay: false, withError: false }) => {

    //===========================================================================================================================
    const siteSettings = useContext(SiteSettingsContext);
    const query = queryString(options);
    const [cart, setCart] = useState<IShoppingCart | undefined>(undefined);
    const [loadingCart, setLoadingCart] = useState<boolean>(false);
    const [cartError, setCartError] = useState<IFriendlyError>({hasError: false});
    const { getCartKey, setCartKey } = useCookies();

    //===========================================================================================================================
    /** Gets a shopping cart from the API that matches the GUID key specified. */
    const getShoppingCart = useCallback(async () => {

        setLoadingCart(true);
        setCartError({hasError: false});
        try {
            const cartKey = getCartKey();
            if (cartKey === undefined) { throw new Error('There is currently no shopping cart.'); }
            
            const endpoint = `${siteSettings?.webAPIUrl}/shoppingcart?${query.toString()}`;
            const response = await fetch(endpoint, {
                credentials: 'include'
            });

            if (response.status === 404) { throw new Error404(`No cart found with cart key: ${cartKey}`); }
            if (response.ok === false) { throw new Error(`Failed to fetch a shopping cart with the cart key: ${cartKey}`); }

            const data = await response.json();
            setCart(data);
        } catch (error) {
            setCartError(asFriendlyError(error, `Sorry, we couldn't find a shopping cart.`));
        } finally {
            setLoadingCart(false);
        }
    }, [getCartKey, query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    /** Attempts to add a line item to a cart. If the cart does not exist on the server, it will create a new one. */
    const addItemToCart = useCallback(
        /** Cart line item data to send to the API to attach to a cart. */
        async(lineItem: IShoppingCartLineItemOut): Promise<IFriendlyError> => {
        
        setLoadingCart(true);
        try {
            const endpoint = `${siteSettings?.webAPIUrl}/shoppingcart?${query.toString()}`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', //--For cookie.
                body: JSON.stringify(lineItem)
            });

            if (response.ok === false) { throw new Error(`Failed to add line item to cart.`); }

            const data: IShoppingCart = await response.json();
            await setCartKey(data.cartKey);
            setCart(data);
            return {hasError: false};
        } catch (error) {
            return asFriendlyError(error, `Sorry, we are having trouble adding the item to the cart.`);
        } finally {
            setLoadingCart(false);
        }
    }, [query, setCartKey, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    const updateLineItem = useCallback(async(
        /** Line item update contents, in this demo really only quantity. */
        lineItem: IShoppingCartLineItemOut): Promise<IFriendlyError> => {
        
        setLoadingCart(true);
        try {
            const endpoint = `${siteSettings?.webAPIUrl}/shoppingcart/lineitem?${query.toString()}`;
            const response = await fetch(endpoint, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(lineItem)
            });

            if (response.ok === false) { throw new Error('Failed to update line item in cart.'); }

            const data: IShoppingCart = await response.json();
            setCart(data);
            return {hasError: false}
        } catch (error) {
            return asFriendlyError(error, `Sorry, we're having trouble updating the line item in the cart.`);
        } finally {
            setLoadingCart(false);
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    const removeLineItem = useCallback(async(
        /** Line item to remove. */
        lineItemId: number): Promise<IFriendlyError> => {

        try {
            const endpoint = `${siteSettings?.webAPIUrl}/shoppingcart/lineitem?${query.toString()}`;
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(lineItemId)
            });

            if (response.ok === false) { throw new Error('Failed to delete the line item in the cart.'); }

            setCart(prev => (prev
                ? {
                    ...prev, 
                    lineItems: prev?.lineItems.filter(li => li.id !== lineItemId)
                } : prev));

            return {hasError: false};
        } catch (error) {
            return asFriendlyError(error, `Sorry, we're having trouble removing the line item.`)
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    return {
        cart,
        loadingCart,
        cartError,
        getShoppingCart,
        addItemToCart,
        updateLineItem,
        removeLineItem
    }
}

export default useShoppingCart;
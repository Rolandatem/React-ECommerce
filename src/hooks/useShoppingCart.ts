import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import asFriendlyError from "@/tools/functions/asFriendlyError";
import queryString from "@/tools/functions/queryString";
import type IShoppingCartLineItemOut from "@/tools/interfaces/dtos/outbound/IShippingCartLineItemOut";
import type IFriendlyError from "@/tools/interfaces/IFriendlyError";
import type ITestOptions from "@/tools/interfaces/ITestOptions"
import { useCallback, useContext, useState } from "react";
import useCookies from "./useCookies";
import type IShoppingCart from "@/tools/interfaces/dtos/IShoppingCart";
import type IOrderDetail from "@/tools/interfaces/dtos/IOrderDetail";
import type ICheckoutAddress from "@/tools/interfaces/ICheckoutAddress";
import type ICheckoutPayment from "@/tools/interfaces/ICheckoutPayment";
import type IOrderDetailOut from "@/tools/interfaces/dtos/outbound/IOrderDetailOut";
import Error404 from "@/tools/exceptions/Error404";
import inFetch from "@/tools/functions/inFetch";

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
    const [orderDetail, setOrderDetail] = useState<IOrderDetail>();
    const [loadingOrderDetail, setLoadingOrderDetail] = useState<boolean>(false);
    const [orderDetailError, setOrderDetailError] = useState<IFriendlyError>({hasError: false});

    //===========================================================================================================================
    /** Gets a shopping cart from the API that matches the GUID key specified. */
    const getShoppingCart = useCallback(async () => {

        setLoadingCart(true);
        setCartError({hasError: false});
        try {
            const cartKey = await getCartKey();
            if (cartKey === undefined) { throw new Error('There is currently no shopping cart.'); }
            
            const endpoint = `${siteSettings?.webAPIUrl}/shoppingcart/${cartKey}?${query.toString()}`;
            const response = await inFetch(endpoint);

            if (response.ok === false) { throw new Error(`Failed to fetch a shopping cart with the cart key: ${cartKey}`); }

            if (response.headers.get('content-type')?.includes('application/json')) {
                const data = await response.json();
                setCart(data);
            } else {
                setCart(undefined);
            }

        } catch (error) {
            setCartError(asFriendlyError(error, `Sorry, we couldn't find a shopping cart.`));
        } finally {
            setLoadingCart(false);
        }
    }, [getCartKey, query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    /** Gets an order detail from the API. */
    const getOrderDetail = useCallback(async() => {
        setLoadingOrderDetail(true);
        setOrderDetailError({hasError: false});
        try {
            const cartKey = await getCartKey();

            if (cartKey === undefined) { throw new Error404("Custom does not have a cart."); }

            const endpoint = `${siteSettings?.webAPIUrl}/shoppingcart/${cartKey}/order?${query.toString()}`;
            const response = await inFetch(endpoint);

            if (response.ok === false) { throw new Error('Failed to load order detail.'); }

            const data = response.headers.get('content-type')?.includes('application/json')
                ? await response.json()
                : undefined;

            if (data === undefined) { return false; }
            setOrderDetail(data);
            return true;
        } catch (error) {
            setOrderDetailError(asFriendlyError(error, `Failed to load order details.`));
            return false;
        } finally {
            setLoadingOrderDetail(false);
        }
    }, [getCartKey, query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    /** Creates a new cart through the API. */
    const createCart = useCallback(async() => {
        const endpoint = `${siteSettings?.webAPIUrl}/shoppingcart?${query.toString()}`;
        const response = await inFetch(endpoint, { method: 'post' });

        if (response.ok === false) { throw new Error('Failed to create a new cart.'); }

        await setCartKey(await response.text());
    }, [query, setCartKey, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    /** Attempts to add a line item to a cart. If the cart does not exist on the server, it will create a new one. */
    const addItemToCart = useCallback(
        /** Cart line item data to send to the API to attach to a cart. */
        async(lineItem: IShoppingCartLineItemOut): Promise<IFriendlyError> => {
        
        setLoadingCart(true);
        try {
            let cartKey = await getCartKey();

            if (cartKey === undefined) {
                await createCart();
                cartKey = await getCartKey();
            }

            const endpoint = `${siteSettings?.webAPIUrl}/shoppingcart/${cartKey}/lineitem?${query.toString()}`;
            const response = await inFetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
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
    }, [getCartKey, siteSettings?.webAPIUrl, query, setCartKey, createCart])

    //===========================================================================================================================
    const updateLineItem = useCallback(async(
        /** Line item update contents, in this demo really only quantity. */
        lineItem: IShoppingCartLineItemOut,
        hideLoading: boolean = false): Promise<IFriendlyError> => {
        
        if (hideLoading === false) {
            setLoadingCart(true);
        }

        try {
            const cartKey = await getCartKey();

            const endpoint = `${siteSettings?.webAPIUrl}/shoppingcart/${cartKey}/lineitem?${query.toString()}`;
            const response = await inFetch(endpoint, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
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
    }, [getCartKey, query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    const removeLineItem = useCallback(async(
        /** Line item to remove. */
        lineItemId: number): Promise<IFriendlyError> => {

        try {
            const cartKey = await getCartKey();

            const endpoint = `${siteSettings?.webAPIUrl}/shoppingcart/${cartKey}/lineitem/${lineItemId}?${query.toString()}`;
            const response = await inFetch(endpoint, { method: 'DELETE' });

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
    }, [getCartKey, query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    /** Attempts to complete the order. */
    const completeOrder = useCallback(async(
        /** User Shipping information. */
        shippingInformation: ICheckoutAddress, 
        /** User Billing information. */
        billingInformation: ICheckoutAddress, 
        /** User Payment information. */
        paymentInformation: ICheckoutPayment) => {

        setLoadingOrderDetail(true);
        setOrderDetailError({hasError: false});
        try {
            const cartKey = await getCartKey();

            const orderDetail: IOrderDetailOut = {
                shippingEmail: shippingInformation.email,
                shippingFirstName: shippingInformation.firstName,
                shippingLastName: shippingInformation.lastName,
                shippingAddress: shippingInformation.address,
                shippingSuiteApt: shippingInformation.suiteApt,
                shippingCity: shippingInformation.city,
                shippingState: shippingInformation.state,
                shippingZipCode: shippingInformation.zipCode,
                shippingPhone: shippingInformation.phoneNumber,

                billingEmail: billingInformation.email,
                billingFirstName: billingInformation.firstName,
                billingLastName: billingInformation.lastName,
                billingAddress: billingInformation.address,
                billingSuiteApt: billingInformation.suiteApt,
                billingCity: billingInformation.city,
                billingState: billingInformation.state,
                billingZipCode: billingInformation.zipCode,
                billingPhone: billingInformation.phoneNumber,

                cardNumber: paymentInformation.cardNumber,
                nameOnCard: paymentInformation.nameOnCard,
                expirationDate: paymentInformation.expirationDate,
                cvv: paymentInformation.cvv
            };

            const endpoint = `${siteSettings?.webAPIUrl}/shoppingcart/${cartKey}/order?${query.toString()}`;
            const response = await inFetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetail)
            });

            if (response.ok === false) { throw new Error('Failed to complete checkout.'); }

            const data: IOrderDetail = await response.json();
            setOrderDetail(data);
        } catch(error) {
            console.log('error: ', error);
            setOrderDetailError(asFriendlyError(error, `Sorry, we're having trouble completing the order.`));
        } finally {
            setLoadingOrderDetail(false);
        }

    }, [getCartKey, query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    return {
        cart,
        loadingCart,
        cartError,
        orderDetail,
        loadingOrderDetail,
        orderDetailError,
        getShoppingCart,
        getOrderDetail,
        addItemToCart,
        updateLineItem,
        removeLineItem,
        completeOrder
    }
}

export default useShoppingCart;
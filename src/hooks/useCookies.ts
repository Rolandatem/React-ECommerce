import Cookies from 'js-cookie';
import { useCallback } from 'react';

/** Hook for cookie management */
const useCookies = () => {

    //===========================================================================================================================
    /** Sets the Cart Guid Key to a user cookie. */
    const setCartKey = useCallback(async(
        /** The cart key identifier from the API. */
        cartKey: string) => {
        Cookies.set('cart_key', cartKey, { expires: 7 });
    }, []);

    //===========================================================================================================================
    /** Gets the Cart Guid Key from the cookie. */
    const getCartKey = useCallback(async() => {
        return Cookies.get('cart_key');
    }, []);

    //===========================================================================================================================
    /** Deletes the Cart Guid Key cookie. */
    const removeCartKey = useCallback(async() => {
        Cookies.remove('cart_key');
    }, []);

    //===========================================================================================================================
    /** Sets the Order Detail Key to a user cookie. */
    const setOrderKey = useCallback(async(
        /** The order key identifier from the API. */
        orderKey: string) => {
        Cookies.set('order_key', orderKey, { expires: 7 });
    }, [])

    //===========================================================================================================================
    /** Gets the Order Guid Key from the cookie. */
    const getOrderKey = useCallback(async() => {
        return Cookies.get('order_key');
    }, [])

    //===========================================================================================================================
    /** Deletes the Order Guid Key cookie. */
    const removeOrderKey = useCallback(async() => {
        Cookies.remove('order_key');
    }, [])

    //===========================================================================================================================
    return {
        setCartKey,
        getCartKey,
        removeCartKey,
        setOrderKey,
        getOrderKey,
        removeOrderKey
    }
}

export default useCookies;
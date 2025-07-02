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
    return {
        setCartKey,
        getCartKey,
        removeCartKey
    }
}

export default useCookies;
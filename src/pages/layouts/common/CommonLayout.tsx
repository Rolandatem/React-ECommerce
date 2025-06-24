import { Outlet } from "react-router";
import CommonLayoutHeader from "./components/CommonLayoutHeader";
import CommonLayoutFooter from "./components/CommonLayoutFooter";
import CartQuantityContext from "@/tools/contexts/CartQuantityContext";
import { useEffect, useState } from "react";
import useShoppingCart from "@/hooks/useShoppingCart";

/**
 * Common Layout used for the site. May use another layout specific to the page.
 */
const CommonLayout = () => {
    const [cartQuantity, setCartQuantity] = useState<number>(0);
    const {cart, getShoppingCart} = useShoppingCart();

    useEffect(() => {
        getShoppingCart();
    }, [getShoppingCart])

    useEffect(() => {
        if (!cart) { return; }

        let quantity = 0;
        cart.lineItems.forEach(lineItem => quantity += lineItem.quantity);
        setCartQuantity(quantity);
    }, [cart])

    return (
        <>
            <CartQuantityContext.Provider value={{cartQuantitySetter: setCartQuantity}}>
                <CommonLayoutHeader cartQuantity={cartQuantity} />
                <div className="mt-5">
                    <Outlet />
                </div>
                <CommonLayoutFooter />
            </CartQuantityContext.Provider>
        </>
    )
}

export default CommonLayout;
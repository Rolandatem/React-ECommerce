import CheckoutSummary from "./components/CheckoutSummary";
import useShoppingCart from "@/hooks/useShoppingCart";
import { useContext, useEffect, useState } from "react";
import BusyIndicator from "../common/components/BusyIndicator";
import ErrorIndicator from "../common/components/ErrorIndicator";
import CartLineItems from "./components/CartLineItems";
import type IShoppingCartLineItem from "@/tools/interfaces/dtos/IShoppingCartLineItem";
import { toast } from "@/behaviors/toastification/contexts";
import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import MobileCartLineItems from "./components/MobileCartLineItems";
import CheckoutAddresses from "./components/CheckoutAddresses";
import type ICheckoutAddresses from "@/tools/interfaces/ICheckoutAddresses";
import Payment from "./components/Payment";
import type ICheckoutPayment from "@/tools/interfaces/ICheckoutPayment";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

/** Cart checkout page component. */
const Checkout = () => {
    const siteSettings = useContext(SiteSettingsContext);
    const navigate = useNavigate();
    const processEnums = { cart: 1, shipping: 2, payment: 3 };
    const {cart, loadingCart, cartError, orderDetail, loadingOrderDetail, orderDetailError, getShoppingCart, removeLineItem, updateLineItem, completeOrder} = useShoppingCart();
    const [currentProcess, setCurrentProcess] = useState<number>(processEnums.cart);
    const [canCheckout, setCanCheckout] = useState<boolean>(false);
    const [checkoutAddresses, setCheckoutAddresses] = useState<ICheckoutAddresses>(initCheckoutAddresses);
    const [checkoutAddressesIsValid, setCheckoutAddressesIsValid] = useState<boolean>(false);
    const [checkoutPayment, setCheckoutPayment] = useState<ICheckoutPayment>(initCheckoutPayment);
    const [checkoutPaymentIsValid, setCheckoutPaymentIsValid] = useState<boolean>(false);

    //--Local optimistic cart state.
    const [optimisticCart, setOptimisticCart] = useState(cart);

    //===========================================================================================================================
    /** Moves the user to the next phase of the checkout process. */
    const onMoveNextProcess = () => {
        if (currentProcess !== processEnums.payment) {
            setCurrentProcess(prev => prev + 1);
        }
    }

    //===========================================================================================================================
    /** Moves the user to the previous phase of the checkout process. */
    const onMovePrevProcess = () => {
        if (currentProcess !== processEnums.cart) {
            setCurrentProcess(prev => prev - 1);
        }
    }

    //===========================================================================================================================
    /**
     * Updates the line item optimistically (really only quantity). If there is an error, that it will revert back to the 
     * original value and notify the user via toast of the problem.
     * @param lineItem Line item to update.
     * @param newQuantity New quantity value to set for the line item.
     */
    const onUpdateLineItem = async(
        lineItem: IShoppingCartLineItem, 
        newQuantity: number) => {
        if (!optimisticCart) { return; }
        const prevLineItems = optimisticCart.lineItems;

        //--Optimistically update cart.
        setOptimisticCart({
            ...optimisticCart,
            lineItems: prevLineItems.map(item => item.id === lineItem.id
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        });

        const result = await updateLineItem({
            productId: lineItem.product.id,
            tag: lineItem.tag,
            quantity: newQuantity,
            salePriceAtSale: lineItem.salePriceAtSale,
            originalPriceAtSale: lineItem.originalPriceAtSale,
            totalSalePrice: lineItem.salePriceAtSale * newQuantity,
            totalOriginalPrice: lineItem.originalPriceAtSale * newQuantity,
            savingsPercentageAtSale: lineItem.savingsPercentageAtSale
        }, true);

        if (result.hasError) {
            setOptimisticCart({
                ...optimisticCart,
                lineItems: prevLineItems
            })
            toast.error((
                <>
                    <p>{result.friendlyErrorMessage}</p>
                    <p>Your cart has been reset to before the change.</p>
                </>
            ))
        };
    }

    //===========================================================================================================================
    /**
     * Removes the line item from the cart.
     * @param lineItem Line item to remove.
     */
    const onDeleteLineItem = async(
        lineItem: IShoppingCartLineItem) => {
        await removeLineItem(lineItem.id);
    }

    //===========================================================================================================================
    /** Attempt to complete the order. */
    const onCompleteCheckout = async() => {
        await completeOrder(
            checkoutAddresses.shipping,
            checkoutAddresses.billingIsSameAsShipping
                ? checkoutAddresses.shipping
                : checkoutAddresses.billing,
            checkoutPayment
        );
    }

    //===========================================================================================================================
    /** Loads the shopping cart on component load. */
    useEffect(() => {
        getShoppingCart();
    }, [getShoppingCart])

    //===========================================================================================================================
    /** Watches the cart and updates the optimistic cart on change. */
    useEffect(() => {
        setOptimisticCart(cart);
    }, [cart])

    //===========================================================================================================================
    /** Watches the validity variables to see if we should allow the checkout now button to be active. */
    useEffect(() => {
        if (checkoutAddressesIsValid && checkoutPaymentIsValid) {
            setCanCheckout(true);
        } else {
            setCanCheckout(false);
        }
    }, [checkoutAddressesIsValid, checkoutPaymentIsValid])

    //===========================================================================================================================
    /** Watches the order detail object and waits for it to be completed, and when so will navigate to the thank you page. */
    useEffect(() => {
        if (!orderDetail) { return; }

        if (orderDetail.isComplete) {
            navigate('/thankyou');
        }
    }, [navigate, orderDetail])

    //===========================================================================================================================
    /** Watches the order detail error object to display a toast when there is a problem. */
    useEffect(() => {
        if (orderDetailError.hasError) {
            toast.error(orderDetailError.friendlyErrorMessage);
        }
    }, [orderDetailError.friendlyErrorMessage, orderDetailError.hasError])

    //===========================================================================================================================
    return (
        <Container className="position-relative" style={{minHeight: '100px'}}>
            {
                loadingCart && <BusyIndicator />
            }
            {
                cartError.hasError && <ErrorIndicator message={cartError.friendlyErrorMessage} />
            }
            {
                loadingCart == false &&
                cartError.hasError == false && (
                    <Row>
                        {/* process */}
                        <Col>
                            <Container className="p-0">
                                <Row>
                                    <Col>
                                        <Alert className="d-flex align-items-center gap-2 font-roboto">
                                            <span className={currentProcess === processEnums.cart ? '' : 'text-muted'}>Cart</span>
                                            <span className="pi pi-chevron-right"></span>
                                            <span className={currentProcess === processEnums.shipping ? '' : 'text-muted'}>Shipping/Billing</span>
                                            <span className="pi pi-chevron-right"></span>
                                            <span className={currentProcess === processEnums.payment ? '' : 'text-muted'}>Payment</span>
                                        </Alert>
                                    </Col>
                                </Row>

                                {
                                    currentProcess === processEnums.cart && (
                                        siteSettings?.isMobile
                                            ? <MobileCartLineItems cart={cart} onMoveNextProcess={onMoveNextProcess} onDeleteLineItem={onDeleteLineItem} onUpdateLineItem={onUpdateLineItem} />
                                            : <CartLineItems cart={cart} onMoveNextProcess={onMoveNextProcess} onDeleteLineItem={onDeleteLineItem} onUpdateLineItem={onUpdateLineItem} />
                                    )
                                }
                                {
                                    currentProcess === processEnums.shipping && (
                                        <CheckoutAddresses onMoveNextProcess={onMoveNextProcess} onMovePrevProcess={onMovePrevProcess} checkoutAddresses={checkoutAddresses} setCheckoutAddresses={setCheckoutAddresses} setCheckoutAddressesIsValid={setCheckoutAddressesIsValid} />
                                    )
                                }
                                {
                                    currentProcess === processEnums.payment && (
                                        <Payment onMovePrevProcess={onMovePrevProcess} checkoutPayment={checkoutPayment} setCheckoutPayment={setCheckoutPayment} setCheckoutPaymentIsValid={setCheckoutPaymentIsValid} />
                                    )
                                }
                            </Container>
                        </Col>

                        {/* CART SUMMARY */}
                        <Col xs={12} lg="auto" className="mt-3 mt-lg-0">
                            <CheckoutSummary cart={cart} canCheckout={canCheckout} loadingOrderDetail={loadingOrderDetail} onCompleteCheckout={onCompleteCheckout} />
                        </Col>
                    </Row>
                )
            }
        </Container>
    )
}

export default Checkout;

const initCheckoutAddresses: ICheckoutAddresses = {
    shipping: {
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        suiteApt: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: ''
    },
    billing: {
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        suiteApt: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: ''
    },
    billingIsSameAsShipping: false
};

const initCheckoutPayment: ICheckoutPayment = {
    cardNumber: '',
    nameOnCard: '',
    expirationDate: '',
    cvv: ''
}
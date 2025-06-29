import { toast } from "@/behaviors/toastification/contexts";
import useShoppingCart from "@/hooks/useShoppingCart";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusyIndicator from "../common/components/BusyIndicator";
import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import currencyFormatter from "@/tools/functions/currencyFormatter";
import useCookies from "@/hooks/useCookies";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import CartQuantityContext from "@/tools/contexts/CartQuantityContext";

/** Thank you page component. */
const ThankYou = () => {
    const navigate = useNavigate();
    const siteSettings = useContext(SiteSettingsContext);
    const {orderDetail, loadingOrderDetail, orderDetailError, getOrderDetail} = useShoppingCart();
    const {removeCartKey, removeOrderKey} = useCookies();
    const cartQuantityContext = useContext(CartQuantityContext);
    const [getOrderDetailRan, setGetOrderDetailRan] = useState<boolean>(false);
    const [getOrderSuccess, setGetOrderSuccess] = useState<boolean | null>(null);

    //===========================================================================================================================
    /**
     * Formats a numeric-only phone number to use the (000) 000-0000 format.
     * @param phoneNumber Numeric-only phone number.
     * @returns Formatted phone number
     */
    const formatPhoneNumber = (phoneNumber?: string) => {
        if (!phoneNumber) { return; }

        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }

    //===========================================================================================================================
    /** Loads the current customer order on mount. */
    useEffect(() => {
        (async() => {
            console.log('order getter');
            const success = await getOrderDetail();
            setGetOrderSuccess(success);
            setGetOrderDetailRan(true);
        })()
    }, [getOrderDetail])

    //===========================================================================================================================
    /** 
     * Watches until the order detail request is completed from mount, then either clears keys and display thank you page
     * or redirects to the homepage.
     */
    useEffect(() => {
        if (!getOrderDetailRan) { return; }
        console.log('key killer');

        if (getOrderSuccess) {
            //--Found the order.
            removeCartKey();
            removeOrderKey();
            cartQuantityContext?.cartQuantitySetter(0);
        } else {
            //--Error or not found.
            if (orderDetailError.hasError) {
                toast.error(orderDetailError.friendlyErrorMessage);
            }

            navigate('/');
        }
    }, [cartQuantityContext, getOrderDetailRan, getOrderSuccess, navigate, orderDetailError, removeCartKey, removeOrderKey])

    //===========================================================================================================================
    return(
        <Container>
            <Row>
                <Col>
                    <Alert className="text-center fs-2 py-1">Thank you for your purchase!</Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card data-bs-theme="light" className="font-roboto">
                        <Card.Header className="fw-bold fs-5">
                            <span>Order #:</span>
                            <span className="ms-lg-2 fs-7 fs-lg-5 d-block d-lg-inline text-cyan">{orderDetail?.orderKey.toUpperCase()}</span>
                        </Card.Header>
                        <Card.Body>
                            <Container className="px-0">
                                <Row>
                                    <Col>
                                        {
                                            //--MOBILE
                                            orderDetail && 
                                            siteSettings?.isMobile &&
                                            orderDetail.shoppingCart.lineItems.map((lineItem, idx) => (
                                                <React.Fragment key={lineItem.id}>
                                                    <div className={`fw-bold ${idx !== 0 ? 'pt-2' : ''}`}>{lineItem.product.productName}</div>
                                                    <div className="text-muted">
                                                        <span>{lineItem.quantity} x </span>
                                                        <span>{lineItem.tag.name}</span>
                                                    </div>
                                                    <div className="text-end border-bottom pb-2">
                                                        <span className="text-decoration-line-through text-muted">{currencyFormatter.format(lineItem.totalOriginalPrice)}</span>
                                                        <span className="fs-5 fw-bold text-cyan ms-2">{currencyFormatter.format(lineItem.totalSalePrice)}</span>
                                                    </div>
                                                </React.Fragment>
                                            ))
                                        }
                                        {
                                            //--DESKTOP
                                            orderDetail &&
                                            siteSettings?.isMobile === false &&
                                            orderDetail.shoppingCart.lineItems.map((lineItem, idx) => (
                                                <React.Fragment key={lineItem.id}>
                                                    <div className={`d-flex border-bottom pb-2 ${idx !== 0 ? 'pt-2' : ''}`}>
                                                        <div className="flex-fill d-flex">
                                                            <div><Image src={`/imagetypes/product/${lineItem.product.sku}.webp`} width={300} /></div>
                                                            <div className="ms-4 d-flex flex-column justify-content-between">
                                                                <div className="fw-bold fs-5">{lineItem.product.productName}</div>
                                                                <div className="fw-bold">
                                                                    <div className="text-green">IN STOCK</div>
                                                                    <div>{lineItem.product.shipType}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div><Image src={`/imagetypes/swatch/${lineItem.product.sku}-${lineItem.tag.name.replace(/[^a-zA-Z0-9\- ]/g, '')}.webp`} width={100} /></div>
                                                            <div>{lineItem.tag.name}</div>
                                                            <div className="text-muted">(x {lineItem.quantity})</div>
                                                        </div>
                                                        <div className="ms-3 d-flex flex-column justify-content-between align-items-end fw-bold" style={{width: '300px' }}>
                                                            <div className="text-end pt-3">
                                                                <div className="text-muted text-decoration-line-through">
                                                                    {currencyFormatter.format(lineItem.originalPriceAtSale)} /sqft
                                                                </div>
                                                                <div className="fs-5">{currencyFormatter.format(lineItem.salePriceAtSale)}</div>
                                                            </div>
                                                            <div className="text-end pb-3">
                                                                <div className="text-muted text-decoration-line-through">{currencyFormatter.format(lineItem.totalOriginalPrice)}</div>
                                                                <div className="fs-4 text-cyan">{currencyFormatter.format(lineItem.totalSalePrice)}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            ))
                                        }
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col className="text-end fw-bold fs-5">
                                        <span>Total:</span>
                                        <span className="ms-2 text-cyan">
                                            {
                                                orderDetail &&
                                                currencyFormatter.format(orderDetail.shoppingCart.lineItems
                                                    .reduce((total, lineItem) => total + lineItem.totalSalePrice, 0)
                                                )
                                            }
                                        </span>                                    
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                        {
                            loadingOrderDetail && <BusyIndicator />
                        }
                    </Card>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs={12} lg={4}>
                    <Card data-bs-theme="light">
                        <Card.Header className="fw-bold fs-5 font-roboto">Shipping Information</Card.Header>
                        <Card.Body>
                            <div className="fw-bold">{`${orderDetail?.shippingFirstName} ${orderDetail?.shippingLastName}`}</div>
                            <div>{`${orderDetail?.shippingAddress}  ${orderDetail?.shippingSuiteApt}`}</div>
                            <div>{`${orderDetail?.shippingCity}, ${orderDetail?.shippingState}  ${orderDetail?.shippingZipCode}`}</div>
                            <div className="mt-2">{orderDetail?.shippingEmail}</div>
                            <div>{formatPhoneNumber(orderDetail?.shippingPhone)}</div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} lg={4} className="mt-3 mt-lg-0">
                    <Card data-bs-theme="light">
                        <Card.Header className="fw-bold fs-5 font-roboto">Billing Information</Card.Header>
                        <Card.Body>
                            <div className="fw-bold">{`${orderDetail?.billingFirstName} ${orderDetail?.billingLastName}`}</div>
                            <div>{`${orderDetail?.billingAddress}  ${orderDetail?.billingSuiteApt}`}</div>
                            <div>{`${orderDetail?.billingCity}, ${orderDetail?.billingState}  ${orderDetail?.billingZipCode}`}</div>
                            <div className="mt-2">{orderDetail?.billingEmail}</div>
                            <div>{formatPhoneNumber(orderDetail?.billingPhone)}</div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} lg={4} className="mt-3 mt-lg-0">
                    <Card data-bs-theme="light">
                        <Card.Header className="fw-bold fs-5 font-roboto">Payment Information</Card.Header>
                        <Card.Body className="d-flex">
                            <div>
                                <div className="fw-bold">{orderDetail?.cardNumber}</div>
                                <div>{orderDetail?.nameOnCard}</div>
                                <div className="d-flex justify-content-between fst-italic">
                                    <div>{orderDetail?.expirationDate}</div>
                                    <div>{orderDetail?.cvv}</div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ThankYou;
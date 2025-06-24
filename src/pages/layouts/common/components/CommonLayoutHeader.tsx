import styles from '../styles/commonLayoutHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import useCategories from '@/hooks/useCategories';
import React, { useContext, useEffect, useState } from 'react';
import type ICommonLayoutHeaderProps from '@/tools/interfaces/ICommonLayoutHeaderProps';
import useShoppingCart from '@/hooks/useShoppingCart';
import currencyFormatter from '@/tools/functions/currencyFormatter';
import BusyIndicator from '@/pages/common/components/BusyIndicator';
import { toast } from '@/behaviors/toastification/contexts';
import CartQuantityContext from '@/tools/contexts/CartQuantityContext';
import type ICartTotals from '@/tools/interfaces/ICartTotals';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';

/**
 * Footer component used for the Common Layout component.
 */
const CommonLayoutHeader = ({cartQuantity}: ICommonLayoutHeaderProps) => {
    //===========================================================================================================================
    const navigate = useNavigate();
    const { categories, loadCategories } = useCategories();
    const [navBarIsExpanded, setNavBarIsExpanded] = useState<boolean>(false);
    const [showShoppingCart, setShowShoppingCart] = useState<boolean>(false);
    const [cartTotal, setCartTotal] = useState<ICartTotals>({cost: 0, savings: 0, subTotal: 0, taxes: 0, cartTotal: 0});
    const {cart, getShoppingCart, removeLineItem} = useShoppingCart();
    const [isBusy, setIsBusy] = useState<{[lineItemId: number]: boolean}>({});
    const cartQuantityContext = useContext(CartQuantityContext);

    //===========================================================================================================================
    /**
     * Navigates the user to the specified url and closes the hamburger
     * menu when in mobile mode so it doesn't look goofy.
     * @param url Address to navigate to.
     */
    const navigateTo = (url: string) => {
        navigate(url);
        setNavBarIsExpanded(false);
        setShowShoppingCart(false);
    }

    //===========================================================================================================================
    /** Because of the above function we need to handle the toggle event now. */
    const onNavbarToggle = () => {
        setNavBarIsExpanded(!navBarIsExpanded);
    }

    //===========================================================================================================================
    /**
     * Used to compute the correct swatch url, includes cleaning the name from invalid characters.
     * @param sku Product SKU
     * @param tagName Name of the Color tag.
     * @returns Cleaned and computed swatch url.
     */
    const computeSwatchUrl = (
        sku: string,
        tagName: string) => {

        const characterCleaner = /[^a-zA-Z0-9\- ]/g; //--Only alphanumeric, dash, and space allowed.
        return `/imagetypes/swatch/${sku}-${tagName.replace(characterCleaner, '')}.webp`;
    }

    //===========================================================================================================================
    const onRemoveLineItem = async(lineItemId: number) => {
        setIsBusy(prev => ({...prev, [lineItemId]: true}));
        try {
            const response = await removeLineItem(lineItemId);

            if (response.hasError) { toast.error(response.friendlyErrorMessage); }
            else { toast.success('Line item removed from cart.'); }
        } finally
        {
            setIsBusy(prev => ({...prev, [lineItemId]: false}));
        }
    }

    //===========================================================================================================================
    useEffect(() => {
        getShoppingCart();
    }, [getShoppingCart])

    useEffect(() => {
        const loader = async() => {
            await loadCategories();
        }

        loader();
    }, [loadCategories])

    useEffect(() => {
        if (showShoppingCart) {
            getShoppingCart();
        }
    }, [getShoppingCart, showShoppingCart])

    useEffect(() => {
        const quantity: number = cart?.lineItems.reduce((qty, lineItem) => qty + lineItem.quantity, 0) ?? 0;
        const originalCost = cart?.lineItems.reduce((price, lineItem) => price + lineItem.totalOriginalPrice, 0) ?? 0;
        const saleCost = cart?.lineItems.reduce((price, lineItem) => price + lineItem.totalSalePrice, 0) ?? 0;
        const savings = (originalCost - saleCost) * -1;
        const taxes = saleCost * .07;
        const cartTotal = saleCost + taxes;

        cartQuantityContext?.cartQuantitySetter(quantity);
        setCartTotal({
            cost: originalCost,
            savings: savings,
            subTotal: saleCost,
            taxes: taxes,
            cartTotal: cartTotal
        })
    }, [cart, cartQuantityContext])

    //===========================================================================================================================
    return (
        <>
            <Navbar bg='dark' data-bs-theme="dark" expand="md" expanded={navBarIsExpanded} onToggle={onNavbarToggle}>
                <Container fluid className='align-items-start'>
                    
                    {/* COMPANY BRAND */}
                    <Col xs={2} md={3} className={styles.leftSideHeader}>
                        <div onClick={() => navigateTo('/')} role='button' className={styles.brand}>
                            <span className='pi pi-building-columns'></span>
                            <span className='ms-2 d-none d-lg-inline font-roboto'>Martinez Flooring</span>
                        </div>
                    </Col>

                    {/* NAVIGATION */}
                    <Col className='text-center'>
                        <Navbar.Toggle></Navbar.Toggle>
                        <Navbar.Collapse className='justify-content-center'>
                            <Nav>
                                <NavDropdown title='Flooring by Category'>
                                    {
                                        categories.map((cat) => (
                                            <NavDropdown.Item key={cat.id} onClick={() => navigateTo(`/list/${cat.id === 0 ? 'all' : cat.id}`)} className='text-wrap'>
                                                {cat.name}
                                            </NavDropdown.Item>
                                        ))
                                    }
                                </NavDropdown>
                                <NavDropdown title="Resources">
                                    <NavDropdown.Item onClick={() => navigateTo('/faqs')}>
                                        FAQ
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link className='text-nowrap' onClick={() => navigateTo('/contactus')}>
                                    Contact Us
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>

                    {/* SHOPPING CART */}
                    <Col xs={2} md={3} className={styles.rightSideHeader}>
                        <div role='button' className='d-inline' onClick={() => setShowShoppingCart(true)}>
                            <span className={`pi pi-shopping-cart ${styles.cart}`}></span>
                            <Badge pill>{cartQuantity}</Badge>
                        </div>
                    </Col>

                </Container>
            </Navbar>

            <Offcanvas show={showShoppingCart} onHide={() => setShowShoppingCart(false)} placement='end'>
                <Offcanvas.Header closeButton>
                    <span className='fs-3'>Shopping Cart</span>
                </Offcanvas.Header>
                <Offcanvas.Body className="font-roboto">

                    {/* CART LINE ITEMS */}
                    {
                        cart && cart.lineItems.map(lineItem => (
                            <React.Fragment key={lineItem.id}>
                                <hr className="my-1" />
                                <Container key={lineItem.id} className="position-relative pt-2 pb-3" fluid>
                                    <Row>
                                        <Col className="fw-bold fs-5" role="button" onClick={() => (navigateTo(`/product/${lineItem.product.sku}`))}>
                                            {lineItem.product.productName}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-end text-muted">
                                            {lineItem.tag.name} x{lineItem.quantity}
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col role="button" onClick={() => navigateTo(`/product/${lineItem.product.sku}`)}>
                                            <Image src={computeSwatchUrl(lineItem.product.sku, lineItem.tag.name)} fluid />
                                        </Col>
                                        <Col xs="auto" className="text-end">
                                            <Container className="text-nowrap pe-0">
                                                <Row>
                                                    <Col className="fs-7">
                                                        <div>Original Price</div>
                                                        <div className="text-decoration-line-through">{currencyFormatter.format(lineItem.originalPriceAtSale)}</div>   
                                                        <div>Total Price</div>
                                                        <div className="text-decoration-line-through">{currencyFormatter.format(lineItem.totalOriginalPrice)}</div>                                                 
                                                    </Col>
                                                    <Col className="fs-7">
                                                        <div>Sale Price</div>
                                                        <div className="fw-bold">{currencyFormatter.format(lineItem.salePriceAtSale)}</div>  
                                                        <div>Your Price</div>
                                                        <div className="fw-bold text-cyan">{currencyFormatter.format(lineItem.totalSalePrice)}</div>                                                  
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2">
                                                    <Button className="py-0" onClick={() => onRemoveLineItem(lineItem.id)}>Remove</Button>
                                                    {
                                                        isBusy[lineItem.id] && <BusyIndicator />
                                                    }
                                                </Row>
                                            </Container>
                                        </Col>
                                    </Row>
                                </Container>
                            </React.Fragment>
                        ))
                    }

                    {/* TOTALS AND CHECKOUT BUTTON */}
                    <hr />
                    <div className="fw-bold fs-5">Cart Totals</div>
                    <table className="text-end ms-auto" style={{tableLayout: 'fixed'}}>
                        <tbody>
                            <tr>
                                <td>Cost:</td>
                                <td className="ps-4">{currencyFormatter.format(cartTotal.cost)}</td>
                            </tr>
                            <tr>
                                <td>Savings:</td>
                                <td>{currencyFormatter.format(cartTotal.savings)}</td>
                            </tr>
                            <tr>
                                <td>Subtotal:</td>
                                <td>{currencyFormatter.format(cartTotal.subTotal)}</td>
                            </tr>
                            <tr className="border-bottom">
                                <td>Tax (7%):</td>
                                <td>{currencyFormatter.format(cartTotal.taxes)}</td>
                            </tr>
                            <tr className="fw-bold">
                                <td className="pt-2">Total:</td>
                                <td className="pt-2 text-cyan">{currencyFormatter.format(cartTotal.cartTotal)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <Button className="w-100" onClick={() => { navigateTo('/checkout'); }}>CHECKOUT</Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default CommonLayoutHeader;
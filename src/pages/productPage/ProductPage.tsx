import useProducts from "@/hooks/useProducts";
import type IProduct from "@/tools/interfaces/dtos/IProduct";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound404 from "../NotFound404";
import BusyIndicator from "../common/components/BusyIndicator";
import Error404 from "@/tools/exceptions/Error404";
import ErrorIndicator from "../common/components/ErrorIndicator";
import ProductPageCard from "./components/ProductPageCard";
import ProductPageImages from "./components/ProductPageImages";
import ColorSelect from "./components/ColorSelect";
import type ITag from "@/tools/interfaces/dtos/ITag";
import AddToCart from "./components/AddToCart";
import useShoppingCart from "@/hooks/useShoppingCart";
import { toast } from "@/behaviors/toastification/contexts";
import type IFriendlyError from "@/tools/interfaces/IFriendlyError";
import CartQuantityContext from "@/tools/contexts/CartQuantityContext";
import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/** Product page component. */
const ProductPage = () => {
    const { sku } = useParams();
    const siteSettings = useContext(SiteSettingsContext);
    const { loadingProducts, productsError, getProductBySku } = useProducts();
    const { cart, loadingCart, addItemToCart, updateLineItem, getShoppingCart } = useShoppingCart();
    const [product, setProduct] = useState<IProduct | undefined>(undefined);
    const [selectedColor, setSelectedColor] = useState<ITag | undefined>(undefined);
    const [showDuplicateItemModal, setShowDuplicateItemModal] = useState<boolean>();
    const [itemQuantityToAdd, setItemQuantityToAdd] = useState<number>(0);
    const cartQuantityContext = useContext(CartQuantityContext);

    //===========================================================================================================================
    /**
     * Event handler that attempts to add an item to the cart, but first checks for a duplicate entry. If found, then displays
     * a modal informing the user requesting if they want to update the existing line item or not.
     * @param quantity The quantity of the item requested to add to the cart.
     */
    const onAddToCart = async(quantity: number) => {
        if (!product || !selectedColor) { return; }

        //--Duplicate check.
        if (cart !== undefined) {
            if (cart.lineItems
                    .find(lineItem => 
                        lineItem.tag.id === selectedColor.id &&
                        lineItem.product.id === product.id) !== undefined)
                    {
                        setItemQuantityToAdd(quantity);
                        setShowDuplicateItemModal(true);
                        return;
                    }
        }

        //--No dupe, go ahead and add.
        const result: IFriendlyError = await addItemToCart({
            productId: product.id,
            tag: selectedColor,
            quantity: quantity,
            salePriceAtSale: product.salePrice,
            originalPriceAtSale: product.originalPrice,
            totalSalePrice: product.salePrice * quantity,
            totalOriginalPrice: product.originalPrice * quantity
        });

        if (result.hasError) { toast.error(result.friendlyErrorMessage); }
        else { toast.success(`${quantity} ${selectedColor.name} added to cart!`); }
    }

    //===========================================================================================================================
    /** Event handler for accepting the update to the line item from the 'duplicate found' modal. */
    const onApproveItemQuantityUpdate = async() => {
        if (!product || !selectedColor) { return; }

        const result: IFriendlyError = await updateLineItem({
            productId: product.id,
            tag: selectedColor,
            quantity: itemQuantityToAdd,
            salePriceAtSale: product.salePrice,
            originalPriceAtSale: product.originalPrice,
            totalSalePrice: product.salePrice * itemQuantityToAdd,
            totalOriginalPrice: product.originalPrice * itemQuantityToAdd
        })

        if (result.hasError) { toast.error(result.friendlyErrorMessage); }
        else { toast.success('Line Item updated!'); }

        setShowDuplicateItemModal(false);
    }

    //===========================================================================================================================
    /** Loads the current shopping cart (if exists) and the product specified from the url address. */
    useEffect(() => {
        (async() => {
            await getShoppingCart();

            if (sku === undefined) {
                return;
            }

            setProduct(await getProductBySku(sku));
        })();
    }, [getProductBySku, getShoppingCart, sku])

    //===========================================================================================================================
    /** Watches the cart, and updates the quantity counter in the header when it changes. */
    useEffect(() => {
        if (!cart) { return; }

        let quantity: number = 0;
        cart.lineItems.forEach((lineItem) => {
            quantity += lineItem.quantity;
        });
        cartQuantityContext?.cartQuantitySetter(quantity);
    }, [cart, cartQuantityContext])

    //===========================================================================================================================
    return (
        <>
            {
                loadingProducts || loadingCart && (
                    <Container className="position-relative" style={{minHeight: '100px'}}>
                        <BusyIndicator />
                    </Container>
                )
            }
            {
                loadingProducts === false && 
                (sku === undefined || productsError.errorType === Error404) && 
                <NotFound404 />
            }
            {
                productsError.hasError &&
                productsError.errorType === undefined &&
                    <Container className="position-relative" style={{minHeight: '100px'}}>
                        <ErrorIndicator message={productsError.friendlyErrorMessage} />
                    </Container>
            }

            {/* MOBILE */}
            {
                product !== undefined && loadingProducts === false &&
                siteSettings?.isMobile &&
                <Container>
                    <Row>
                        <Col>
                            <ProductPageCard product={product} />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <ProductPageImages product={product} />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <ColorSelect product={product} setSelectedColor={setSelectedColor} />
                        </Col>
                    </Row>
                    <Row className="mt-3 position-relative">
                        <Col>
                            <AddToCart product={product} selectedColor={selectedColor} onAddToCart={onAddToCart} />
                            {
                                loadingCart && <BusyIndicator />
                            }
                        </Col>
                    </Row>
                </Container>
            }

            {/* DESKTOP */}
            {
                product !== undefined && loadingProducts === false &&
                siteSettings?.isMobile == false &&
                <Container>
                    <Row>
                        <Col xs={6}>
                            <ProductPageImages product={product} />
                        </Col>

                        <Col xs={6}>
                            <ProductPageCard product={product} />
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col xs={6}>
                            <ColorSelect product={product} setSelectedColor={setSelectedColor} />
                        </Col>

                        <Col xs={6} className="position-relative">
                            <AddToCart product={product} selectedColor={selectedColor} onAddToCart={onAddToCart} />
                            {
                                loadingCart && <BusyIndicator />
                            }
                        </Col>
                    </Row>
                </Container>
            }

            <Modal show={showDuplicateItemModal} onHide={() => setShowDuplicateItemModal(false)} centered>
                <Modal.Header>Item Already In Cart</Modal.Header>
                <Modal.Body>
                    You already have this item in your cart. Do you want to update it
                    with your current selection?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onApproveItemQuantityUpdate} style={{width: '75px'}}>Yes</Button>
                    <Button onClick={() => setShowDuplicateItemModal(false)} style={{width: '75px'}}>No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProductPage;
import type IAddToCart from "@/tools/interfaces/IAddToCart";
import { Button, Card, Col, Container, Form, FormControl, FormText, Row } from "react-bootstrap";
import styles from '../styles/addToCart.module.scss';
import { useEffect, useState } from "react";
import currencyFormatter from "@/tools/functions/currencyFormatter";

/** Quantity and Add to cart component for the product page. */
const AddToCart = ({product, selectedColor, onAddToCart}: IAddToCart) => {
    const [quantity, setQuantity] = useState<string>('1'); //--Using string, so we can use non-number values in situations.
    const [totalSalePrice, setTotalSalePrice] = useState<number>(0.00);
    const [totalOriginalPrice, setTotalOriginalPrice] = useState<number>(0.00);

    //===========================================================================================================================
    /**
     * Quantity input change handler. Makes sure that the entered characters are valid.
     * @param e Input change event data.
     */
    const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        if (val === '') {
            setQuantity(''); //--Temporary placeholder, handle in onblur.
            return;
        }

        //--Reject input that is not a positive integer.
        if (/^\d+$/.test(val) === false) { return; }

        setQuantity(val);
    }

    //===========================================================================================================================
    /** 
     * Quantity input blur handler. Checks the data current data and resets to one if failed. This handles situations like if the 
     * user deletes the contents but doesn't input new data. 
     */
    const onQuantityBlur = () => {
        //--Reset to 1 if Nan or less than 1.
        if (!quantity || quantity.trim() === '' || parseInt(quantity) < 1) {
            setQuantity('1');
        }
    };

    //===========================================================================================================================
    /**
     * Converts the string quantity to a number and runs the parent add to cart function.
     * @param e Add to cart form event.
     */
    const onAddToCartFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onAddToCart(Number(quantity));
    };

    //===========================================================================================================================
    /** Increases the quantity by one. */
    const onIncQuantity = () => {
        setQuantity((Number(quantity) + 1).toString());
    }

    //===========================================================================================================================
    /** Decreases the quantity by one if it's not already 1. */
    const onDecQuantity = () => {
        if (quantity === '1') { return; }

        setQuantity((Number(quantity) - 1).toString());
    }

    //===========================================================================================================================
    /** useEffect that updates the price labeling when the quantity changes. */
    useEffect(() => {
        if (quantity.trim() === '') {
            setTotalSalePrice(0.00);
            setTotalOriginalPrice(0.00);
        }

        setTotalSalePrice(parseInt(quantity) * product.salePrice);
        setTotalOriginalPrice(parseInt(quantity) * product.originalPrice);
    }, [product.originalPrice, product.salePrice, quantity])

    //===========================================================================================================================
    /** Reset the quantity back to '1' when a different color is selected. */
    useEffect(() => {
        setQuantity('1');
    }, [selectedColor])

    //===========================================================================================================================
    return(
        <Card data-bs-theme="light" className="position-relative">
            <Card.Header className="fs-5 fw-bold font-roboto">
                {
                    selectedColor !== undefined
                        ? selectedColor.name
                        : 'Please select a color first'
                }
            </Card.Header>
            <Card.Body>
                {
                    selectedColor &&
                    <Container>
                        <Row>
                            <Col>
                                <Form id="add-to-cart-form" onSubmit={onAddToCartFormSubmit}>
                                    <div className="d-flex justify-content-center align-items-center fs-3 font-roboto">
                                        <FormText className="fw-bold">Quantity</FormText>
                                        <FormText className="pi pi-minus fs-5 fw-bold ms-4" role="button" onClick={onDecQuantity}></FormText>
                                        <FormControl type="text" className={`ms-2 fw-bold text-center ${styles.quantityInput}`} name="quantity" value={quantity} onChange={onQuantityChange} onBlur={onQuantityBlur} style={{width: '75px'}}></FormControl>
                                        <FormText className="pi pi-plus fs-5 fw-bold ms-2" role="button" onClick={onIncQuantity}></FormText>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className={`rounded mt-3 ${styles.quantityAndPriceContainer}`}>
                                    <Container>
                                        <Row className="d-flex align-items-center p-4 font-roboto">
                                            <Col xs={12} lg="auto" className="text-center text-lg-start">
                                                <span className="fw-bold fs-2">{quantity}</span>
                                                <span className="ms-2 fs-5">tile(s)</span>
                                            </Col>
                                            <Col xs={6} className="text-center text-lg-end fw-bold flex-fill">Your Price</Col>
                                            <Col xs={6} lg="auto" className={`fw-bold mt-3 mt-lg-0 ${styles.yourPrice}`}>
                                                <div className="text-decoration-line-through">
                                                    {currencyFormatter.format(totalOriginalPrice)}
                                                </div>
                                                <div className="fs-4">
                                                    {currencyFormatter.format(totalSalePrice)}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="submit" form="add-to-cart-form" className="w-100 mt-3">ADD TO CART</Button>
                            </Col>
                        </Row>
                    </Container>
                }
            </Card.Body>
        </Card>
    )
}

export default AddToCart;
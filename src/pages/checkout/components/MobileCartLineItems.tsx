import useCartLineItems from "@/hooks/useCartLineItems";
import type ICheckoutCartLineItems from "@/tools/interfaces/ICheckoutCartLineItems";
import { Button, Card, Col, Container, FormControl, Image, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from '../styles/cartLineItems.module.scss';
import React from "react";
import currencyFormatter from "@/tools/functions/currencyFormatter";
import BusyIndicator from "@/pages/common/components/BusyIndicator";

/** Cart checkout page mobile line items component. */
const MobileCartLineItems = ({cart, onMoveNextProcess, onDeleteLineItem, onUpdateLineItem}: ICheckoutCartLineItems) => {
    const navigate = useNavigate();
    const {
        localQuantity,
        modifyingLineItem,
        showDeleteModal,
        lineItemToDelete, 
        computeMainProductImage,
        computeSwatchUrl,
        setShowDeleteModal,
        onQuantityChange,
        onQuantityBlur,
        onRequestDeleteLineItem,
        onDeleteLineItemApproved
    } = useCartLineItems({cart, onDeleteLineItem, onUpdateLineItem});
    
    //===========================================================================================================================
    return (
        <>
            <Card data-bs-theme="light" className="font-roboto">
                <Card.Header className="fw-bold fs-4">Cart</Card.Header>
                <Card.Body>
                    <Container>
                        {
                            cart?.lineItems.map((lineItem) => (
                                <React.Fragment key={lineItem.id}>
                                    <Row>
                                        <Col className={styles.productName} role="button" onClick={() => navigate(`/product/${lineItem.product.sku}`)}>
                                            {lineItem.product.productName}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={7}>
                                            <Image src={computeMainProductImage(lineItem.product.sku)} className="border border-black shadow" fluid onClick={() => navigate(`/product/${lineItem.product.sku}`)} />
                                        </Col>
                                        <Col xs={5} className="d-flex flex-column align-items-center">
                                            <Image src={computeSwatchUrl(lineItem)} width={75} />
                                            <span className="fs-7 mt-1">{lineItem.tag.name}</span>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col xs="auto">
                                            <div className="d-flex align-items-center">
                                                <span className="pi pi-chevron-left" role="button" onClick={() => onUpdateLineItem(lineItem, lineItem.quantity - 1)}></span>
                                                <FormControl type="input" value={localQuantity[lineItem.id] ?? ''} className="text-center" style={{width: '75px'}} onChange={(e) => onQuantityChange(e as React.ChangeEvent<HTMLInputElement>, lineItem)} onBlur={() => onQuantityBlur(lineItem)} />
                                                <span className="pi pi-chevron-right" role="button" onClick={() => onUpdateLineItem(lineItem, lineItem.quantity + 1)}></span>
                                            </div>
                                        </Col>
                                        <Col className="d-flex align-items-center justify-content-end">
                                            <span className="fs-7 text-muted text-decoration-line-through">{currencyFormatter.format(lineItem.totalOriginalPrice)}</span>
                                            <span className="ms-2 fw-bold fs-5">{currencyFormatter.format(lineItem.totalSalePrice)}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mt-2 border-bottom pb-2 mb-2 text-end">
                                            <Button className="pt-2 pb-1" style={{width: '50px'}} onClick={() => onRequestDeleteLineItem(lineItem)}>
                                                <span className="pi pi-trash" />
                                            </Button>
                                        </Col>
                                    </Row>

                                    {
                                        modifyingLineItem && <BusyIndicator />
                                    }
                                </React.Fragment>
                            ))
                        }
                    </Container>
                </Card.Body>
                <Card.Footer>
                    <Button className="w-100" onClick={onMoveNextProcess}>Next</Button>
                </Card.Footer>
            </Card>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header className="fs-4">
                    Delete {lineItemToDelete?.product.productName} - {lineItemToDelete?.tag.name}?
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this line item?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onDeleteLineItemApproved} style={{width: '100px'}}>Yes</Button>
                    <Button onClick={() => setShowDeleteModal(false)} style={{width: '100px'}}>No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MobileCartLineItems;
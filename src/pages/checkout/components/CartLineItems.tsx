import type ICheckoutCartLineItems from "@/tools/interfaces/ICheckoutCartLineItems";
import styles from '../styles/cartLineItems.module.scss';
import React from "react";
import currencyFormatter from "@/tools/functions/currencyFormatter";
import BusyIndicator from "@/pages/common/components/BusyIndicator";
import { useNavigate } from "react-router-dom";
import useCartLineItems from "@/hooks/useCartLineItems";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';

/** Cart checkout page line items component */
const CartLineItems = ({cart, onMoveNextProcess, onDeleteLineItem, onUpdateLineItem}: ICheckoutCartLineItems) => {
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
    return(
        <>
            <Card data-bs-theme="light">
                <Card.Body>
                    <div className={styles.lineItemContainer}>
                        {/* HEADER */}
                        <div className={`text-start ${styles.headerItem}`}>Cart</div>
                        <div className={styles.headerItem}>Quantity</div>
                        <div className={styles.headerItem}>Color</div>
                        <div className={styles.headerItem}>Subtotal</div>

                        {
                            cart?.lineItems.map((lineItem) => (
                                <React.Fragment key={lineItem.id}>
                                    {/* CONTENT ROW */}
                                    <div className="d-flex gap-4">
                                        <div role="button" onClick={() => navigate(`/product/${lineItem.product.sku}`)}>
                                            <Image src={computeMainProductImage(lineItem.product.sku)} className="border border-black shadow" width={250} />
                                        </div>
                                        <div className="d-flex flex-column justify-content-between">
                                            <div className={`fs-5 ${styles.productName}`} role="button" onClick={() => navigate(`/product/${lineItem.product.sku}`)}>
                                                {lineItem.product.productName}
                                            </div>
                                            <div className="fw-bold">
                                                <div className="text-green">In Stock</div>
                                                <div>{lineItem.product.shipType}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center d-flex align-items-start px-3">
                                        <div className="d-flex align-items-center">
                                            <span className="pi pi-chevron-left" role="button" onClick={() => onUpdateLineItem(lineItem, lineItem.quantity - 1)}></span>
                                            <FormControl type="input" value={localQuantity[lineItem.id] ?? ''} className="text-center" style={{width: '75px'}} onChange={(e) => onQuantityChange(e as React.ChangeEvent<HTMLInputElement>, lineItem)} onBlur={() => onQuantityBlur(lineItem)} />
                                            <span className="pi pi-chevron-right" role="button" onClick={() => onUpdateLineItem(lineItem, lineItem.quantity + 1)}></span>
                                        </div>
                                    </div>
                                    <div className="text-center fs-7" style={{maxWidth: '150px'}}>
                                        <div>
                                            <Image src={computeSwatchUrl(lineItem)} width={75} fluid />
                                        </div>
                                        <div className="mt-2">
                                            {lineItem.tag.name}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-end px-3">
                                            <div className="fw-bold fs-5">{currencyFormatter.format(lineItem.totalSalePrice)}</div>
                                            <div className="fs-7 text-muted text-decoration-line-through">{currencyFormatter.format(lineItem.totalOriginalPrice)}</div>
                                            <div className="fw-bold fs-7 text-green">Saved {lineItem.savingsPercentageAtSale}%</div>
                                        </div>
                                    </div>

                                    {/* CONTENT FOOTER */}
                                    <div className={styles.footerItem}>
                                        {/* Reserved space for special information, probably not in demo */}
                                    </div>
                                    <div className={`${styles.footerItem}`} style={{gridColumn: 'span 3'}}>
                                        <Button className="d-flex ms-auto align-items-center justify-content-center" onClick={() => onRequestDeleteLineItem(lineItem)} style={{width: '75px'}}>
                                            <span className="pi pi-trash"></span>
                                        </Button>
                                    </div>

                                    {
                                        modifyingLineItem && <BusyIndicator />
                                    }
                                </React.Fragment>
                            ))
                        }
                    </div>
                </Card.Body>
                <Card.Footer className="text-end">
                    <Button onClick={onMoveNextProcess} style={{width: '150px'}}>Next</Button>
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

export default CartLineItems;
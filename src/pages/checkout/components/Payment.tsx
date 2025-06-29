import styles from '../styles/payment.module.scss';
import RequiredFieldLabel from "@/pages/common/components/RequiredFieldLabel";
import type ICheckoutPaymentProps from "@/tools/interfaces/ICheckoutPaymentProps";
import onCommonHandleChange from "@/tools/functions/onHandleChange";
import { useCallback, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import MaskedControl from '@/behaviors/maskedControl/MaskedControl';

/** Payment wizard section for checkout. */
const Payment = ({onMovePrevProcess, checkoutPayment, setCheckoutPayment, setCheckoutPaymentIsValid}: ICheckoutPaymentProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    //===========================================================================================================================
    /**
     * Change handler for the payment information form.
     */
    const onHandleChange = (
        e: { target: { name: string, value: string, type?: string}}) => {
        onCommonHandleChange(e, setCheckoutPayment);
    };

    //===========================================================================================================================
    /** Function used to validate the payment form and set the validity of the payment wizard step. */
    const onVerifyForm = useCallback(() => {
        if (formRef.current) {
            if (formRef.current.reportValidity() === false) {
                formRef.current.classList.add('was-validated');
                setCheckoutPaymentIsValid(false);
                return false;
            } else {
                setCheckoutPaymentIsValid(true);
                return true;
            }
        }
    }, [setCheckoutPaymentIsValid])

    //===========================================================================================================================
    /** Event handler for the request to move to previous step in the wizard, however validates the for before allowing. */
    const onMovePrevRequest = () => {
        if (onVerifyForm() === true) {
            onMovePrevProcess();
        }
    }

    //===========================================================================================================================
    /** 
     * Watches the checkout payment data and attempts a verification as soon as the user enters in all the information. We want
     * to do this so that we can trigger the validity stateful object values so the complete checkout button can be turned on
     * without having the user have to click on the 'previous' button or some other unnecessary step.
    */
    useEffect(() => {
        if (checkoutPayment.cardNumber.trim() !== '' &&
            checkoutPayment.nameOnCard.trim() !== '' &&
            checkoutPayment.expirationDate.trim() !== '' &&
            checkoutPayment.cvv.trim() !== '') {
                onVerifyForm();
            }
    }, [checkoutPayment.cardNumber, checkoutPayment.cvv, checkoutPayment.expirationDate, checkoutPayment.nameOnCard, onVerifyForm])

    //===========================================================================================================================
    return (
        <div className="d-flex justify-content-center">
            <div>
                <Card data-bs-theme="light" className={`font-roboto w-100 ${styles.paymentCard}`}>
                    <Card.Header className="fw-bold fs-5">Payment</Card.Header>
                    <Card.Body>
                        <Form ref={formRef} noValidate>
                            <Container className="px-0">
                                <Row>
                                    <Col>
                                        <FloatingLabel label={<RequiredFieldLabel label="Card Number" />}>
                                            <Form.Control type="text" required name="cardNumber" value={checkoutPayment.cardNumber} onChange={onHandleChange} placeholder="" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        <FloatingLabel label={<RequiredFieldLabel label="Name as on card" />}>
                                            <Form.Control type="text" required name="nameOnCard" value={checkoutPayment.nameOnCard} onChange={onHandleChange} placeholder="" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col xs={8}>
                                        <FloatingLabel label={<RequiredFieldLabel label="Expiration" />}>
                                            <MaskedControl mask="expiry" required name="expirationDate" value={checkoutPayment.expirationDate} onChange={onHandleChange} placeholder="" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs={4}>
                                        <FloatingLabel label={<RequiredFieldLabel label="CVV" />}>
                                            <Form.Control type="text" required name="cvv" value={checkoutPayment.cvv} onChange={onHandleChange} maxLength={3} placeholder="" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="text-end mt-2">
                    <Button onClick={onMovePrevRequest} style={{width: '150px'}}>Previous</Button>
                </div>
            </div>
        </div>
    )    
}

export default Payment;
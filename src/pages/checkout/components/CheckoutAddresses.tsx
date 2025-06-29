import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import FormControl from 'react-bootstrap/FormControl';
import type ICheckoutAddressesProps from "@/tools/interfaces/ICheckoutAddressesProps";
import onCommonHandleChange from "@/tools/functions/onHandleChange";
import type ICheckoutAddresses from "@/tools/interfaces/ICheckoutAddresses";
import getEnumTypes from "@/tools/functions/getEnumTypes";
import USState from "@/tools/enums/USState";
import { useCallback, useRef } from "react";
import { FloatingLabel } from "react-bootstrap";
import RequiredFieldLabel from "@/pages/common/components/RequiredFieldLabel";
import MaskedControl from "@/behaviors/maskedControl/MaskedControl";

/** Shipping/Billing wizard section for the checkout component. */
const CheckoutAddresses = ({
    onMovePrevProcess, 
    onMoveNextProcess, 
    checkoutAddresses, 
    setCheckoutAddresses,
    setCheckoutAddressesIsValid}: ICheckoutAddressesProps) => {

    //===========================================================================================================================
    const shippingFormRef = useRef<HTMLFormElement>(null);
    const billingFormRef = useRef<HTMLFormElement>(null);

    //===========================================================================================================================
    /** Change handler for form elements. */
    const onHandleChange = (
        e: { target: { name: string, value: string, type?: string}}) => {
        onCommonHandleChange<ICheckoutAddresses>(e, setCheckoutAddresses);
    }

    //===========================================================================================================================
    /** Verifies that required fields were filled in the forms. */
    const onVerifyForms = useCallback(() => {
        let shippingFormIsValid = false;
        let billingFormIsValid = false;

        if (shippingFormRef.current && billingFormRef.current) {
            //--Shipping form
            if (shippingFormRef.current.reportValidity() === false) {
                shippingFormRef.current.classList.add('was-validated');
            } else {
                shippingFormIsValid = true;
            }

            //--Billing form
            if (checkoutAddresses.billingIsSameAsShipping === false) {
                if (billingFormRef.current.reportValidity() === false) {
                    billingFormRef.current.classList.add('was-validated');
                } else {
                    billingFormIsValid = true;
                }
            } else {
                //--Since 'same' as shipping, it's only valid if shipping is.
                billingFormIsValid = shippingFormIsValid;
            }

            setCheckoutAddressesIsValid(shippingFormIsValid && billingFormIsValid);
            return shippingFormIsValid && billingFormIsValid;
        }
    }, [checkoutAddresses.billingIsSameAsShipping, setCheckoutAddressesIsValid])

    //===========================================================================================================================
    /** Event handler to check that the user has completely filled the values before navigating back in wizard. */
    const onMovePrevRequest = () => {
        if (onVerifyForms()) {
            onMovePrevProcess();
        }
    }

    //===========================================================================================================================
    /** Event handler to check that the user has completely filled the values before navigating forward in the wizard. */
    const onMoveNextRequest = () => {
        if (onVerifyForms()) {
            onMoveNextProcess();
        }
    }

    //===========================================================================================================================
    return(
        <Container className="px-0">
            <Row>
                <Col xs={12} lg={6}>
                    <Card data-bs-theme="light" className="font-roboto shadow">
                        <Card.Header className="fw-bold fs-5">Shipping</Card.Header>
                        <Card.Body>
                            <Form ref={shippingFormRef}>
                                <Container className="px-0">
                                    <Row>
                                        <Col>
                                            <FloatingLabel label={<RequiredFieldLabel label="Email Address" />}>
                                                <FormControl type="text" required name="shipping.email" value={checkoutAddresses.shipping.email} onChange={onHandleChange} placeholder="Email Address" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row><Col><hr /></Col></Row>
                                    <Row>
                                        <Col>
                                            <FloatingLabel label={<RequiredFieldLabel label="First Name" />}>
                                                <FormControl type="text" required name="shipping.firstName" value={checkoutAddresses.shipping.firstName} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel label="Last Name">
                                                <FormControl type="text" name="shipping.lastName" value={checkoutAddresses.shipping.lastName} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col xs={8}>
                                            <FloatingLabel label={<RequiredFieldLabel label="Address" />}>
                                                <FormControl type="text" required name="shipping.address" value={checkoutAddresses.shipping.address} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={4}>
                                            <FloatingLabel label="Ste/Apt">
                                                <FormControl type="text" name="shipping.suiteApt" value={checkoutAddresses.shipping.suiteApt} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col xs={6} lg={4}>
                                            <FloatingLabel label={<RequiredFieldLabel label="City" />}>
                                                <FormControl type="text" required name="shipping.city" value={checkoutAddresses.shipping.city} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={6} lg={4}>
                                            <FloatingLabel label={<RequiredFieldLabel label="State" />}>
                                                <Form.Select required name="shipping.state" value={checkoutAddresses.shipping.state} onChange={onHandleChange}>
                                                    <option value="" disabled>Select</option>
                                                    {
                                                        getEnumTypes(USState).map((state) => (
                                                            <option key={state.Abbr} value={state.Abbr}>{state.Name}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={6} className="d-lg-none"></Col>
                                        <Col xs={6} lg={4} className="mt-2 mt-lg-0">
                                            <FloatingLabel label={<RequiredFieldLabel label="ZipCode" />}>
                                                <FormControl type="text" required name="shipping.zipCode" value={checkoutAddresses.shipping.zipCode} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <FloatingLabel label={<RequiredFieldLabel label="Phone Number" />}>
                                                <MaskedControl mask="phone" required name="shipping.phoneNumber" value={checkoutAddresses.shipping.phoneNumber} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} lg={6} className="mt-3 mt-lg-0">
                    <Card data-bs-theme="light" className="font-roboto shadow">
                        <Card.Header className="fw-bold fs-5 d-flex justify-content-between align-items-end">
                            <span>Billing</span>
                            <FormCheck label="Same as shipping" name="billingIsSameAsShipping" checked={checkoutAddresses.billingIsSameAsShipping} onChange={onHandleChange} className="fs-6" />
                        </Card.Header>
                        <Card.Body>
                            <Form ref={billingFormRef} className={checkoutAddresses.billingIsSameAsShipping ? 'd-none' : ''}>
                                <Container className="px-0">
                                    <Row>
                                        <Col>
                                            <FloatingLabel label={<RequiredFieldLabel label="Email Address" />}>
                                                <FormControl type="text" required name="billing.email" value={checkoutAddresses.billing.email} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row><Col><hr /></Col></Row>
                                    <Row>
                                        <Col>
                                            <FloatingLabel label={<RequiredFieldLabel label="First Name" />}>
                                                <FormControl type="text" required name="billing.firstName" value={checkoutAddresses.billing.firstName} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel label="Last Name">
                                                <FormControl type="text" name="billing.lastName" value={checkoutAddresses.billing.lastName} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col xs={8}>
                                            <FloatingLabel label={<RequiredFieldLabel label="Address" />}>
                                                <FormControl type="text" required name="billing.address" value={checkoutAddresses.billing.address} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={4}>
                                            <FloatingLabel label="Ste/Apt">
                                                <FormControl type="text" name="billing.suiteApt" value={checkoutAddresses.billing.suiteApt} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <FloatingLabel label={<RequiredFieldLabel label="City" />}>
                                                <FormControl type="text" required name="billing.city" value={checkoutAddresses.billing.city} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel label={<RequiredFieldLabel label="State" />}>
                                                <Form.Select required name="billing.state" value={checkoutAddresses.billing.state} onChange={onHandleChange}>
                                                    <option value="" disabled>Select</option>
                                                    {
                                                        getEnumTypes(USState).map((state) => (
                                                            <option key={state.Abbr} value={state.Abbr}>{state.Name}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel label={<RequiredFieldLabel label="ZipCode" />}>
                                                <FormControl type="text" required name="billing.zipCode" value={checkoutAddresses.billing.zipCode} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <FloatingLabel label={<RequiredFieldLabel label="Phone Number" />}>
                                                <MaskedControl mask="phone" required name="billing.phoneNumber" value={checkoutAddresses.billing.phoneNumber} onChange={onHandleChange} placeholder="" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="text-end mt-3 d-flex d-lg-block justify-content-between">
                        <Button style={{width: '150px'}} onClick={onMovePrevRequest}>Previous</Button>
                        <Button className="ms-3" style={{width: '150px'}} onClick={onMoveNextRequest}>Next</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default CheckoutAddresses;
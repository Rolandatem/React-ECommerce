import SectionLabel from "../common/components/SectionLabel";
import ContactReason from "@/tools/enums/ContactReason";
import RequiredFieldLabel from "../common/components/RequiredFieldLabel";
import { IMaskInput } from "react-imask";
import styles from './styles/ContactUs.module.scss';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import type IContactForm from "@/tools/interfaces/IContactForm";
import onCommonHandleChange from "@/tools/functions/onHandleChange";
import capitalize from "@/tools/functions/capatilize";
import getEnumTypes from "@/tools/functions/getEnumTypes";

/** Allowable contact methods, used to generate radio buttons on contact form. */
const contactMethods = [
    'email',
    'phone'
]

//===========================================================================================================================
/** Default values for contact form. */
const initForm: IContactForm = {
    reasonForContact: getEnumTypes(ContactReason)[0].Key,
    email: '',
    subject: '',
    contactMethod: contactMethods[0],
    firstName: '',
    lastName: '',
    phone: '',
    description: ''
}

//===========================================================================================================================
const ContactUs = () => {
    const [contactForm, setContactForm] = useState<IContactForm>(initForm);
    const [contactFormSubmittedModalIsVisible, setContactFormSubmittedModalIsVisible] = useState<boolean>(false);

    //===========================================================================================================================
    /**
     * Contact form submit handler.
     * @param e React form event.
     */
    const onContactFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //--Do stuff with contactForm.

        setContactForm(initForm);
        setContactFormSubmittedModalIsVisible(true);
    }

    //===========================================================================================================================
    /**
     * State value change handler for the contact form.
     * @param e React change event.
     */
    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        onCommonHandleChange<IContactForm>(e, setContactForm);
    }

    //===========================================================================================================================
    return (
        <>

            <SectionLabel label="Contact Us" />
            <Container className="text-dark mt-2">
                <Row>
                    <Col xs={12} className="text-md-center fs-5 fs-md-4">
                        Use the contact form to send us a message or review our contact 
                        information for further assistance.
                    </Col>
                </Row>
                <Row className="mt-4" data-bs-theme="light">
                    <Col xs={12} lg={6} className="border-end">
                        <Container>
                            <Row>
                                <Col xs={12} lg={6} className="px-0 px-lg-2">
                                    <Card className="shadow">
                                        <Card.Header className="fw-bold fs-5">Contact Information</Card.Header>
                                        <Card.Body>
                                            <table className="border-separate border-spacing-1">
                                                <tbody>
                                                    {/* HOURS */}
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <div className="fw-bold fs-5">Martinez Flooring</div>
                                                            <div className="fw-bold">Hours (All times ET)</div>
                                                            <div>MON - FRI 9am - 7pm</div>
                                                            <div>WEEKENDS 9am - 6pm</div>
                                                        </td>
                                                    </tr>

                                                    {/* PHONE */}
                                                    <tr>
                                                        <td className="pi pi-phone"></td>
                                                        <td>
                                                            <div className="fw-bold fs-6">Phone</div>
                                                            <div>(800) 555-1212</div>
                                                        </td>
                                                    </tr>

                                                    {/* TEXT */}
                                                    <tr>
                                                        <td className="pi pi-mobile"></td>
                                                        <td>
                                                            <div className="fw-bold fs-6">Text</div>
                                                            <div>(800) 555-9999</div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Card.Body>
                                    </Card>

                                    <Card data-bs-theme="dark" className="shadow mt-3">
                                        <Card.Header className="fw-bold fs-5">Holiday Closures</Card.Header>
                                        <Card.Body>
                                            <table className="border-separate border-spacing-2">
                                                <tbody>
                                                    <tr>
                                                        <td>Jan 1</td>
                                                        <td className="fw-bold">New Years Day</td>
                                                    </tr>
                                                    <tr>
                                                        <td>May 26</td>
                                                        <td className="fw-bold">Memorial Day</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Jul 4</td>
                                                        <td className="fw-bold">Independence Day</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Sep 1</td>
                                                        <td className="fw-bold">Labor Day</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nov 27</td>
                                                        <td className="fw-bold">Thanksgiving Day</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dec 25</td>
                                                        <td className="fw-bold">Christmas Day</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} lg={6} className="px-0 px-lg-2 mt-3 mt-lg-0">
                                    <Card className="shadow">
                                        <Card.Header className="fw-bold fs-5">Corporate Address</Card.Header>
                                        <Card.Body>
                                            <table className="border-separate border-spacing-1">
                                                <tbody>
                                                    <tr>
                                                        <td className="pi pi-map-marker"></td>
                                                        <td>
                                                            <div>123 W. Center Parkway</div>
                                                            <div>Phoenix, AZ 85001</div>
                                                        </td>
                                                    </tr>
                                                    <tr><td colSpan={2} className="mt-3"></td></tr>
                                                    <tr>
                                                        <td className="pi pi-map-marker"></td>
                                                        <td>
                                                            <div className="fw-bold fs-6">Mailing Address</div>
                                                            <div>PO BOX 12345</div>
                                                            <div>Phoenix, AZ 85001</div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>

                    <Col xs={12} lg={6}>
                        <Card className="mt-3 mt-lg-0">
                            <Card.Header className="fw-bold fs-5">Contact Form</Card.Header>
                            <Card.Body>
                                <Form onSubmit={onContactFormSubmit}>
                                    <FloatingLabel label={<RequiredFieldLabel label="Reason for Contact" />}>
                                        <Form.Select required id="reason-for-contact" name="reasonForContact" value={contactForm.reasonForContact} onChange={onHandleChange}>
                                            {
                                                getEnumTypes(ContactReason).map(reason => (
                                                    <option key={reason.Key} value={reason.Key}>
                                                        {reason.Text}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                    <FloatingLabel className="mt-2" label={<RequiredFieldLabel label="Email" />}>
                                        <Form.Control type="email" required placeholder="" name="email" value={contactForm.email} onChange={onHandleChange} />
                                    </FloatingLabel>
                                    <FloatingLabel className="mt-2" label={<RequiredFieldLabel label="Subject" />}>
                                        <Form.Control type="text" required placeholder="" name="subject" value={contactForm.subject} onChange={onHandleChange} />
                                    </FloatingLabel>

                                    <div className="mt-3">How would you like us to contact you?</div>
                                    {
                                        contactMethods.map(method => (
                                            <Form.Check key={method} type="radio" name="contactMethod" value={method} checked={contactForm.contactMethod === method} onChange={onHandleChange} id={`contact-method-${method}`} inline label={capitalize(method)} />
                                        ))
                                    }

                                    <FloatingLabel className="mt-3" label={<RequiredFieldLabel label="First Name" />}>
                                        <Form.Control type="text" required placeholder="" name="firstName" value={contactForm.firstName} onChange={onHandleChange} />
                                    </FloatingLabel>
                                    <FloatingLabel className="mt-2" label={<RequiredFieldLabel label="Last Name" />}>
                                        <Form.Control type="text" required placeholder="" name="lastName" value={contactForm.lastName} onChange={onHandleChange} />
                                    </FloatingLabel>

                                    <FloatingLabel className="mt-3" label="Phone">
                                        <IMaskInput mask="(000) 000-0000" className="form-control" placeholder="" name="phone" value={contactForm.phone} onAccept={(value: string) => setContactForm(prev => ({...prev, phone: value}))} />
                                    </FloatingLabel>
                                    <Form.Text muted>(XXX) XXX-XXXX</Form.Text>

                                    <FloatingLabel className="mt-3" label={<RequiredFieldLabel label="Description" />}>
                                        <Form.Control as="textarea" required rows={5} placeholder="" className={styles.contactFormDescription} name="description" value={contactForm.description} onChange={onHandleChange} />
                                    </FloatingLabel>

                                    <Button variant="primary" type="submit" className="mt-3 w-100">Submit Form</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={contactFormSubmittedModalIsVisible} onHide={() => setContactFormSubmittedModalIsVisible(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Form Submitted</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Thank you for submitting your issue. We will review this and get back
                    to you as soon as possible.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setContactFormSubmittedModalIsVisible(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default ContactUs;
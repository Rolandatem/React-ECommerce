import { useNavigate } from "react-router-dom";
import { type IComponentClass } from "@/tools/interfaces";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import styles from '../styles/NonMobileFooterContent.module.scss';
import NewsletterSignup from "./NewsletterSignup";


const NonMobileFooterContent: React.FC<IComponentClass> = (props) => {
    const navigate = useNavigate();

    return (
        <Row className={`${props.className} py-3`}>
            <Col className="ms-5">
                <div className="fw-bold mb-2">Quick Links</div>
                <div role="button" className={styles.footerLinkButton} onClick={() => navigate('/contactus')}>Contact Us</div>
                <div role="button" className={styles.footerLinkButton} onClick={() => navigate('/aboutus')}>About Us</div>
                <div role="button" className={styles.footerLinkButton} onClick={() => navigate('/faqs')}>FAQs</div>
            </Col>
            
            <Col>
                <div className="fw-bold mb-2">Newsletter</div>
                <NewsletterSignup />
            </Col>
            
            <Col className="me-5 text-end">
                <div className="fw-bold mb-2">Martinez Flooring</div>
                <div className="text-muted">
                    <div>123 W. Center Parkway</div>
                    <div>Phoenix, AZ 85001</div>
                    <div role="button" className="text-decoration-underline" onClick={() => navigate('/contactus')}>e.customerservice@martinezflooring.com</div>
                </div>
            </Col>
        </Row>
    )
}

export default NonMobileFooterContent;
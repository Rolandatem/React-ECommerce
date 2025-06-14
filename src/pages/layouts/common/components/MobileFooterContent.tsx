import type React from 'react';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import NewsletterSignup from './NewsletterSignup';
import type IComponentClass from '@/tools/interfaces/IComponentClass';

/**
 * Footer content for mobile pages.
 */
const MobileFooterContent: React.FC<IComponentClass> = (props) => {
    const navigate = useNavigate();

    //===========================================================================================================================
    return (
        <Accordion flush className={props.className}>

            <Accordion.Item eventKey="0">
                <Accordion.Header>Quick Links</Accordion.Header>
                <Accordion.Body>
                    <div role='button' onClick={() => navigate('/contactus')}>Contact Us</div>
                    <div role='button' onClick={() => navigate('/aboutus')}>About Us</div>
                    <div role='button' onClick={() => navigate('/faqs')}>FAQs</div>
                </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="1">
                <Accordion.Header>Newsletter</Accordion.Header>
                <Accordion.Body>
                    <NewsletterSignup />
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header>Martinez Flooring</Accordion.Header>
                <Accordion.Body>
                    <div>123 W. Center Parkway</div>
                    <div>Phoenix, AZ 85001</div>
                    <div>p.(800)555-1212</div>
                    <div role="button" className="text-decoration-underline" onClick={() => navigate('/contactus')}>e.customerservice@martinezflooring.com</div>
                </Accordion.Body>
            </Accordion.Item>

        </Accordion>
    )
}

export default MobileFooterContent;
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import MobileFooterContent from "./MobileFooterContent";
import FooterContent from "./FooterContent";
import type { INewsletterProps } from "@/tools/interfaces";
import { NewsletterContext, SiteSettingsContext } from "@/tools/contexts";

const CommonLayoutFooter = () => {
    const [newsletterEmail, setNewsletterEmail] = useState<string>();
    const [showNewsletterDialog, setShowNewsLetterDialog] = useState<boolean>(false);

    const siteSettings = useContext(SiteSettingsContext);
    
    const joinNewsletter = (e:React.FormEvent<HTMLFormElement>) => {
        //const formData = new FormData(e.currentTarget);
        setShowNewsLetterDialog(true);
        e.preventDefault();
    }

    const closeNewsletterDialog = () => {
        setShowNewsLetterDialog(false);
        setNewsletterEmail('');
    }

    const commonProps : INewsletterProps = {
        joinNewsletter: joinNewsletter,
        email: {
            getter: newsletterEmail,
            setter: setNewsletterEmail
        }
    }

    return (
        <>
            <Container fluid className="bg-dark">
                <NewsletterContext.Provider value={commonProps}>
                    { 
                        siteSettings?.isMobile 
                            ? <MobileFooterContent className="mt-5" /> 
                            : <FooterContent className="mt-5" /> 
                    }
                </NewsletterContext.Provider>
            </Container>

            <Modal show={showNewsletterDialog} onHide={closeNewsletterDialog} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Newsletter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Thank you for joining our newletter!</p>
                    <p>You should receive updates at: {newsletterEmail}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bg-secondary" onClick={closeNewsletterDialog}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CommonLayoutFooter;
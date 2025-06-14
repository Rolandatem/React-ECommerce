import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";

/**
 * Page displayed to user when a unidentified page is requested.
 */
const NotFound404 = () => {
    const navigate = useNavigate();
    const siteSettings = useContext(SiteSettingsContext);

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card data-bs-theme="light" className="shadow-sm" border="secondary" style={{width: '800px'}}>
                <Card.Header className="d-flex justify-content-center">
                    <svg width="60px" height="60px" viewBox="-3.6 -3.6 43.20 43.20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <circle fill="#FFCB4C" cx="18" cy="17.018" r="17"></circle>
                            <path fill="#000000" d="M14.524 21.036a.914.914 0 0 1-.312-.464a.799.799 0 0 1 .59-1.021c4.528-1.021 7.577 1.363 7.706 1.465c.384.306.459.845.173 1.205c-.286.358-.828.401-1.211.097c-.11-.084-2.523-1.923-6.182-1.098a.91.91 0 0 1-.764-.184z"></path>
                            <ellipse fill="#000000" cx="13.119" cy="11.174" rx="2.125" ry="2.656"></ellipse>
                            <ellipse fill="#000000" cx="24.375" cy="12.236" rx="2.125" ry="2.656"></ellipse>
                            <path fill="#F19020" d="M17.276 35.149s1.265-.411 1.429-1.352c.173-.972-.624-1.167-.624-1.167s1.041-.208 1.172-1.376c.123-1.101-.861-1.363-.861-1.363s.97-.4 1.016-1.539c.038-.959-.995-1.428-.995-1.428s5.038-1.221 5.556-1.341c.516-.12 1.32-.615 1.069-1.694c-.249-1.08-1.204-1.118-1.697-1.003c-.494.115-6.744 1.566-8.9 2.068l-1.439.334c-.54.127-.785-.11-.404-.512c.508-.536.833-1.129.946-2.113c.119-1.035-.232-2.313-.433-2.809c-.374-.921-1.005-1.649-1.734-1.899c-1.137-.39-1.945.321-1.542 1.561c.604 1.854.208 3.375-.833 4.293c-2.449 2.157-3.588 3.695-2.83 6.973c.828 3.575 4.377 5.876 7.952 5.048l3.152-.681z"></path>
                            <path fill="#000000" d="M9.296 6.351a.925.925 0 0 1-.391-.399a.8.8 0 0 1 .393-1.112c4.266-1.831 7.699-.043 7.843.034c.433.231.608.747.391 1.154c-.216.405-.74.546-1.173.318c-.123-.063-2.832-1.432-6.278.047a.915.915 0 0 1-.785-.042zm12.135 3.75a.924.924 0 0 1-.362-.424a.8.8 0 0 1 .468-1.084c4.381-1.536 7.685.48 7.823.567c.415.26.555.787.312 1.178c-.242.39-.776.495-1.191.238c-.12-.072-2.727-1.621-6.267-.379a.924.924 0 0 1-.783-.096z"></path>
                        </g>
                    </svg>
                    <span className="fs-1 fw-bold">HMM...</span>
                </Card.Header>
                <Card.Body className="fs-5 fs-md-4">
                    Sorry but we're not able to find the page that you have requested.
                    Please check the address or go to one of the locations below.
                </Card.Body>
                <Card.Footer className="text-center">
                    <ButtonGroup vertical={siteSettings?.isMobile}>
                        <Button variant="dark" style={{width: '200px'}} onClick={() => navigate(-1)}>GO BACK</Button>
                        <Button variant="dark" style={{width: '200px'}} onClick={() => navigate('/')}>HOMEPAGE</Button>
                        <Button variant="dark" style={{width: '200px'}} onClick={() => navigate('/contactus')}>CONTACT US</Button>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default NotFound404;
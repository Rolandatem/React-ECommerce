import styles from '../styles/commonLayoutHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';

const CommonLayoutHeader = () => {
    const navigate = useNavigate();

    return (
        <Navbar bg='dark' data-bs-theme="dark" expand="sm">
            <Container fluid>
                
                {/* COMPANY BRAND */}
                <Col xs="2">
                    <div onClick={() => navigate('/')} role='button' className={`d-inline ${styles.brand}`}>
                        <span className='pi pi-building-columns'></span>
                        <span className='ms-2 d-none d-sm-inline'>Martinez Flooring</span>
                    </div>
                </Col>

                {/* NAVIGATION */}
                <Col className='text-center'>
                    <Navbar.Toggle className=''></Navbar.Toggle>
                    <Navbar.Collapse className='justify-content-center'>
                        <Nav>
                            <NavDropdown title='Flooring by Category'>
                                <NavDropdown.Item onClick={() => navigate('/vinyl')}>
                                    Vinyl
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    Hardwood
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Resources">
                                <NavDropdown.Item>
                                    resource 1
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    resource 2
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link onClick={() => navigate('/contactus')}>
                                Contact Us
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Col>

                {/* SHOPPING CART */}
                <Col className='text-end' xs="2">
                    <div role='button' className='d-inline'>
                        <span className={`pi pi-shopping-cart ${styles.cart}`}></span>
                        <Badge pill>9</Badge>
                    </div>
                </Col>

            </Container>
        </Navbar>
    )
}

export default CommonLayoutHeader;
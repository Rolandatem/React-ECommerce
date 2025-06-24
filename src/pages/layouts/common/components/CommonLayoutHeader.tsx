import styles from '../styles/commonLayoutHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import useCategories from '@/hooks/useCategories';
import { useEffect, useState } from 'react';
import type ICommonLayoutHeaderProps from '@/tools/interfaces/ICommonLayoutHeaderProps';

/**
 * Footer component used for the Common Layout component.
 */
const CommonLayoutHeader = ({cartQuantity}: ICommonLayoutHeaderProps) => {
    //===========================================================================================================================
    const navigate = useNavigate();
    const { categories, loadCategories } = useCategories();
    const [navBarIsExpanded, setNavBarIsExpanded] = useState<boolean>(false);

    //===========================================================================================================================
    /**
     * Navigates the user to the specified url and closes the hamburger
     * menu when in mobile mode so it doesn't look goofy.
     * @param url Address to navigate to.
     */
    const navigateTo = (url: string) => {
        navigate(url);
        setNavBarIsExpanded(false);
    }

    //===========================================================================================================================
    /** Because of the above function we need to handle the toggle event now. */
    const onNavbarToggle = () => {
        setNavBarIsExpanded(!navBarIsExpanded);
    }

    //===========================================================================================================================
    useEffect(() => {
        const loader = async() => {
            await loadCategories();
        }

        loader();
    }, [loadCategories])

    //===========================================================================================================================
    return (
        <>
            <Navbar bg='dark' data-bs-theme="dark" expand="md" expanded={navBarIsExpanded} onToggle={onNavbarToggle}>
                <Container fluid className='align-items-start'>
                    
                    {/* COMPANY BRAND */}
                    <Col xs={2} md={3} className={styles.leftSideHeader}>
                        <div onClick={() => navigateTo('/')} role='button' className={styles.brand}>
                            <span className='pi pi-building-columns'></span>
                            <span className='ms-2 d-none d-lg-inline font-roboto'>Martinez Flooring</span>
                        </div>
                    </Col>

                    {/* NAVIGATION */}
                    <Col className='text-center'>
                        <Navbar.Toggle></Navbar.Toggle>
                        <Navbar.Collapse className='justify-content-center'>
                            <Nav>
                                <NavDropdown title='Flooring by Category'>
                                    {
                                        categories.map((cat) => (
                                            <NavDropdown.Item key={cat.id} onClick={() => navigateTo(`/list/${cat.id === 0 ? 'all' : cat.id}`)} className='text-wrap'>
                                                {cat.name}
                                            </NavDropdown.Item>
                                        ))
                                    }
                                </NavDropdown>
                                <NavDropdown title="Resources">
                                    <NavDropdown.Item onClick={() => navigateTo('/faqs')}>
                                        FAQ
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link className='text-nowrap' onClick={() => navigateTo('/contactus')}>
                                    Contact Us
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>

                    {/* SHOPPING CART */}
                    <Col xs={2} md={3} className={styles.rightSideHeader}>
                        <div role='button' className='d-inline'>
                            <span className={`pi pi-shopping-cart ${styles.cart}`}></span>
                            <Badge pill>{cartQuantity}</Badge>
                        </div>
                    </Col>

                </Container>
            </Navbar>
        </>
    )
}

export default CommonLayoutHeader;
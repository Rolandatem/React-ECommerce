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
import { type ICategory } from '@/tools/interfaces';
import ShopByCategoryDemoModal from '@/pages/common/components/ShopByCategoryDemoModal';

/**
 * Footer component used for the Common Layout component.
 */
const CommonLayoutHeader = () => {
    //===========================================================================================================================
    const navigate = useNavigate();
    const { categories } = useCategories();
    const [displayCategories, setDisplayCategories] = useState<ICategory[]>([]);
    const [demoCategoryModalIsVisible, setDemoCategoryModalIsVisible] = useState<boolean>(false);

    //===========================================================================================================================
    /**
     * Checks the list page url passed in, for demo purposes only the
     * 'product/all' list page url is accepted, otherwise a modal
     * explaining this to the user is displayed.
     * @param listPageUrl List page url to send the user to.
     */
    const goToListPage = (listPageUrl: string) => {
        if (listPageUrl !== 'product/all') {
            setDemoCategoryModalIsVisible(true);
            return;
        }

        navigate(listPageUrl);
    }

    //===========================================================================================================================
    useEffect(() => {
        //--Add 'All Flooring' category option.
        setDisplayCategories([{
            id: 0,
            name: 'All Flooring',
            imageUrl: 'categories/all_flooring.webp',
            listPageUrl: 'product/all'
        }, ...categories]);
    }, [categories])

    //===========================================================================================================================
    return (
        <>
            <Navbar bg='dark' data-bs-theme="dark" expand="md">
                <Container fluid className='align-items-start'>
                    
                    {/* COMPANY BRAND */}
                    <Col xs="3" className={styles.leftSideHeader}>
                        <div onClick={() => navigate('/')} role='button' className={`d-inline ${styles.brand}`}>
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
                                        displayCategories.map((cat) => (
                                            <NavDropdown.Item key={cat.id} onClick={() => goToListPage(cat.listPageUrl)}>
                                                {cat.name}
                                            </NavDropdown.Item>
                                        ))
                                    }
                                </NavDropdown>
                                <NavDropdown title="Resources">
                                    <NavDropdown.Item>
                                        resource 1
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        resource 2
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link className='text-nowrap' onClick={() => navigate('/contactus')}>
                                    Contact Us
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>

                    {/* SHOPPING CART */}
                    <Col className={styles.rightSideHeader} xs="3">
                        <div role='button' className='d-inline'>
                            <span className={`pi pi-shopping-cart ${styles.cart}`}></span>
                            <Badge pill>9</Badge>
                        </div>
                    </Col>

                </Container>
            </Navbar>

            <ShopByCategoryDemoModal isVisible={demoCategoryModalIsVisible} setIsVisible={setDemoCategoryModalIsVisible} />
        </>
    )
}

export default CommonLayoutHeader;
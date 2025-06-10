import useCategories from "@/hooks/useCategories";
import BusyIndicator from "@/pages/common/components/BusyIndicator";
import ErrorIndicator from "@/pages/common/components/ErrorIndicator";
import SectionLabel from "@/pages/common/components/SectionLabel";
import { SiteSettingsContext } from "@/tools/contexts";
import type { ICategory } from "@/tools/interfaces";
import { useContext, useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";

/** Displays the Shop By Category section for the home page. */
const ShopByCategory = () => {
    //===========================================================================================================================
    const siteSettings = useContext(SiteSettingsContext);
    const { categories, loadingCategories, categoriesError } = useCategories();
    const [displayCategories, setDisplayCategories] = useState<ICategory[]>([]);
    const [demoCategoryModalIsVisible, setDemoCategoryModalIsVisible] = useState<boolean>(false);
    const navigate = useNavigate();

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
    }, [categories]);

    //===========================================================================================================================
    return (
        <>
            {
                //===========================================================================================================================
                // DESKTOP
                //===========================================================================================================================
                siteSettings?.isMobile == false &&
                <>
                    <SectionLabel className="mt-5" label="Shop By Category" />
                    <Container className="mt-2">
                        <Row className="position-relative">
                            {
                                displayCategories.map((cat) => (
                                    <Col key={cat.id} xs={12} sm={6} md={4} lg={4} xl={3}>
                                        <Card data-bs-theme="light" 
                                            className="p-1 mb-2 shadow-sm"
                                            role="button"
                                            onClick={() => goToListPage(cat.listPageUrl)}>
                                            <Card.Img src={cat.imageUrl} className="border border-dark-subtle"></Card.Img>
                                            <Card.Body className="fw-bold">{cat.name}</Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            }
                            {
                                loadingCategories ?? <BusyIndicator />
                            }
                            {
                                categoriesError.hasError ?? <ErrorIndicator message={categoriesError.friendlyErrorMessage} />
                            }
                        </Row>
                    </Container>
                </>
            }

            {
                //===========================================================================================================================
                // MOBILE
                //===========================================================================================================================
                siteSettings?.isMobile &&
                <Accordion flush className="mt-3">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Shop By Category</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                {
                                    displayCategories.map((cat) => (
                                        <ListGroup.Item onClick={() => goToListPage(cat.listPageUrl)}>
                                            {cat.name}
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            }

            {/* //=========================================================================================================================== */}
            {/* Modal letting the user know that only the 'All Flooring' category is allowed. */}
            {/* //=========================================================================================================================== */}
            <Modal show={demoCategoryModalIsVisible} centered size="lg" onHide={() => setDemoCategoryModalIsVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Demo Category List Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Sorry, but to keep this demo small the available option is to use the
                        'All Flooring' category option.
                    </p>
                    <div className="d-flex justify-content-center w-100">
                        <Button variant="secondary" onClick={() => navigate('/product/all')}>
                            All Flooring Category List Page
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDemoCategoryModalIsVisible(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ShopByCategory;
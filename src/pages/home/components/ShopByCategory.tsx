import useCategories from "@/hooks/useCategories";
import BusyIndicator from "@/pages/common/components/BusyIndicator";
import ErrorIndicator from "@/pages/common/components/ErrorIndicator";
import SectionLabel from "@/pages/common/components/SectionLabel";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import styles from '../styles/shopByCategory.module.scss';
import { useContext, useEffect } from "react";

/** Displays the Shop By Category section for the home page. */
const ShopByCategory = () => {
    //===========================================================================================================================
    const siteSettings = useContext(SiteSettingsContext);
    const { categories, loadingCategories, categoriesError, loadCategories } = useCategories();
    const navigate = useNavigate();

    //===========================================================================================================================
    /** Load categories useEffect. */
    useEffect(() => {
        const loader = async() => {
            await loadCategories();
        }

        loader();
    }, [loadCategories])

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
                                categories.map((cat) => (
                                    <Col key={cat.id} xs={12} sm={6} md={4} lg={4} xl={3}>
                                        <Card data-bs-theme="light" 
                                            className={`p-1 mb-2 shadow-sm ${styles.card}`}
                                            role="button"
                                            onClick={() => navigate(`/list/${cat.id === 0 ? 'all' : cat.id}`)}>
                                            <Card.Img src={cat.imageUrl} className="border border-dark-subtle"></Card.Img>
                                            <Card.Body className="fw-bold">{cat.name}</Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            }
                            {
                                loadingCategories && <BusyIndicator />
                            }
                            {
                                categoriesError.hasError && <ErrorIndicator message={categoriesError.friendlyErrorMessage} />
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
                                    categories.map((cat) => (
                                        <ListGroup.Item key={cat.id} onClick={() => navigate(`/list/${cat.id === 0 ? 'all' : cat.id}`)}>
                                            {cat.name}
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            }
        </>
    )
}

export default ShopByCategory;
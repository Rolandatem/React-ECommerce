import BusyIndicator from "@/pages/common/components/BusyIndicator";
import ErrorIndicator from "@/pages/common/components/ErrorIndicator";
import ProductCard from "@/pages/common/components/ProductCard";
import styles from '../styles/listPage.module.scss';
import ListFilter from "./ListFilter";
import type IListPageContentsProps from "@/tools/interfaces/IListPageContentsProps";
import useListPageLogic from "@/hooks/useListPageLogic";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Pagination from 'react-bootstrap/Pagination';

/** Contents for the non-mobile List Page. */
const ListPageContents = ({siteFilterTagTypes}: IListPageContentsProps) => {
    const {
        products,
        loadingProducts,
        productsError,
        productsToShow,
        selectedFilters,
        filteredProducts,
        currentPage,
        totalPages,
        setSelectedFilters,
        onGoToFirst,
        onGoToLast,
        onGoToPrev,
        onGoToNext
    } = useListPageLogic({siteFilterTagTypes});

    //===========================================================================================================================
    return (
        <>
            <Container>
                <Row>
                    {/* FILTERS */}
                    <Col xs="auto" style={{width: '230px'}} className="text-dark p-0">
                        {
                            siteFilterTagTypes !== undefined &&
                            <ListFilter products={products || []}
                                        siteFilterTagTypes={siteFilterTagTypes || []}
                                        selectedFilters={selectedFilters}
                                        onChange={setSelectedFilters} />
                        }
                    </Col>

                    {/* PRODUCTS LIST */}
                    <Col className="p-0">

                        <Container className="pe-0">

                            {/* PAGING TOP */}
                            <Row>
                                <Col>
                                    <Pagination className="d-flex w-100">
                                        <Pagination.First onClick={onGoToFirst} disabled={currentPage === 1} />
                                        <Pagination.Prev onClick={onGoToPrev} disabled={currentPage === 1} />
                                        <Pagination.Item disabled className="flex-fill text-center">
                                            Page {currentPage} of {totalPages}
                                        </Pagination.Item>
                                        <Pagination.Item disabled className="flex-fill text-center">
                                            {filteredProducts.length} Product(s)
                                        </Pagination.Item>
                                        <Pagination.Next onClick={onGoToNext} disabled={currentPage === totalPages} />
                                        <Pagination.Last onClick={onGoToLast} disabled={currentPage === totalPages} />
                                    </Pagination>
                                </Col>
                            </Row>

                            {/* PRODUCT CARDS */}
                            <Row>
                                <Col>
                                    <Container className="p-0">
                                        <Row className={`g-2 position-relative`} style={{minHeight: '100px'}}>
                                            {
                                                loadingProducts === false &&
                                                productsError.hasError === false &&
                                                productsToShow.length === 0 && (
                                                    <Alert variant="secondary">
                                                        <h3>No Products Found.</h3>
                                                    </Alert>
                                                )
                                            }
                                            {
                                                productsToShow.length > 0 && productsToShow.map(product => (
                                                    <Col key={product.id} xs={12} lg={6} xl={4}>
                                                        <ProductCard key={product.id} product={product} className={styles.listPageCard}  />
                                                    </Col>
                                                ))
                                            }
                                            {
                                                loadingProducts && <BusyIndicator />
                                            }
                                            {
                                                productsError.hasError && <ErrorIndicator message={productsError.friendlyErrorMessage} />
                                            }
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>

                            {/* PAGING BOTTOM */}
                            <Row>
                                <Col>
                                    <Pagination className="d-flex w-100 mt-3">
                                        <Pagination.First onClick={onGoToFirst} disabled={currentPage === 1} />
                                        <Pagination.Prev onClick={onGoToPrev} disabled={currentPage === 1} />
                                        <Pagination.Item disabled className="flex-fill text-center">
                                            Page {currentPage} of {totalPages}
                                        </Pagination.Item>
                                        <Pagination.Item disabled className="flex-fill text-center">
                                            {filteredProducts.length} Product(s)
                                        </Pagination.Item>
                                        <Pagination.Next onClick={onGoToNext} disabled={currentPage === totalPages} />
                                        <Pagination.Last onClick={onGoToLast} disabled={currentPage === totalPages} />
                                    </Pagination>
                                </Col>
                            </Row>

                        </Container>

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ListPageContents;
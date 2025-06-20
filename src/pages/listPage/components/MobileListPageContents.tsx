import useListPageLogic from "@/hooks/useListPageLogic";
import BusyIndicator from "@/pages/common/components/BusyIndicator";
import ErrorIndicator from "@/pages/common/components/ErrorIndicator";
import ProductCard from "@/pages/common/components/ProductCard";
import type IListPageContentsProps from "@/tools/interfaces/IListPageContentsProps";
import { useState } from "react";
import ListFilter from "./ListFilter";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Pagination from 'react-bootstrap/Pagination';

const MobileListPageContents = ({siteFilterTagTypes}: IListPageContentsProps) => {
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
    const [showFilters, setShowFilters] = useState<boolean>(false);

    return (
        <>
            {/* FILTER OFFCAVAS */}
            <Offcanvas show={showFilters} onHide={() => setShowFilters(false)}>
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        siteFilterTagTypes !== undefined &&
                        <ListFilter products={products || []}
                                    siteFilterTagTypes={siteFilterTagTypes || []}
                                    selectedFilters={selectedFilters}
                                    onChange={setSelectedFilters} />
                    }
                </Offcanvas.Body>
            </Offcanvas>

            {/* MAIN SCREEN */}
            <Container>

                {/* FILTERS BUTTON */}
                <Row>
                    <Col>
                        <Button className="w-100" onClick={() => setShowFilters(true)}>
                            <span className="pi pi-filter"></span>
                            <span className="ms-1">Edit Filters</span>
                        </Button>
                    </Col>
                </Row>

                {/* TOP PAGING */}
                <Row className="mt-2">
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
                    <Col className="position-relative" style={{minHeight: '100px'}}>
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
                                <ProductCard key={product.id} product={product} className="mb-2" />
                            ))
                        }
                        {
                            loadingProducts && <BusyIndicator />
                        }
                        {
                            productsError.hasError && <ErrorIndicator message={productsError.friendlyErrorMessage} />
                        }
                    </Col>
                </Row>

                {/* BOTTOM PAGING */}
                <Row className="mt-2">
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
            </Container>
        </>
    )
}

export default MobileListPageContents;
import useProducts from "@/hooks/useProducts";
import BusyIndicator from "@/pages/common/components/BusyIndicator";
import ErrorIndicator from "@/pages/common/components/ErrorIndicator";
import ProductCard from "@/pages/common/components/ProductCard";
import { useEffect, useState } from "react";
import { Alert, Col, Container, Pagination, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from '../styles/listPage.module.scss';
import ListFilter from "./ListFilter";
import type IProduct from "@/tools/interfaces/dtos/IProduct";
import type IListPageContentsProps from "@/tools/interfaces/IListPageContentsProps";
import type { SelectedListPageTagFilters } from "@/tools/types/SelectedListPageTagFilters";

/** Contents for the non-mobile List Page. */
const ListPageContents = ({siteFilterTagTypes}: IListPageContentsProps) => {
    const { option } = useParams();
    const { products, loadingProducts, productsError, loadProductsByCategoryId } = useProducts();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedFilters, setSelectedFilters] = useState<SelectedListPageTagFilters>({});

    //===========================================================================================================================
    /** Filters the product list by using the selected filters before paging. */
    const filterProductsByFilters = (
        products: IProduct[], 
        selectedFilters: SelectedListPageTagFilters): IProduct[] => {

        const activeGroups = Object.entries(selectedFilters)
            .filter(([, ids]) => ids.length > 0);
        if (activeGroups.length === 0) { return products; }

        return products.filter(product => {
            //--Product must pass all active filter groups
            return activeGroups.every(([tagTypeIdKey, selectedIds]) => {
                const tagTypeId = Number(tagTypeIdKey);
                if (!selectedIds .length) { return true; }    //--Should not be needed, but safe.
                //--Product matches if any productTag matches an id in this group.
                return product.productTags?.some(pt =>
                    pt.tag.tagType.id === tagTypeId && selectedIds .includes(pt.tag.id)
                )
            })
        })
    }

    //===========================================================================================================================
    //--Paging related fields.
    const MaxItemsPerPage: number = 9;
    const filteredProducts = filterProductsByFilters(products || [], selectedFilters);
    const totalPages = filteredProducts.length > 0
        ? Math.ceil(filteredProducts.length / MaxItemsPerPage)
        : 1;
    const startIdx = (currentPage - 1) * MaxItemsPerPage;
    const endIdx = startIdx + MaxItemsPerPage;
    const productsToShow = filteredProducts.slice(startIdx, endIdx);

    const onGoToFirst = () => setCurrentPage(1);
    const onGoToLast = () => setCurrentPage(totalPages);
    const onGoToPrev = () => setCurrentPage(page => Math.max(1, page - 1));
    const onGoToNext = () => setCurrentPage(page => Math.min(totalPages, page + 1));

    //--For this demo, we are assuming the 'option' parameter is a category id.
    const categoryId = option === undefined || option === 'all'
        ? undefined
        : parseInt(option);

    //===========================================================================================================================
    /** Effect that set's the current page back to 1 when any filters are changed. */
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedFilters])

    //===========================================================================================================================
    /** Effect that runs once on mount to load the products based on the category on the page request. */
    useEffect(() => {
        loadProductsByCategoryId(categoryId);
    }, [categoryId, loadProductsByCategoryId])

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
                                        <Pagination.Next onClick={onGoToNext} disabled={currentPage === totalPages} />
                                        <Pagination.Last onClick={onGoToLast} disabled={currentPage === totalPages} />
                                    </Pagination>
                                </Col>
                            </Row>

                            {/* PRODUCT CARDS */}
                            <Row>
                                <Col>
                                    <Container className="p-0">
                                        <Row className={`g-2 position-relative ${styles.colBg}`} style={{minHeight: '100px'}}>
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
                                                productsError.hasError && <ErrorIndicator />
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
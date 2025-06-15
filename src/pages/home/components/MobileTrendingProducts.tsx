import { useTrendingProducts, emptyTrendingProduct } from "@/hooks/useTrendingProducts";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import TrendingProductCard from "./TrendingProductCard";
import BusyIndicator from "@/pages/common/components/BusyIndicator";
import ErrorIndicator from "@/pages/common/components/ErrorIndicator";
import type IComponentClass from "@/tools/interfaces/IComponentClass";
import type ITrendingProduct from "@/tools/interfaces/ITrendingProduct";

/**
 * Trending Product Information for Mobile devices.
 */
const MobileTrendingProducts: React.FC<IComponentClass> = (
    {className} : IComponentClass) => {
    
    //===========================================================================================================================
    const { trendingProducts, loadingTrendingProducts, trendingProductsError, loadTrendingProducts} = useTrendingProducts();
    const [currentProduct, setCurrentProduct] = useState<ITrendingProduct>(emptyTrendingProduct);

    //===========================================================================================================================
    const goPrevCard = () => {
        const cardIndex = trendingProducts.indexOf(currentProduct);
        if (cardIndex === 0) {
            return;
        }

        setCurrentProduct(trendingProducts[cardIndex - 1]);
    }

    //===========================================================================================================================
    const goNextCard = () => {
        const cardIndex = trendingProducts.indexOf(currentProduct);
        if ((cardIndex + 1) === trendingProducts.length) {
            return;
        }

        setCurrentProduct(trendingProducts[cardIndex + 1]);
    }
    
    //===========================================================================================================================
    useEffect(() => {
        setCurrentProduct(trendingProducts[0]);
    }, [trendingProducts])

    //===========================================================================================================================
    useEffect(() => {
        const loader = async() => {
            await loadTrendingProducts();
        }
        
        loader();
    }, [loadTrendingProducts])

    //===========================================================================================================================
    return (
        <>
            <ListGroup variant="flush" className={className}>
                <ListGroup.Item>Trending Products</ListGroup.Item>
            </ListGroup>
            <Container className="mt-2">
                <Row>
                    <Col xs="auto" className="pi pi-chevron-left text-dark align-self-center p-0 fs-2" role="button" onClick={goPrevCard}></Col>

                    <Col className="position-relative px-0 pb-1 d-flex">
                        <TrendingProductCard product={currentProduct} />

                        {
                            loadingTrendingProducts && <BusyIndicator />
                        }
                        {
                            trendingProductsError.hasError && <ErrorIndicator message={trendingProductsError.friendlyErrorMessage} />
                        }
                    </Col>

                    <Col xs="auto" className="pi pi-chevron-right text-dark align-self-center p-0 fs-2" role="button" onClick={goNextCard}></Col>
                </Row>
            </Container>
        </>
    )
}

export default MobileTrendingProducts;
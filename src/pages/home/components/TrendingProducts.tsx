import { useTrendingProducts } from "@/hooks/useTrendingProducts";
import { Col, Container, Row } from "react-bootstrap";
import TrendingProductCard from "./TrendingProductCard";
import type { IComponentClass, ITrendingProduct } from "@/tools/interfaces";
import { useRef } from "react";
import BusyIndicator from "@/pages/common/components/BusyIndicator";
import ErrorIndicator from "@/pages/common/components/ErrorIndicator";

/**
 * Trending Product Information.
 */
const TrendingProducts: React.FC<IComponentClass> = (
    {className}: IComponentClass) => {

    //===========================================================================================================================
    const { trendingProducts, loadingTrendingProducts, trendingProductsError } = useTrendingProducts();
    const scrollerRef = useRef<HTMLElement | null>(null);
    const cardScrollMultiple: number = 3;

    //===========================================================================================================================
    /**
     * Determines the width of the element passed in including offSet and margin.
     * @param scroller Element with a scroller.
     * @returns Width of the scroller element.
     */
    const getCardWidth = (scroller: HTMLElement): number => {
        const card = scroller.children[0] as HTMLElement;
        const cardOffsetWidth = card.offsetWidth;
        const cardMargin = parseFloat(window
            .getComputedStyle(card)
            .marginRight
        );

        return cardOffsetWidth + cardMargin;
    }

    //===========================================================================================================================
    /**
     * Instructs the trending product scroller to go left by the number of products that
     * can be visibly scrolled.
     */
    const goPrevCard = () => {
        if (scrollerRef.current) {
            const cardWidth = getCardWidth(scrollerRef.current);
            const scrollerViewableWidth = scrollerRef.current.clientWidth;
            const scrollCards = Math.floor(scrollerViewableWidth / cardWidth);
            const newPosition = cardWidth * scrollCards;

            scrollerRef.current.scrollBy({
                left: newPosition * -1,
                behavior: 'smooth'
            });
        }
    }

    //===========================================================================================================================
    /**
     * Instructs the trending product scroller to go right by the number of products that
     * can be visibly scrolled.
     */
    const goNextCard = () => {
        if (scrollerRef.current) {
            const cardWidth = getCardWidth(scrollerRef.current);
            const scrollerViewableWidth = scrollerRef.current.clientWidth;
            const scrollCards = Math.floor(scrollerViewableWidth / cardWidth);
            const newPosition = cardWidth * scrollCards;
            
            scrollerRef.current.scrollBy({
                left: newPosition,
                behavior: 'smooth'
            });
        }
    }

    //===========================================================================================================================
    return (
        <Container className={className}>
            <Row>
                <Col xs="auto" className="pi pi-chevron-left text-dark fs-2 align-self-center p-0" role="button" onClick={goPrevCard}></Col>

                <Col ref={scrollerRef} className="px-0 pb-1 d-flex overflow-hidden position-relative">
                    {
                        trendingProducts.map((product: ITrendingProduct) => (
                            <TrendingProductCard key={product.id} product={product} />
                        ))
                    }

                    {
                        loadingTrendingProducts && <BusyIndicator />
                    }

                    {
                        trendingProductsError.hasError && <ErrorIndicator message={trendingProductsError.friendlyErrorMessage} />
                    }
                </Col>

                <Col xs="auto" className="pi pi-chevron-right text-dark fs-2 align-self-center p-0" role="button" onClick={goNextCard}></Col>
            </Row>
        </Container>
    )
}

export default TrendingProducts;
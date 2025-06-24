import type IProductPageImages from "@/tools/interfaces/IProductPageImages";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";

/** 
 * Product Page component that displays an over-sized main image with zooming capabilities.
 * Also displays a carousel that contains all over the main product images.
 */
const ProductPageImages = ({product}: IProductPageImages) => {
    const [currentMainImage, setCurrentMainImage] = useState<string | null>(null);
    const [productMainImageUrls, setProductMainImageUrls] = useState<string[]>([]);
    const scrollerRef = useRef<HTMLElement | null>(null);
    const [showZoom, setShowZoom] = useState<boolean>(false);
    const [zoomPos, setZoomPos] = useState({x: 0, y: 0});
    const mainImgRef = useRef<HTMLImageElement | null>(null);
    const zoomViewSize: number = 200; //--The size of the zoom viewport in pixels.
    const zoomScale: number = 2; //--The zoom scalre applied in the zoom viewport.
    const lensSize = zoomViewSize / zoomScale;
    const siteSettings = useContext(SiteSettingsContext);

    //===========================================================================================================================
    /**
     * Determines the width of an element inside the scroller including offSet and margin.
     * @param scroller Element with a scroller.
     * @returns Width of the scroller element.
     */
    const getChildElementWidth = (scroller: HTMLElement): number => {
        const childElement = scroller.children[0] as HTMLElement;
        const childElementOffsetWidth = childElement.offsetWidth;
        const childElementMargin = parseFloat(window
            .getComputedStyle(childElement)
            .marginRight
        );

        return childElementOffsetWidth + childElementMargin;
    }

    //===========================================================================================================================
    /**
     * Instructs the scroller to go left by the number of items that can be visually scrolled.
     */
    const onGoPrevItems = () => {
        if (scrollerRef.current) {
            const childElementWidth = getChildElementWidth(scrollerRef.current);
            const scrollerViewableWidth = scrollerRef.current.clientWidth;
            const scrollElements = Math.floor(scrollerViewableWidth / childElementWidth);
            const newPosition = childElementWidth * scrollElements;

            scrollerRef.current.scrollBy({
                left: newPosition * -1,
                behavior: 'smooth'
            });
        }
    }

    //===========================================================================================================================
    /**
     * Instructs the scroller to go right by the number of items that can be visually scrolled.
     */
    const onGoNextItems = () => {
        if (scrollerRef.current) {
            const childElementWidth = getChildElementWidth(scrollerRef.current);
            const scrollerViewableWidth = scrollerRef.current.clientWidth;
            const scrollElements = Math.floor(scrollerViewableWidth / childElementWidth);
            const newPosition = childElementWidth * scrollElements;

            scrollerRef.current.scrollBy({
                left: newPosition,
                behavior: 'smooth'
            })
        }
    }

    //===========================================================================================================================
    /**
     * Sets the current main product image.
     * @param img Image to use.
     */
    const onSetMainImage = (
        img: string) => {
        setCurrentMainImage(img);
    }

    //===========================================================================================================================
    /**
     * Handles mouse movement over the main image to update the zoom viewport position.
     * @param e React Mouse event.
     */
    const onMouseMoveMainImg = (e: React.MouseEvent) => {
        if (!mainImgRef.current) { return; }
        const rect = mainImgRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        //--Clamping for lens.
        const min = zoomViewSize / (2 * zoomScale);
        const maxX = rect.width - min;
        const maxY = rect.height - min;
        x = Math.max(min, Math.min(x, maxX));
        y = Math.max(min, Math.min(y, maxY));

        setZoomPos({x, y});
    }

    //===========================================================================================================================
    /** Handles mouse enter on the main image to show the zoom viewport. */
    const onMouseEnterMainImg = () => { setShowZoom(siteSettings?.isMobile ? false : true); }

    //===========================================================================================================================
    /** Handles mouse leave on the main image to hide the zoom viewport. */
    const onMouseLeaveMainImg = () => { setShowZoom(false); }

    //===========================================================================================================================
    const buildProductImages = useCallback((): string[] => {
        return product.productImages
            .filter(pi => pi.imageType.name === 'Product')
            .map(pi => `/imagetypes/product/${pi.imageName}.webp`);
    }, [product.productImages]);

    //===========================================================================================================================
    useEffect(() => {
        const imageUrls = buildProductImages();
        setProductMainImageUrls(imageUrls);
        setCurrentMainImage(imageUrls[0]);
    }, [buildProductImages])

    //===========================================================================================================================
    return(
        <>
            <div className="d-inline-block position-relative">
                {/* MAIN IMAGE DISPLAY */}
                <Image src={currentMainImage ?? undefined} 
                    ref={mainImgRef}
                    className="d-block w-100 border shadow"
                    onMouseMove={onMouseMoveMainImg}
                    onMouseEnter={onMouseEnterMainImg}
                    onMouseLeave={onMouseLeaveMainImg}
                    fluid />

                {/* ZOOM LENS */}
                {
                    showZoom &&
                    <div className="position-absolute"
                         style={{
                            pointerEvents: 'none',
                            left: zoomPos.x - lensSize / 2,
                            top: zoomPos.y - lensSize / 2,
                            width: lensSize,
                            height: lensSize,
                            backgroundColor: 'rgba(128, 128, 128, .25)',
                            border: 'solid 2px #888888',
                            borderRadius: 4,
                            zIndex: 5
                        }}>
                    </div>
                }

                {/* ZOOM VIEWPORT */}
                {
                    showZoom && currentMainImage && (
                        <div className="position-absolute top-0 z-3 border overflow-hidden bg-white shadow" 
                            style={{left: "calc(100% + 16px)", width: zoomViewSize, height: zoomViewSize, boxShadow: "0 2px 8px rgba(0,0,0,.2)"}}>
                            <img src={currentMainImage} 
                                className="position-absolute"
                                draggable={false}
                                style={{
                                    left: `-${zoomPos.x * zoomScale - zoomViewSize / 2}px`,
                                    top: `-${zoomPos.y * zoomScale - zoomViewSize / 2}px`,
                                    width: mainImgRef.current ? mainImgRef.current.width * zoomScale: undefined,
                                    height: mainImgRef.current ? mainImgRef.current.height * zoomScale: undefined,
                                    pointerEvents: 'none',
                                    userSelect: 'none'
                                }} />
                        </div>
                    )
                }
            </div>

            <Container className="mt-3">
                <Row>
                    <Col xs="auto" className="pi pi-chevron-left text-dark fs-5 align-self-center p-0" role="button" onClick={onGoPrevItems} />

                    <Col ref={scrollerRef} className="px-0 pb-1 d-flex overflow-hidden position-relative">
                        {
                            productMainImageUrls.map(img => (
                                <Image key={img} src={img} height={100} className="me-2" role="button" onClick={() => onSetMainImage(img)} />
                            ))
                        }
                    </Col>

                    <Col xs="auto" className="pi pi-chevron-right text-dark fs-5 align-self-center p-0" role="button" onClick={onGoNextItems} />
                </Row>
            </Container>
        </>
    );
}

export default ProductPageImages;
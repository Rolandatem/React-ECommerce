import type IProduct from "@/tools/interfaces/dtos/IProduct";
import type IColorSelect from "@/tools/interfaces/IColorSelect";
import type ISwatchImage from "@/tools/interfaces/ISwatchImage";
import { useCallback, useEffect, useState } from "react";
import styles from '../styles/colorSelect.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

/** Product page component that allows the user to select a color from the product. */
const ColorSelect = ({product, setSelectedColor}: IColorSelect) => {
    const [swatchImages, setSwatchImages] = useState<ISwatchImage[]>([]);
    const [selectedSwatch, setSelectedSwatch] = useState<ISwatchImage>();

    //===========================================================================================================================
    /** Build's the swatch image list based on the color tags. */
    const buildSwatchUrls = useCallback(async(product: IProduct) => {
        const characterCleaner = /[^a-zA-Z0-9\- ]/g; //--Only alphanumeric, dash, and space allowed.
        const swatches: ISwatchImage[] = product.productTags
            .filter(pt => pt.tag.tagType.name == 'Color')
            .map(pt => ({
                url: `/imagetypes/swatch/${product.sku}-${pt.tag.name.replace(characterCleaner, '')}.webp`,
                originalName: pt.tag.name
            }));

        setSwatchImages(swatches);
    }, []);

    //===========================================================================================================================
    /**
     * Handler for selecting a swatch color. Sets the local seleted swatch (for border image visualization) and the selectedColor
     * tag state variable from the parent.
     * @param swatch Swatch object that is the new selected swatch.
     */
    const onSelectColor = (
        /** Original name of the selected swatch. */
        swatch: ISwatchImage) => {

        const colorTag = product.productTags
            .find(pt => 
                pt.tag.tagType.name === 'Color' &&
                pt.tag.name === swatch.originalName)?.tag;

        setSelectedColor(colorTag);
        setSelectedSwatch(swatch);
    };

    //===========================================================================================================================
    /** Builds a list of swatch urls from the product when the component loads. */
    useEffect(() => {
        buildSwatchUrls(product);
    }, [buildSwatchUrls, product])

    //===========================================================================================================================
    return (
        <Card data-bs-theme="light" className="shadow">
            <Card.Header className="fs-5 fw-bold font-roboto">Select A Color</Card.Header>
            <Card.Body>
                <Container>
                    <Row className="">
                        {
                            swatchImages.map(swatch => (
                                <Col key={swatch.originalName} xs={4} lg={2} className={`p-1 ${
                                                                        selectedSwatch && swatch.originalName === selectedSwatch.originalName
                                                                            ? styles.swatchImageSelected 
                                                                            : styles.swatchImage 
                                                                        }`}>
                                    <OverlayTrigger placement="top"
                                                    delay={{show: 50, hide: 150}}
                                                    overlay={(
                                                        <Popover>
                                                            <Popover.Body className="py-1">
                                                                {swatch.originalName}
                                                            </Popover.Body>
                                                        </Popover>
                                                    )}>
                                        <Image src={swatch.url} 
                                            height={192} 
                                            width={192} 
                                            fluid 
                                            role="button"
                                            onClick={() => onSelectColor(swatch)} />
                                    </OverlayTrigger>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default ColorSelect;
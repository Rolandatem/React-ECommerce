import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import currencyFormatter from '@/tools/functions/currencyFormatter';
import styles from '../styles/productCard.module.scss';
import type ShipType from '@/tools/enums/ShipType';
import convertShipType from '@/tools/functions/convertShipType';
import type IProductCard from '@/tools/interfaces/IProductCard';

/**
 * Displays product info on a Card.
 * @param product IProduct to display.
 */
const ProductCard = ({product, className}: IProductCard) => {
    const navigate = useNavigate();
    const shipType: ShipType = convertShipType(product.productTags
        .find(pt => pt.tag.tagType.name === "Ship Type")?.tag.id ?? 1);

    //===========================================================================================================================
    return (
        <Card data-bs-theme="light" 
              role="button"
              border="secondary"
              onClick={() => navigate(`/product/${product.sku}`)}
              className={`p-1 shadow-sm ${styles.card} ${className}`}>
            <Card.Img src={product.imageUrl} className="border border-dark-subtle"></Card.Img>
            <Card.Header className={styles.cardHeader}>
                <Card.Title>{product.productName}</Card.Title>
            </Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item className="flex">
                    {
                        [...Array(product.stars)].map((_, i) => (
                            <span key={i} className="pi pi-star-fill text-primary fs-7"></span>
                        ))
                    }
                    {
                        [...Array(5 - product.stars)].map((_, i) => (
                            <span key={i} className="pi pi-star text-primary fs-7"></span>
                        ))
                    }
                    <span className="fs-7 ms-1">({product.reviews})</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Card.Subtitle>
                        Available in {product.colorCount} color(s).
                    </Card.Subtitle>
                </ListGroup.Item>
                <ListGroup.Item className={styles.cardDescription}>
                    {product.description}
                </ListGroup.Item>
                <ListGroup.Item>
                    <div>Starting From:</div>
                    <div className="d-flex fw-bold">
                        <div className="fs-4" style={{marginTop: '-3px'}}>{currencyFormatter.format(product.salePrice)}/sqft</div>
                        <div className="ms-3">
                            <div className="text-decoration-line-through">{currencyFormatter.format(product.originalPrice)}/sqft</div>
                            <div className="text-danger" style={{marginTop: '-5px'}}>Save {product.savingsPercentage}%</div>
                        </div>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Image src={shipType.ImageUrl} />
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default ProductCard;
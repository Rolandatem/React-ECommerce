import type IProductCard from "@/tools/interfaces/IProductCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import currencyFormatter from "@/tools/functions/currencyFormatter";

/** Component used to display product sales information for the product page. */
const ProductPageCard = ({product}: IProductCard) => {
    return (
        <Card data-bs-theme="light" className="shadow">
            <Card.Header className="fs-4 fw-bold">
                {product.productName}
            </Card.Header>
            <Card.Body>
                
                {/* STARS */}
                <div className="text-primary fs-6 fs-lg-5 d-flex align-items-center">
                    {
                        [...Array(product.stars)].map((_, i) => (
                            <span key={i} className="pi pi-star-fill"></span>
                        ))
                    }
                    {
                        [...Array(5 - product.stars)].map((_, i) => (
                            <span key={i} className="pi pi-star"></span>
                        ))
                    }
                    <span className="ms-2">({product.reviews})</span>
                </div>

                {/* PRICING */}
                <Container className="font-roboto">
                    <Row className="border border-primary mt-2">
                        <Col xs={5} className="p-3">
                            <div className="fw-bold">Our Sale Price</div>
                            <div>
                                <span className="fw-bold fs-6 fs-lg-4">{currencyFormatter.format(product.salePrice)}</span>
                                <span className="ms-2">/sqft</span>
                            </div>
                            <div className="mt-2 fw-bold">Original Price</div>
                            <div>
                                <span className="fw-bold fs-6 fs-lg-4 text-decoration-line-through">{currencyFormatter.format(product.originalPrice)}</span>
                                <span className="ms-2">/sqft</span>
                            </div>
                        </Col>
                        <Col xs={7} className="bg-primary p-3 text-white">
                            <div className="fw-bold">Your Savings</div>
                            <table className="mt-2">
                                <tbody>
                                    <tr>
                                        <td>MSRP</td>
                                        <td className="ps-3">{currencyFormatter.format(product.originalPrice)}</td>
                                    </tr>
                                    <tr>
                                        <td>Save {product.savingsPercentage}%</td>
                                        <td className="ps-3">-{currencyFormatter.format(product.originalPrice - product.salePrice)}</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping</td>
                                        <td className="ps-3">
                                            {
                                                product.productTags.find(pt =>
                                                    pt.tag.tagType.name === 'Ship Type'
                                                )?.tag.name
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>

                <div className="mt-3 font-roboto fs-7 fs-lg-6">
                    <ul>
                        {
                            product.productHighlights.map(hl => (<li key={hl.id}>{hl.highlight}</li>))
                        }
                    </ul>
                </div>

            </Card.Body>
        </Card>
    )
}

export default ProductPageCard;
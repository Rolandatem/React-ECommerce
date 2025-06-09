import styles from '../styles/homeCarousel.module.scss';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

const HomeCarousel = () => {
    return (
        <Carousel fade>
            <Carousel.Item>
                <Image src='carousel-mobile/oak-floor.jpg' fluid className="d-md-none w-100" />
                <Image src='carousel/oak-floor.jpg' fluid className="d-none d-md-block w-100" />
                <Carousel.Caption>
                    <Card className={`bg-white text-dark ${styles.cardOpacity}`}>
                        <Card.Body>
                            <h3 className="d-none d-md-block">Hardwood Floors</h3>
                            <p className="d-md-none">
                                Hardwood floors are durable, beautiful, and add lasting value to any home.
                            </p>
                            <p className="d-none d-md-block">
                                Hardwood floors are durable, beautiful, and add lasting value to any home. 
                                They’re easy to clean, timeless in style, and come in various finishes to 
                                fit any décor, making them a smart, long-term investment.
                            </p>
                        </Card.Body>
                    </Card>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image src='carousel-mobile/slider-showroom.jpg' fluid className="d-md-none w-100" />
                <Image src='carousel/slider-showroom.jpg' fluid className="d-none d-md-block w-100" />
                <Carousel.Caption>
                    <Card className={`bg-white text-dark ${styles.cardOpacity}`}>
                        <Card.Body>
                            <h3 className="d-none d-md-block">Wide Range of Flooring Options</h3>
                            <p className="d-md-none">
                                We offer an extensive collection of flooring products.
                            </p>
                            <p className="d-none d-md-block">
                                We offer an extensive collection of flooring products, featuring a wide 
                                variety of materials, styles, and colors to suit any taste or project. 
                                Whatever your needs, you’ll find the perfect flooring solution in our large selection.
                            </p>
                        </Card.Body>
                    </Card>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image src='carousel-mobile/white-oak.jpg' fluid className="d-md-none w-100" />
                <Image src='carousel/white-oak.jpg' fluid className="d-none d-md-block w-100" />
                <Carousel.Caption>
                    <Card className={`bg-white text-dark ${styles.cardOpacity}`}>
                        <Card.Body>
                            <h3 className="d-none d-md-block">Vinyl Flooring</h3>
                            <p className="d-md-none">
                                Vinyl flooring is affordable, durable, and water-resistant.
                            </p>
                            <p className="d-none d-md-block">
                                Vinyl flooring is affordable, durable, and water-resistant, making it ideal 
                                for busy households. It’s easy to maintain, comfortable underfoot, and 
                                available in a wide range of styles to suit any room.
                            </p>
                        </Card.Body>
                    </Card>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default HomeCarousel;
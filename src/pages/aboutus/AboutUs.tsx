import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import SectionLabel from "../common/components/SectionLabel";

/** About Us Page Component */
const AboutUs = () => {
    return (
        <>
            <Container fluid className="p-0 mt-n5">
                <Image src="/banners/about_us.webp" fluid />
            </Container>

            <Container>
                <Row className="mt-5">
                    <SectionLabel label="Our Story" />
                </Row>
                <Row className="mt-2">
                    <Col xs={12} lg={8}>
                        <Card data-bs-theme="light" className="shadow">
                            <Card.Body>
                                Founded over a decade ago, our family-owned flooring business began with a 
                                dream and determination rooted deeply in our Mexican migrant heritage. From 
                                humble beginnings, we built our reputation one project at a time, combining 
                                hard work, integrity, and craftsmanship passed down through generations. 
                                Today, we’re proud to serve our community with the same dedication and 
                                personalized service that has guided us from the very start—helping you turn 
                                your house into a home, one floor at a time.
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col ls={4} className="mt-2 mt-lg-0">
                        <Image src="stock_images/mission.jpg" fluid rounded className="shadow" />
                    </Col>
                </Row>

                <Row className="mt-5">
                    <SectionLabel label="Our Mission" />
                </Row>
                <Row className="mt-2">
                    <Col ls={4}>
                        <Image src="stock_images/friendly_meeting.jpg" fluid rounded className="shadow" />
                    </Col>
                    <Col xs={12} lg={8} className="mt-2 mt-lg-0">
                        <Card data-bs-theme="light" className="shadow">
                            <Card.Body>
                                Our mission is to deliver exceptional quality and reliable service on every 
                                flooring project, no matter the size. We are dedicated to exceeding our customers’ 
                                expectations through honesty, craftsmanship, and personalized attention. Every day, 
                                we strive to become the #1 flooring company in our community by treating every 
                                home as if it were our own and ensuring complete satisfaction with every step.
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <SectionLabel label="Our Culture" />
                </Row>
                <Row className="mt-2">
                    <Col xs={12} lg={8}>
                        <Card data-bs-theme="light" className="shadow">
                            <Card.Body>
                                At the heart of our company is a true family spirit. We foster a warm, supportive work 
                                environment where everyone feels valued and connected—just like family. We believe in 
                                working hard together, but we also know the importance of sharing laughs and celebrating 
                                our achievements. By creating a positive and enjoyable atmosphere, we ensure our team 
                                is happy—because we know that happy employees do their best work and bring that same 
                                positive energy to every project we complete.
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} className="mt-2 mt-lg-0">
                        <Image src="stock_images/work_party.jpg" fluid rounded className="shadow" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AboutUs;
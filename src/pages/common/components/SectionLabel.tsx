import styles from '../styles/sectionLabel.module.scss';
import type ISectionLabel from "@/tools/interfaces/ISectionLabel";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * Used to display sections.
 * 
 * props Includes:
 * @param className Classes to use on component parent object.
 * @param label Label to display.
 */
const SectionLabel: React.FC<ISectionLabel> = (props) => {
    return (
        <Container className={props.className}>
            <Row>
                <Col xs={1} className={styles.labelBar}></Col>
                <Col xs="auto" className="font-roboto fs-md-4">
                    <Card>
                        <Card.Header>{props.label}</Card.Header>
                    </Card>
                </Col>
                <Col className={styles.labelBar}></Col>
            </Row>
        </Container>
    )
}

export default SectionLabel;
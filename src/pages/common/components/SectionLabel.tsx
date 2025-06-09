import type { IComponentClass } from "@/tools/interfaces";
import { Card, Col, Container, Row } from "react-bootstrap";
import styles from '../styles/sectionLabel.module.scss';

interface ISectionLabelComponent extends IComponentClass {
    /** Label to display. */
    label: string
}

/**
 * Used to display sections.
 * 
 * props Includes:
 * @param className Classes to use on component parent object.
 * @param label Label to display.
 */
const SectionLabel: React.FC<ISectionLabelComponent> = (props) => {
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
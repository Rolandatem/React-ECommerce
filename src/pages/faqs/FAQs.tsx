import SectionLabel from "../common/components/SectionLabel";
import useFAQs from "@/hooks/useFAQs";
import { useEffect, useState } from "react";
import type IFAQ from "@/tools/interfaces/IFAQ";
import BusyIndicator from "../common/components/BusyIndicator";
import ErrorIndicator from "../common/components/ErrorIndicator";
import { useNavigate } from "react-router-dom";
import type IBasicAlert from "@/tools/interfaces/IBasicAlert";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

//===========================================================================================================================
/** Default setup for the modal alert. */
const defaultAlert: IBasicAlert = {
    show: false,
    header: 'Oops!',
    message: ''
}

//===========================================================================================================================
const FAQs = () => {
    const {loadingFAQs, faqsError, getFAQs, castFAQVote} = useFAQs();
    const [faqs, setFAQs] = useState<IFAQ[]>([]);
    const [alert, setAlert] = useState<IBasicAlert>(defaultAlert);
    const [faqVotes, setFAQVotes] = useState<{[faqId: number]: "up" | "down"}>({});
    const navigate = useNavigate();

    //===========================================================================================================================
    /**
     * FAQ Useful vote handler
     * @param faqId DB ID of the FAQ voting on.
     * @param voteType Vote type, either "up" or "down".
     */
    const onVote = async(faqId: number, voteType: "up" | "down") => {
        if (faqVotes[faqId]) { return; } //--Already voted.

        const voteResult = await castFAQVote(faqId, voteType);
        if (voteResult.hasError) {
            setAlert(prev => ({
                ...prev,
                show: true,
                message: voteResult.friendlyErrorMessage
            }));

            return;
        }

        setFAQVotes((prev) => ({
            ...prev,
            [faqId]: voteType
        }))

        //--Update count locally.
        setFAQs(prev => (
            prev.map(faq => (
                faq.id === faqId
                    ? {
                        ...faq,
                        upVotes: voteType === "up" ? faq.upVotes + 1 : faq.upVotes,
                        downVotes: voteType === "down" ? faq.downVotes + 1 : faq.downVotes
                    }
                    : faq
            ))
        ));
    };

    //===========================================================================================================================
    /** Hides the modal alert. */
    const hideAlert = () => {
        setAlert(prev => ({
            ...prev,
            show: false
        }))
    }

    //===========================================================================================================================
    useEffect(() => {
        const fetchFAQs = async() => {
            const faqsResponse = await getFAQs(true);
            setFAQs(faqsResponse);
        }

        fetchFAQs();
    }, [getFAQs])

    //===========================================================================================================================
    return (
        <>
            <Container>

                <Row>
                    <Col xs={12} lg>
                        <SectionLabel label="Top 10 Most Useful FAQs" />
                    </Col>
                    <Col xs={12} lg="auto" className="d-flex justify-content-end align-items-end">
                        <Button className="mt-2 w-100" onClick={() => navigate('/faqs/all')}>View All FAQs</Button>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col className="position-relative" style={{minHeight: '100px'}}>
                        <Accordion>
                            {
                                faqs.map((faq) => (
                                    <Accordion.Item key={faq.id} eventKey={faq.id.toString()}>
                                        <Accordion.Header>{faq.question}</Accordion.Header>
                                        <Accordion.Body>
                                            <div>{faq.answer}</div>
                                            <div className="mt-4 text-primary">
                                                <span>Was this helpful?</span>

                                                {/* THUMBS UP */}
                                                <span role="button" 
                                                    onClick={() => onVote(faq.id, "up")} 
                                                    className={`pi pi-thumbs-up-fill ms-4 ${faqVotes[faq.id] ? 'text-secondary' : 'text-white'}`}
                                                    style={{cursor: faqVotes[faq.id] ? "default" : "pointer", opacity: faqVotes[faq.id] ? 0.5 : 1 }}></span>
                                                <span className="ms-2">{faq.upVotes}</span>

                                                {/* THUMBS DOWN */}
                                                <span role="button" 
                                                    onClick={() => onVote(faq.id, "down")} 
                                                    className={`pi pi-thumbs-down-fill ms-3 ${faqVotes[faq.id] ? 'text-secondary' : 'text-white'}`}
                                                    style={{cursor: faqVotes[faq.id] ? "default" : "pointer", opacity: faqVotes[faq.id] ? 0.5 : 1 }}></span>
                                                <span className="ms-2">{faq.downVotes}</span>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))
                            }
                        </Accordion>
                        {
                            loadingFAQs && <BusyIndicator />
                        }
                        {
                            faqsError?.hasError && <ErrorIndicator />
                        }
                    </Col>
                </Row>

            </Container>

            {
                /* ALERT MODAL */
                alert.show &&
                <Modal show={alert.show} onHide={hideAlert} centered>
                    <Modal.Header closeButton>{alert.header}</Modal.Header>
                    <Modal.Body>{alert.message}</Modal.Body>
                </Modal>
            }
        </>
    )
}

export default FAQs;
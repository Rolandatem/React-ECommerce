import SectionLabel from "../common/components/SectionLabel";
import useFAQs from "@/hooks/useFAQs";
import { useEffect, useState } from "react";
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
import FAQsList from "./components/FAQsList";

//===========================================================================================================================
/** Default setup for the modal alert. */
const defaultAlert: IBasicAlert = {
    show: false,
    header: 'Oops!',
    message: ''
}

//===========================================================================================================================
const FAQs = () => {
    const {faqs, setFAQs, loadingFAQs, faqsError, loadFAQs, castFAQVote} = useFAQs();
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
            prev?.map(faq => (
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
        const loader = async() => {
            await loadFAQs(true);
        }

        loader();
    }, [loadFAQs])

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
                        <FAQsList faqs={faqs} onVote={onVote} faqVotes={faqVotes} />
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
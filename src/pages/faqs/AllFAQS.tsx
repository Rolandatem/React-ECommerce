import SectionLabel from "../common/components/SectionLabel";
import useFAQs from "@/hooks/useFAQs";
import { useCallback, useEffect, useState } from "react";
import FAQsList from "./components/FAQsList";
import BusyIndicator from "../common/components/BusyIndicator";
import ErrorIndicator from "../common/components/ErrorIndicator";
import type IBasicAlert from "@/tools/interfaces/IBasicAlert";
import type ISubmitQuestionForm from "@/tools/interfaces/ISubmitQuestionForm";
import RequiredFieldLabel from "../common/components/RequiredFieldLabel";
import onCommonHandleChange from "@/tools/functions/onHandleChange";
import { toast } from "@/behaviors/toastification/contexts";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';

//===========================================================================================================================
/** Number of FAQ's to display per page. */
const MaxItemsPerPage: number = 10;

/** Default setup for the modal alert. */
const defaultAlert: IBasicAlert = {
    show: false,
    header: 'Oops!',
    message: ''
}

/** Default submit question form. */
const defaultSubmitQuestionForm: ISubmitQuestionForm = {
    question: '',
    email: ''
}

const AllFAQs = () => {
    const { faqs, setFAQs, loadFAQs, loadingFAQs, faqsError, searchFAQs, castFAQVote, submitFAQ} = useFAQs();
    const [alert, setAlert] = useState<IBasicAlert>(defaultAlert);
    const [faqVotes, setFAQVotes] = useState<{[faqId: number]: "up" | "down"}>({});
    const [userSearch, setUserSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [submitQuestionIsVisible, setSubmitQuestionIsVisible] = useState<boolean>(false);
    const [submitQuestionForm, setSubmitQuestionForm] = useState<ISubmitQuestionForm>(defaultSubmitQuestionForm);

    //===========================================================================================================================
    // PAGINATION
    //===========================================================================================================================
    const totalPages = faqs && faqs.length > 0
        ? Math.ceil(faqs.length / MaxItemsPerPage)
        : 1;
    const startIdx  = (currentPage - 1) * MaxItemsPerPage;
    const endIdx = startIdx + MaxItemsPerPage;
    const faqsToShow = faqs ? faqs.slice(startIdx, endIdx) : [];

    const onGoToFirst = () => setCurrentPage(1);
    const onGoToLast = () => setCurrentPage(totalPages);
    const onGoToPrev = () => setCurrentPage(page => Math.max(1, page - 1));
    const onGoToNext = () => setCurrentPage(page => Math.min(totalPages, page + 1));

    //===========================================================================================================================
    const onSearchFAQs = useCallback(async(
        /** Value of userSearch detached as to not require a dependency. */
        query: string) => {
        const queryTrimmed = query.trim();
        if (query === '') {
            await loadFAQs();
        } else {
            await searchFAQs(queryTrimmed);
        }
        setCurrentPage(1);
    }, [loadFAQs, searchFAQs])

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
    /** Closes and resets the user submit question form. */
    const onCloseSubmitQuestionForm = () => {
        setSubmitQuestionIsVisible(false);
        setSubmitQuestionForm(defaultSubmitQuestionForm);
    }

    //===========================================================================================================================

    const onSubmitQuestion = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitQuestionForm.question.trim() === '') { return; }

        const submitResponse = await submitFAQ(submitQuestionForm);
        if (submitResponse.hasError) {
            setAlert(prev => ({
                ...prev,
                show: true,
                message: submitResponse.friendlyErrorMessage
            }));

            return;
        }

        onCloseSubmitQuestionForm();
        toast.success('FAQ Submitted Successfully!');
    }

    //===========================================================================================================================

    const onSubmitQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        onCommonHandleChange(e, setSubmitQuestionForm);
    }

    //===========================================================================================================================
    useEffect(() => {
        //--First load, we will just get the top 10 faqs.
        //--Then let the search control the rest.
        const loader = async() => {
            await onSearchFAQs('');
        }

        loader();
    }, [loadFAQs, onSearchFAQs])

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <SectionLabel label="Frequently Asked Questions" />
                    </Col>
                </Row>

                <Row className="mt-3 align-items-end">
                    <Col xs={12} lg>
                        <InputGroup>
                            <FloatingLabel label="Search">
                                <Form.Control type="text" 
                                              placeholder="Search" 
                                              value={userSearch} 
                                              onChange={(e) => setUserSearch(e.target.value)}
                                              onKeyUp={(e) => {
                                                if (e.key === "Enter") {
                                                    onSearchFAQs(userSearch);
                                                }
                                              }} />
                            </FloatingLabel>
                            <InputGroup.Text className="pi pi-search d-flex align-items-center" role="button" onClick={() => onSearchFAQs(userSearch)}></InputGroup.Text> 
                        </InputGroup>
                    </Col>
                    <Col xs={12} lg="auto" className="mt-2">
                        <Button className="w-100" onClick={() => setSubmitQuestionIsVisible(true)}>Ask A Question</Button>
                    </Col>
                </Row>

                {/* FAQ LIST */}
                <Row className="position-relative mt-4" style={{minHeight: '100px'}}>
                    <Col>
                        <div>
                            <Pagination className="d-flex w-100 mb-1">
                                <Pagination.First onClick={onGoToFirst} disabled={currentPage === 1} />
                                <Pagination.Prev onClick={onGoToPrev} disabled={currentPage === 1} />
                                <Pagination.Item disabled className="flex-fill text-center">
                                    Page {currentPage} of {totalPages}
                                </Pagination.Item>
                                <Pagination.Next onClick={onGoToNext} disabled={currentPage === totalPages} />
                                <Pagination.Last onClick={onGoToLast} disabled={currentPage === totalPages} />
                            </Pagination>
                        </div>
                        <FAQsList faqs={faqsToShow} onVote={onVote} faqVotes={faqVotes} />
                        {
                            loadingFAQs && <BusyIndicator />
                        }
                        {
                            faqsError.hasError && <ErrorIndicator />
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

            {/* SUBMIT QUESTION MODAL */}
            <Modal show={submitQuestionIsVisible} onHide={onCloseSubmitQuestionForm} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Submit FAQ Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-justified">
                        Thank you for wanting to submit a question for the FAQ. This is for general questions,
                        so if you're looking to ask a question about a specific product or something personal
                        please use our contact form in the Contact Us page instead.
                    </p>
                    <Form id="submit-question-form" className="mt-4" onSubmit={onSubmitQuestion}>
                        <FloatingLabel label={<RequiredFieldLabel label="Question" />}>
                            <FormControl type="text" required value={submitQuestionForm.question} name="question" onChange={onSubmitQuestionChange} placeholder="Question" />
                        </FloatingLabel>
                        <FloatingLabel label="Email" className="mt-2">
                            <FormControl type="email" name="email" value={submitQuestionForm.email} onChange={onSubmitQuestionChange} placeholder="Email" />
                        </FloatingLabel>
                        <Form.Text muted>Optionally enter your email to be informed when a question is answered.</Form.Text>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" form="submit-question-form" style={{width: '100px'}}>SUBMIT</Button>
                    <Button type="button" style={{width: '100px'}} onClick={onCloseSubmitQuestionForm}>CLOSE</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AllFAQs;
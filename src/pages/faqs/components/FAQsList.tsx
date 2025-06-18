import type IFAQsList from "@/tools/interfaces/IFAQsList";
import { Accordion } from "react-bootstrap";

const FAQsList = ({faqs, onVote, faqVotes}: IFAQsList) => {
    return (
        <Accordion>
            {
                faqs?.map((faq) => (
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
    )
}

export default FAQsList;
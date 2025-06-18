import type IFAQ from "./IFAQ";

/** Describes the structure for the IFAQsList props. */
export default interface IFAQsList {
    /** FAQs list */
    faqs: IFAQ[] | undefined,
    /** Voting handler */
    onVote: (faqId: number, voteType: "up" | "down") => Promise<void>,
    /** Voting tracker. */
    faqVotes: {[faqId: number]: "up" | "down"}
}
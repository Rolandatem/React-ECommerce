/** DTO For FAQ data from the API. */
export default interface IFAQ {
    /** DB ID */
    id: number,
    /** FAQ Question */
    question: string,
    /** FAQ Answer */
    answer: string,
    /** Number of times FAQ has been upvoted. */
    upVotes: number,
    /** Number of times FAQ has been downvoted. */
    downVotes: number
}
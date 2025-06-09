import type { IAPIError } from "./interfaces";

/**
 * Custom exception used for API errors.
 */
export class APIError extends Error {
    /**
     * @param error Error information returned from the API.
     */
    constructor(error: IAPIError) {
        super(error.exceptionMessage);
        this.stackTrace = error.stackTrace;
    }

    /** API Error stack trace. */
    public stackTrace: string;
}
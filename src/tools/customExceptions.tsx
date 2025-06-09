import type { IAPIError } from "./interfaces";

export class APIError extends Error {
    constructor(error: IAPIError) {
        super(error.message);
        this.exceptionMessage = error.exceptionMessage;
        this.stackTrace = error.stackTrace;
    }

    public exceptionMessage: string;
    public stackTrace: string;
}
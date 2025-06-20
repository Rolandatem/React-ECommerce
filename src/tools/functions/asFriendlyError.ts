import Error404 from "../exceptions/Error404";
import type IFriendlyError from "../interfaces/IFriendlyError";

/**
 * After-error handler that returns an IFriendlyError for the consumer to use.
 * The idea is to set up a structure where we can catch specific error types
 * and do something for them if necessary or leave to fallback on a simple
 * return. This gives us a single source of truth that instantly propogates
 * within the app.
 * TODO: Introduce logging?
 * @param error 
 * @param fallbackMsg 
 * @returns IFriendlyError
 */
const asFriendlyError = (
    error: unknown,
    fallbackMsg: string = "Sorry, something went wrong.") : IFriendlyError => {
    
    /** Set initial message. Can change friendly message by specific error handling. */
    const returnMessage: IFriendlyError = {
        hasError: true,
        friendlyErrorMessage: fallbackMsg
    };

    //--Example: Handle network errors.
    if (error instanceof TypeError && error.message === "Failed to fetch") {
        returnMessage.friendlyErrorMessage = "Network issue: Please check your internet connection.";
        returnMessage.errorType = TypeError;
        return returnMessage;
    }

    if (error instanceof Error404) {
        returnMessage.friendlyErrorMessage = "Not Found.";
        returnMessage.errorType = Error404;
        return returnMessage;
    }

    //--Catch native JS errors (all fallbacks covered here if not previously handled)
    if (error instanceof Error) {
        //--Maybe logging here using error.Message?
        return returnMessage;
    }

    //--Catch any other error (non-error object, etc)
    return returnMessage;
}

export default asFriendlyError;
/**
 * Defines structure used for the Contact Us form.
 */
export default interface IContactForm {
    /** Reason for contact. */
    reasonForContact: string,
    /** Email to respond back to. */
    email: string,
    /** Subject of the contact. */
    subject: string,
    /** Method prefered to be contacted by. */
    contactMethod: string,
    /** Submitters first name. */
    firstName: string,
    /** Submitters last name. */
    lastName: string,
    /** Optional phone number of submitter. */
    phone?: string,
    /** Description of issue needing assistance for. */
    description: string
}
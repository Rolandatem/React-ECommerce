/**
 * Contains stateful functions passed to children components in the
 * newsletter pipeline.
 * 
 * @param joinNewsletter Function handler to join the newsletter.
 * @param email.getter Signup email value.
 * @param email.setter Function used to update the email stateful object.
 */
export default interface INewsletterProps {
    /** Function handler used to join the newsletter. */
    joinNewsletter: (e:React.FormEvent<HTMLFormElement>) => void | null,

    /** React stateful email object container. */
    email: {
        /** Gets the email value. */
        getter: string | undefined,

        /** Function used to update the email value. */
        setter: React.Dispatch<React.SetStateAction<string | undefined>>
    }
}
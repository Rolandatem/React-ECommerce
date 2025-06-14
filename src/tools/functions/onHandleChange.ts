/**
 * Common state changing handler for objects in React.
 * 
 * USAGE:
 * Assuming there is a react state change function named setContactForm for a value that
 * implements IContactForm.
 * 
 * const onHandleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
 *      onCommonHandleChange<IContactForm>(e, setContactForm);
 * }
 * 
 * @param e React change event.
 * @param setState Set state function.
 */
const onCommonHandleChange = <T extends object>(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    setState: React.Dispatch<React.SetStateAction<T>>) => {
    const {name, value, type} = e.target;
    setState(prev => ({
        ...prev,
        [name]:type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : value
    }));
}

export default onCommonHandleChange;
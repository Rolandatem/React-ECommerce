/**
 * Function used to capitalize the first letter of the string.
 * @param val String to capitalize.
 * @returns Capitalized string.
 */
const capitalize = (val: string) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default capitalize;
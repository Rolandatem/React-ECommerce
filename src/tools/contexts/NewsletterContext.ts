import { createContext } from "react";
import type INewsletterProps from "../interfaces/INewsletterProps";

/** Context used to contain news letter signup information and events.  */
const NewsletterContext = createContext<INewsletterProps | null>(null);

export default NewsletterContext;
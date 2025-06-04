import { createContext } from "react";
import { type INewsletterProps } from "./interfaces";

export const NewsletterContext = createContext<INewsletterProps | null>(null);
import { createContext } from "react";
import { 
    type ISiteSettings, 
    type INewsletterProps } from "./interfaces";

export const NewsletterContext = createContext<INewsletterProps | null>(null);
export const SiteSettingsContext = createContext<ISiteSettings | null>(null);
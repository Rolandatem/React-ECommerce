import { createContext } from "react";
import { 
    type ISiteSettings, 
    type INewsletterProps } from "./interfaces";

/** Context used to contain news letter signup information and events.  */
export const NewsletterContext = createContext<INewsletterProps | null>(null);

/** Context used to contain site wide settings. */
export const SiteSettingsContext = createContext<ISiteSettings | null>(null);
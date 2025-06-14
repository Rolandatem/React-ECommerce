import { createContext } from "react";
import type ISiteSettings from "../interfaces/ISiteSettings";

/** Context used to contain site wide settings. */
const SiteSettingsContext = createContext<ISiteSettings | null>(null);

export default SiteSettingsContext;
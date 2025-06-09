import { useContext } from "react";
import HomeCarousel from "./components/HomeCarousel";
import TrendingProducts from "./components/TrendingProducts";
import { SiteSettingsContext } from "@/tools/contexts";
import MobileTrendingProducts from "./components/MobileTrendingProducts";
import SectionLabel from "../common/components/SectionLabel";
import { Container } from "react-bootstrap";

/** Home Page Component */
const Home = () => {
    const siteSettings = useContext(SiteSettingsContext);

    return (
        <>
            <Container fluid className="p-0 text-dark">
                <HomeCarousel />

                <SectionLabel className="mt-5" label="Trending Products" />
                {
                    siteSettings?.isMobile
                        ? <MobileTrendingProducts className="mt-3" />
                        : <TrendingProducts className="mt-3" />
                }
            </Container>
        </>
    )
}

export default Home;
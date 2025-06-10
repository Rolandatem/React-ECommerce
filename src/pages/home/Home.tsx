import { useContext } from "react";
import HomeCarousel from "./components/HomeCarousel";
import TrendingProducts from "./components/TrendingProducts";
import { SiteSettingsContext } from "@/tools/contexts";
import MobileTrendingProducts from "./components/MobileTrendingProducts";
import { Container } from "react-bootstrap";
import ShopByCategory from "./components/ShopByCategory";

/** Home Page Component */
const Home = () => {
    const siteSettings = useContext(SiteSettingsContext);

    return (
        <>
            <Container fluid className="p-0 text-dark">
                <HomeCarousel />

                <ShopByCategory />

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
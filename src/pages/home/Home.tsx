import { useContext } from "react";
import HomeCarousel from "./components/HomeCarousel";
import TrendingProducts from "./components/TrendingProducts";
import MobileTrendingProducts from "./components/MobileTrendingProducts";
import ShopByCategory from "./components/ShopByCategory";
import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import Container from 'react-bootstrap/Container';

/** Home Page Component */
const Home = () => {
    const siteSettings = useContext(SiteSettingsContext);

    return (
        <>
            <Container fluid className="p-0 text-dark mt-n5">
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
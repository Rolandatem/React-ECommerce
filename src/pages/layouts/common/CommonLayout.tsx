import { Outlet } from "react-router";
import CommonLayoutHeader from "./components/CommonLayoutHeader";
import CommonLayoutFooter from "./components/CommonLayoutFooter";

/**
 * Common Layout used for the site. May use another layout specific to the page.
 */
const CommonLayout = () => {    return (
        <>
            <CommonLayoutHeader />
            <Outlet />
            <CommonLayoutFooter />
        </>
    )
}

export default CommonLayout;
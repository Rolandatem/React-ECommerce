import { Outlet } from "react-router";
import CommonLayoutHeader from "./components/CommonLayoutHeader";
import CommonLayoutFooter from "./components/CommonLayoutFooter";

/**
 * Common Layout used for the site. May use another layout specific to the page.
 */
const CommonLayout = () => {    return (
        <>
            <CommonLayoutHeader />
            <div className="mt-5">
                <Outlet />
            </div>
            <CommonLayoutFooter />
        </>
    )
}

export default CommonLayout;
import { Outlet } from "react-router";
import CommonLayoutHeader from "./components/CommonLayoutHeader";
import CommonLayoutFooter from "./components/CommonLayoutFooter";

const CommonLayout = () => {    return (
        <>
            <CommonLayoutHeader />
            <Outlet />
            <CommonLayoutFooter />
        </>
    )
}

export default CommonLayout;
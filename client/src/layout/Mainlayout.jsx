import { Outlet, useLocation, matchPath } from "react-router-dom";
import Navbar from "../components/Nav";
import CreateTabButton from "../components/Tab/CreateTabButton";
import NameWrapper from "../components/others/NameWrapper";

const HIDDEN_BUTTON_PATHS = [
    "/profile",
    { pattern: "/tab/:tabId" },
    { pattern: "/tab/:tabId/create-entry" },
    { pattern: "/tab/:tabId/all-entries" },
];

const isPathHidden = (pathname) => {
    return HIDDEN_BUTTON_PATHS.some((route) => {
        if (typeof route === "string") return pathname === route;
        if (route.pattern) return matchPath(route.pattern, pathname);
        return false;
    });
};

const MainLayout = () => {
    const { pathname } = useLocation();
    const hideButton = isPathHidden(pathname);

    return (
        <NameWrapper>
            <Navbar />

            <main className="min-h-[calc(100vh-60px)]">
                <Outlet />
            </main>

            {!hideButton && <CreateTabButton />}
        </NameWrapper>
    );
};

export default MainLayout;

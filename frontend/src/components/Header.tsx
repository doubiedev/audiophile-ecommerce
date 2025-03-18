import { useLocation } from "react-router";
import { useResponsive } from "../contexts/ResponsiveContext";
import Navbar from "./Navbar";
import LayoutContainer from "./LayoutContainer";
import heroImgDesktop from "../assets/home/desktop/image-hero.jpg";
import heroImgTablet from "../assets/home/tablet/image-header.jpg";
import heroImgMobile from "../assets/home/mobile/image-header.jpg";

const Header = () => {
    const location = useLocation();
    const { isDesktop, isTablet } = useResponsive();

    const heroImage = isDesktop
        ? heroImgDesktop
        : isTablet
            ? heroImgTablet
            : heroImgMobile;

    const headerClass = isDesktop
        ? "bg-center object-contain"
        : isTablet
            ? "bg-center"
            : "bg-center";

    const navbarClass =
        location.pathname === "/" ? "bg-transparent" : "bg-black";

    return (
        <header
            className={`h-[600px] sm:h-[729px] ${headerClass}`}
            style={{
                backgroundImage: `url(${heroImage})`,
            }}
        >
            <LayoutContainer>
                <Navbar className={navbarClass} />
            </LayoutContainer>
        </header>
    );
};

export default Header;

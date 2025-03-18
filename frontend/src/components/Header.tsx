import { useLocation } from "react-router";
import { useResponsive } from "../contexts/ResponsiveContext";
import Navbar from "./Navbar";
import LayoutContainer from "./LayoutContainer";
import heroImgDesktop from "../assets/home/desktop/image-hero.jpg";
import heroImgTablet from "../assets/home/tablet/image-header.jpg";
import heroImgMobile from "../assets/home/mobile/image-header.jpg";

// TODO: Responsive design for tablet and mobile images
// BUG: Hero image repeats in the y-axis

const Header = () => {
    const location = useLocation();
    const { isDesktop, isTablet } = useResponsive();

    const heroImage = isDesktop
        ? heroImgDesktop
        : isTablet
            ? heroImgTablet
            : heroImgMobile;

    const navbarClass =
        location.pathname === "/" ? "bg-transparent" : "bg-black";

    return (
        <header
            className={`h-[600px] sm:h-[729px] bg-center bg-no-repeat bg-auto sm:bg-cover md:bg-contain bg-[#191919]`}
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

import { useLocation } from "react-router";
import { useResponsive } from "../contexts/ResponsiveContext";
import Navbar from "./Navbar";
import LayoutContainer from "./LayoutContainer";
import heroImgDesktop from "../assets/home/desktop/image-hero.jpg";
import heroImgTablet from "../assets/home/tablet/image-header.jpg";
import heroImgMobile from "../assets/home/mobile/image-header.jpg";
import BtnOrange from "./BtnOrange";

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
            className={`h-[600px] sm:h-[729px] bg-center bg-no-repeat bg-cover sm:bg-cover md:bg-contain bg-[#191919]`}
            style={{
                backgroundImage: `url(${heroImage})`,
            }}
        >
            <LayoutContainer>
                <Navbar className={navbarClass} />
                <section className="h-full flex">
                    <div className="h-full flex-1 flex flex-col justify-center text-white">
                        <div className="flex flex-col gap-y-[40px]">
                            <div className="flex flex-col gap-y-[24px]">
                                <p className="overline">New Product</p>
                                <h1>XX99 Mark II Headphones</h1>
                                <p>
                                    Experience natural, lifelike audio and
                                    exceptional build quality made for the
                                    passionate music enthusiast.
                                </p>
                            </div>
                            <BtnOrange />
                        </div>
                    </div>
                    {isDesktop && <div className="flex-1"></div>}
                    {isDesktop && <div className="flex-1"></div>}
                </section>
            </LayoutContainer>
        </header>
    );
};

export default Header;

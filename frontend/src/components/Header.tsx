import { useLocation } from "react-router";
import { useResponsive } from "../contexts/ResponsiveContext";
import Navbar from "./Navbar";
import LayoutContainer from "./LayoutContainer";
import heroImgDesktop from "../assets/home/desktop/image-hero.jpg";
import heroImgTablet from "../assets/home/tablet/image-header.jpg";
import BtnOrange from "./BtnOrange";

const Header = () => {
    const location = useLocation();
    const { isDesktop } = useResponsive();

    const heroImage = isDesktop ? heroImgDesktop : heroImgTablet;

    return (
        <>
            {location.pathname === "/" ? (
                <header
                    className={`h-[600px] sm:h-[729px] bg-center bg-no-repeat bg-cover sm:bg-cover md:bg-contain bg-[#191919]`}
                    style={{
                        backgroundImage: `url(${heroImage})`,
                    }}
                >
                    <LayoutContainer>
                        <Navbar />
                        <section className="h-full flex justify-center lg:justify-baseline">
                            <div className="text-white min-w-0 w-full max-w-[379px] h-full lg:flex-1 flex flex-col justify-center">
                                <div className="flex flex-col gap-y-[40px] items-center lg:items-baseline">
                                    <div className="flex flex-col gap-y-[24px] items-center lg:items-baseline">
                                        <p className="overline opacity-50">
                                            New Product
                                        </p>
                                        <h1 className="text-center hidden sm:inline lg:text-left">
                                            XX99 Mark II Headphones
                                        </h1>
                                        <h3 className="text-center sm:hidden">
                                            XX99 Mark II Headphones
                                        </h3>
                                        <p className="text-center lg:text-left opacity-75">
                                            Experience natural, lifelike audio
                                            and exceptional build quality made
                                            for the passionate music enthusiast.
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
            ) : (
                <header className="bg-black">
                    <LayoutContainer>
                        <Navbar />
                    </LayoutContainer>
                </header>
            )}
        </>
    );
};

export default Header;

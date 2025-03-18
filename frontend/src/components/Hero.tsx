import { useResponsive } from "../contexts/ResponsiveContext";
import imageHeroDesktop from "../assets/home/desktop/image-hero.jpg";
import imageHeroTablet from "../assets/home/tablet/image-header.jpg";
import imageHeroMobile from "../assets/home/mobile/image-header.jpg";

const Hero = () => {
    const { isMobile, isTablet, isDesktop } = useResponsive();
    return (
        <div className="bg-[#191919] h-[510px] md:h-[639px] flex justify-center">
            {isDesktop && (
                <img
                    src={imageHeroDesktop}
                    className="h-[510px] md:h-[639px] object-contain"
                />
            )}
            {isTablet && (
                <img
                    src={imageHeroTablet}
                    className="w-screen h-[510px] md:h-[639px] object-contain"
                />
            )}
            {isMobile && (
                <img
                    src={imageHeroMobile}
                    className="w-screen h-[510px] md:h-[639px] object-contain"
                />
            )}
        </div>
    );
};

export default Hero;

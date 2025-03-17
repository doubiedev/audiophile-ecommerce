import imageHero from "../assets/home/desktop/image-hero.jpg";
import imageHeroTablet from "../assets/home/tablet/image-header.jpg";
import imageHeroMobile from "../assets/home/mobile/image-header.jpg";

const Hero = () => {
    return (
        <div className="bg-[#191919] h-[510px] md:h-[639px]">
            <img
                src={imageHero}
                className="w-screen h-[510px] md:h-[639px] object-contain"
            />
        </div>
    );
};

export default Hero;

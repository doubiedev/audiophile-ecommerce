import zx9Speaker from "../assets/home/desktop/image-speaker-zx9.png";
import zx7Speaker from "../assets/home/desktop/image-speaker-zx7.jpg";
import yx9Earphones from "../assets/home/desktop/image-earphones-yx1.jpg";
import ProductCircles from "../assets/home/desktop/pattern-circles.svg";
import BtnDark from "./BtnDark";
import BtnTransparent from "./BtnTransparent";

// TODO: Add general button component instead of multiple versions
const ProductShowcase = () => {
    return (
        <section>
            <div className="relative mb-[3rem] flex bg-orange-dark rounded-lg">
                <div className="absolute top-[-20px] left-[-160px]">
                    <ProductCircles />
                </div>
                <div className="flex-1 overflow-hidden">
                    <img
                        src={zx9Speaker}
                        alt="ZX9 Speaker"
                        className="relative w-[395px] top-[6rem] left-[120px]"
                    />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="mx-[95px] mt-[133px] mb-[124px]">
                        <h1 className="mb-[1.5rem] text-white">
                            ZX9 <br />
                            Speaker
                        </h1>
                        <p className="mb-[40px] text-white opacity-75">
                            Upgrade to premium speakers that are phenomenally
                            built to deliver truly remarkable sound.
                        </p>
                        <BtnDark />
                    </div>
                </div>
            </div>

            <div
                className="relative flex rounded-lg bg-grey-dark h-[320px] items-center"
                style={{ backgroundImage: `url(${zx7Speaker})` }}
            >
                <div className="flex flex-col ml-[95px] gap-[2rem]">
                    <h3>ZX7 Speaker</h3>
                    <BtnTransparent />
                </div>
            </div>

            <div>
                <div>YX1 Earphones IMG</div>
                <div>
                    <div>YX1 Earphones</div>
                    <BtnTransparent />
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;

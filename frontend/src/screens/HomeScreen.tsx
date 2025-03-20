import LayoutContainer from "../components/LayoutContainer";
import BtnShop from "../components/BtnShop";
import headphones from "../assets/shared/desktop/image-category-thumbnail-headphones.png";
import speakers from "../assets/shared/desktop/image-category-thumbnail-speakers.png";
import earphones from "../assets/shared/desktop/image-category-thumbnail-earphones.png";

const HomeScreen = () => {
    return (
        <LayoutContainer>
            <div className="mt-[120px] flex gap-[30px]">
                <div className="relative h-[284px] w-full">
                    <div className="z-[-1] absolute top-0 h-[80px] w-full bg-white"></div>
                    <div className="z-[-1] absolute top-[80px] h-[204px] w-full bg-grey-dark"></div>
                    <div className="h-full">
                        <img src={headphones} className="object-scale-down" />
                        <h6>Headphones</h6>
                        <BtnShop />
                    </div>
                </div>
                <div className="">
                    <img src={speakers} />
                    <h6>Speakers</h6>
                    <BtnShop />
                </div>
                <div className="">
                    <img src={earphones} />
                    <h6>Earphones</h6>
                    <BtnShop />
                </div>
            </div>
            <section>Products Showcase Component</section>
            <section>About us Component</section>
        </LayoutContainer>
    );
};

export default HomeScreen;

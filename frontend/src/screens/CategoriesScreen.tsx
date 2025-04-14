import { useLocation } from "react-router";
import ProductCard from "../components/ProductCard";
import LayoutContainer from "../components/LayoutContainer";
import Categories from "../components/Categories";
import BestGear from "../components/BestGear";

const CategoriesScreen = () => {
    const location = useLocation();

    return (
        <LayoutContainer>
            <section className="flex flex-col gap-[10rem] mt-[10rem]">
                {location.pathname === "/headphones" && (
                    <>
                        <ProductCard id={1} />
                        <ProductCard id={2} isImageLeft={false} />
                        <ProductCard id={3} />
                    </>
                )}
                {location.pathname === "/speakers" && (
                    <>
                        <ProductCard id={4} />
                        <ProductCard id={5} isImageLeft={false} />
                    </>
                )}
                {location.pathname === "/earphones" && (
                    <>
                        <ProductCard id={6} />
                    </>
                )}
                <Categories />
                <BestGear />
            </section>
        </LayoutContainer>
    );
};

export default CategoriesScreen;

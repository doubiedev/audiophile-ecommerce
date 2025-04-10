import { useLocation } from "react-router";
import ProductCard from "../components/ProductCard";
import LayoutContainer from "../components/LayoutContainer";
import Categories from "../components/Categories";
import BestGear from "../components/BestGear";

const CategoriesScreen = () => {
    const location = useLocation();

    return (
        <LayoutContainer>
            {location.pathname === "/headphones" && (
                <>
                    <ProductCard id={1} isImageLeft={true} />
                    <ProductCard id={2} isImageLeft={false} />
                    <ProductCard id={3} isImageLeft={true} />
                </>
            )}
            {location.pathname === "/speakers" && (
                <>
                    <ProductCard id={4} isImageLeft={true} />
                    <ProductCard id={5} isImageLeft={false} />
                </>
            )}
            {location.pathname === "/earphones" && (
                <>
                    <ProductCard id={6} isImageLeft={true} />
                </>
            )}
            <div className="h-[10rem]"></div>
            <Categories />
            <div className="h-[10rem]"></div>
            <BestGear />
        </LayoutContainer>
    );
};

export default CategoriesScreen;

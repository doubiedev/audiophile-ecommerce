import LayoutContainer from "../components/LayoutContainer";
import Categories from "../components/Categories";
import ProductShowcase from "../components/ProductShowcase";
import BestGear from "../components/BestGear";

const HomeScreen = () => {
    return (
        <LayoutContainer>
            <section className="my-[6rem]">
                <Categories />
            </section>
            <ProductShowcase />
            <BestGear />
        </LayoutContainer>
    );
};

export default HomeScreen;

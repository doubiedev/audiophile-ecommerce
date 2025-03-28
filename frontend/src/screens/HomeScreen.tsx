import LayoutContainer from "../components/LayoutContainer";
import Categories from "../components/Categories";
import ProductShowcase from "../components/ProductShowcase";

const HomeScreen = () => {
    return (
        <LayoutContainer>
            <section className="my-[6rem]">
                <Categories />
            </section>
            <ProductShowcase />
            <section>About us Component</section>
        </LayoutContainer>
    );
};

export default HomeScreen;

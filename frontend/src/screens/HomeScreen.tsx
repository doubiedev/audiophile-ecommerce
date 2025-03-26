import LayoutContainer from "../components/LayoutContainer";
import Categories from "../components/Categories";

const HomeScreen = () => {
    return (
        <LayoutContainer>
            <section className="my-[6rem]">
                <Categories />
            </section>
            <section>Products Showcase Component</section>
            <section>About us Component</section>
        </LayoutContainer>
    );
};

export default HomeScreen;

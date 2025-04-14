import LayoutContainer from "../components/LayoutContainer";
import Categories from "../components/Categories";
import BestGear from "../components/BestGear";
import { useParams, useNavigate } from "react-router";
import data from "../data.json";
import { useMemo } from "react";
import ProductCard from "../components/ProductCard";

const ProductScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const productId = parseInt(id as string);
    const product = data.find((item) => item.id === productId);
    const images = useMemo(
        () =>
            import.meta.glob("../assets/**/*.{jpg,png,jpeg,webp,svg}", {
                eager: true,
                import: "default",
            }),
        [],
    );

    if (!product) return <p>Product not found.</p>;

    const imagePath = `../assets/${product.image.desktop}`;
    const imageSrc = images[imagePath] as string;

    return (
        <LayoutContainer>
            <section>
                <p
                    onClick={() => navigate(-1)}
                    className="opacity-50 mt-[80px] mb-[3.5rem] hover:cursor-pointer"
                >
                    Go Back
                </p>
                <ProductCard id={productId} isPurchasable={true} />

                <div>Features</div>
                <div>In the box</div>
                <div>Product Showcase Images</div>
                <div>You may also like</div>
                <Categories />
                <BestGear />
            </section>
        </LayoutContainer>
    );
};

export default ProductScreen;

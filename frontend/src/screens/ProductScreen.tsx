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

    const showcaseImages = product.image.showcases.map((relativePath) => {
        const imagePath = `../assets/${relativePath}`;
        return images[imagePath] as string;
    });

    return (
        <LayoutContainer>
            <p
                onClick={() => navigate(-1)}
                className="opacity-50 mt-[80px] mb-[3.5rem] hover:cursor-pointer"
            >
                Go Back
            </p>
            <div className="flex flex-col gap-[10rem]">
                <ProductCard id={productId} isPurchasable={true} />
                <div className="flex gap-[125px]">
                    <div className="flex flex-col gap-[2rem] w-[635px]">
                        <h3>Features</h3>
                        <p className="opacity-50">
                            {product.features[0]} <br /> <br />{" "}
                            {product.features[1]}
                        </p>
                    </div>
                    <div className="flex flex-col gap-[2rem] w-[350px]">
                        <h3>In the box</h3>
                        <div className="flex flex-col gap-[0.5rem]">
                            {product.inTheBox.map((item, idx) => (
                                <div className="flex" key={idx}>
                                    <div className="w-[39px]">
                                        <p className="text-orange-dark text-bold">
                                            {item.quantity}x&nbsp;
                                        </p>
                                    </div>
                                    <p className="opacity-50">{item.item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-[30px]">
                        <img
                            src={showcaseImages[0]}
                            alt={`${product.name} showcase 1`}
                        />
                        <img
                            src={showcaseImages[1]}
                            alt={`${product.name} showcase 2`}
                        />
                    </div>
                    <img
                        src={showcaseImages[2]}
                        alt={`${product.name} showcase 3`}
                    />
                </div>
                <div>You may also like</div>
                <Categories />
                <BestGear />
            </div>
        </LayoutContainer>
    );
};

export default ProductScreen;

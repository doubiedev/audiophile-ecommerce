import { useMemo } from "react";
import BtnOrange from "./BtnOrange";
import data from "../data.json";
import { useNavigate } from "react-router";
import BtnAddToCart from "./BtnAddToCart";

interface ProductProps {
    id: number;
    isImageLeft?: boolean;
    isPurchasable?: boolean;
}

const ProductCard = ({
    id,
    isImageLeft = true,
    isPurchasable = false,
}: ProductProps) => {
    const navigate = useNavigate();
    const product = data.find((item) => item.id === id);

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
        <div className="flex gap-[125px] items-center">
            {isImageLeft && (
                <div className="flex-1">
                    {imageSrc && <img src={imageSrc} alt={product.name} />}
                </div>
            )}

            <div className="flex-1">
                {product.isNewProduct && (
                    <p className="overline text-orange-dark mb-[1rem]">
                        New Product
                    </p>
                )}
                <h2>{product.name}</h2>
                <p className="mt-[2rem] mb-[40px]">{product.description}</p>
                {isPurchasable ? (
                    <div className="flex flex-col gap-[47px]">
                        <h6>$ {product.price.toLocaleString()}</h6>
                        <div className="">
                            <BtnAddToCart />
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            navigate(`/products/${id}`);
                            window.scrollTo(0, 0);
                        }}
                    >
                        <BtnOrange />
                    </div>
                )}
            </div>

            {!isImageLeft && (
                <div className="flex-1">
                    {imageSrc && <img src={imageSrc} alt={product.name} />}
                </div>
            )}
        </div>
    );
};

export default ProductCard;

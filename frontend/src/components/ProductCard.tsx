import { useMemo } from "react";
import BtnOrange from "./BtnOrange";
import data from "../data.json";

interface ProductProps {
    id: number;
    isImageLeft: boolean;
}

// INFO: In the middle of using data.json as fake backend to get product data for ProductCards -> CategoriesScreen

const ProductCard = ({ id, isImageLeft }: ProductProps) => {
    const product = data.find((item) => item.id === id);

    const images = useMemo(
        () =>
            import.meta.glob("../assets/**/*.{jpg,png,jpeg,webp,svg}", {
                eager: true,
                import: "default",
            }),
        [],
    );

    console.log("Image keys:", Object.keys(images));

    if (!product) return <p>Product not found.</p>;

    const imagePath = `../assets/${product.image.desktop}`;
    const imageSrc = images[imagePath] as string;

    return (
        <div className="mt-[10rem] flex gap-[125px] items-center">
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
                <BtnOrange />
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

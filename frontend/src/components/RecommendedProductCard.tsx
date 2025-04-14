import { useMemo } from "react";
import data from "../data.json";
import BtnOrange from "./BtnOrange";
import { useNavigate } from "react-router";

interface RecProductProps {
    id: number;
}

const RecommendedProductCard = ({ id }: RecProductProps) => {
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
        <div className="flex flex-col items-center">
            <img src={imageSrc} alt={product.name} />
            <h4 className="mt-[40px] mb-[2rem]">{product.name}</h4>
            <div
                onClick={() => {
                    navigate(`/products/${id}`);
                    window.scrollTo(0, 0);
                }}
            >
                <BtnOrange />
            </div>
        </div>
    );
};

export default RecommendedProductCard;

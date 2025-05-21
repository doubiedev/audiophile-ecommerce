import { useApp } from "../contexts/AppContext";
import { useNavigate } from "react-router";
import BtnOrange from "./BtnOrange";

interface RecProductProps {
    id: number;
}

const RecommendedProductCard = ({ id }: RecProductProps) => {
    const navigate = useNavigate();
    const { data, images } = useApp();
    const product = data.find((item) => item.id === id);

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

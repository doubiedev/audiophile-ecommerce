import { useApp } from "../contexts/AppContext";
import { useNavigate } from "react-router";
import BtnOrange from "./BtnOrange";
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
    const { data, images } = useApp();
    const product = data.find((item) => item.id === id);

    if (!product) return <p>Product not found.</p>;
    const productFullName = product.name + " " + product.category;

    const imagePath = `../assets/${product.image.desktop}`;
    const imageSrc = images[imagePath] as string;

    return (
        <div className="flex gap-[125px] items-center">
            {isImageLeft && (
                <div className="flex-1">
                    {imageSrc && <img src={imageSrc} alt={productFullName} />}
                </div>
            )}

            <div className="flex-1">
                {product.new === true && (
                    <p className="overline text-orange-dark mb-[1rem]">
                        New Product
                    </p>
                )}
                <h2>{productFullName}</h2>
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
                    {imageSrc && <img src={imageSrc} alt={productFullName} />}
                </div>
            )}
        </div>
    );
};

export default ProductCard;

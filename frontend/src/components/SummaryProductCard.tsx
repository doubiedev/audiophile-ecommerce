import { useApp } from "../contexts/AppContext";

interface SummaryProductCardProps {
    id: number;
}

const SummaryProductCard = ({ id }: SummaryProductCardProps) => {
    const { cart, data, images } = useApp();

    const product = data.find((item) => item.id === id);
    const item = cart.find((item) => item.id === id);

    if (!product) return <p>Product not found.</p>;
    const productFullName = product.name + " " + product.category;

    const imagePath = `../assets/${product.image.desktop}`;
    const imageSrc = images[imagePath] as string;

    return (
        <div className="flex gap-[1rem] items-center">
            {imageSrc && (
                <img
                    src={imageSrc}
                    className="w-[4rem] rounded-lg"
                    alt={productFullName}
                />
            )}
            <div className="w-full flex justify-between">
                <div className="flex flex-col">
                    <div className="text-[15px] font-bold uppercase">
                        {product.name}
                    </div>
                    <div className="opacity-50 text-[14px] font-bold uppercase">
                        $ {product.price.toLocaleString()}
                    </div>
                </div>
                <div className="opacity-50 font-bold text-[15px]">
                    x{item && item.quantity}
                </div>
            </div>
        </div>
    );
};

export default SummaryProductCard;

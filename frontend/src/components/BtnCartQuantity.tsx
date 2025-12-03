import { useAppUpdate, useApp } from "../contexts/AppContext";

const BtnCartQuantity = ({ productId }: { productId: number }) => {
    const { cart } = useApp();
    const { addProductToCart } = useAppUpdate();

    const item = cart.find((i) => i.productId === productId);
    const qty = item?.quantity ?? 1;

    return (
        <div className="w-[6rem] h-[2rem] flex items-center bg-grey-dark">
            <div
                className="flex-1 text-center opacity-25 cursor-pointer select-none"
                onClick={() => addProductToCart(productId, -1)}
            >
                -
            </div>
            <p className="flex-1 text-center">{qty}</p>
            <div
                className="flex-1 text-center opacity-25 cursor-pointer select-none"
                onClick={() => addProductToCart(productId, +1)}
            >
                +
            </div>
        </div>
    );
};

export default BtnCartQuantity;

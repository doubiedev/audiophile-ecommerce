import { useApp, useAppUpdate } from "../contexts/AppContext";

const CartBackground = () => {
    const { isCartOpen } = useApp();
    const { toggleCart } = useAppUpdate();

    return (
        <>
            {isCartOpen && (
                <div
                    className="fixed z-20 w-screen h-screen bg-black opacity-50"
                    onClick={toggleCart}
                ></div>
            )}
        </>
    );
};

export default CartBackground;

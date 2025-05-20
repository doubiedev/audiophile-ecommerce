import { useNavbar, useNavbarUpdate } from "../contexts/NavbarContext";

const CartBackground = () => {
    const { isCartOpen } = useNavbar();
    const { toggleCart } = useNavbarUpdate();

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

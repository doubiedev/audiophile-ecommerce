import { useNavbar, useNavbarUpdate } from "../contexts/NavbarContext";

const CartBackground = () => {
    const { isCartMenuOpen } = useNavbar();
    const { toggleCartMenu } = useNavbarUpdate();

    return (
        <>
            {isCartMenuOpen && (
                <div
                    className="fixed z-20 w-screen h-screen bg-black opacity-50"
                    onClick={toggleCartMenu}
                ></div>
            )}
        </>
    );
};

export default CartBackground;

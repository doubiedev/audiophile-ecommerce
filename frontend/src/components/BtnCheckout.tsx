import { useNavigate } from "react-router";
import { useNavbarUpdate } from "../contexts/NavbarContext";

const BtnCheckout = () => {
    const navigate = useNavigate();
    const { toggleCart } = useNavbarUpdate();

    return (
        <button
            className="h-[3rem] bg-orange-dark hover:bg-orange-light hover:cursor-pointer"
            onClick={() => {
                toggleCart();
                navigate("/checkout");
            }}
        >
            <p className="subtitle text-white">Checkout</p>
        </button>
    );
};

export default BtnCheckout;

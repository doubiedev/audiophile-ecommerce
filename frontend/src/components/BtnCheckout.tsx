import { useNavigate } from "react-router";

// FIX: Should close cart menu as well
const BtnCheckout = () => {
    const navigate = useNavigate();
    return (
        <button
            className="h-[3rem] bg-orange-dark hover:bg-orange-light hover:cursor-pointer"
            onClick={() => navigate("/checkout")}
        >
            <p className="subtitle text-white">Checkout</p>
        </button>
    );
};

export default BtnCheckout;

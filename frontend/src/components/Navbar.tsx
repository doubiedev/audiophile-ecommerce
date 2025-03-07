import { NavLink } from "react-router";
import Logo from "../assets/shared/desktop/logo.svg";
import Cart from "../assets/shared/desktop/icon-cart.svg";

const Navbar = () => {
    return (
        <nav className="h-[89px] md:h-[96px] flex items-center justify-between border-b-1 border-white/20">
            <Logo />
            <div className="flex gap-x-[34px]">
                <NavLink to="/" className="text-white hover:text-orange-dark">Home</NavLink>
                <NavLink to="/products/headphones" className="text-white hover:text-orange-dark">Headphones</NavLink>
                <NavLink to="/products/speakers" className="text-white hover:text-orange-dark">Speakers</NavLink>
                <NavLink to="/products/earphones" className="text-white hover:text-orange-dark">Earphones</NavLink>
            </div>
            <Cart />
        </nav>
    )
}

export default Navbar;

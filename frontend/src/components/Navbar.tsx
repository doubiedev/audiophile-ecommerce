import { NavLink, useLocation } from "react-router";
import Logo from "../assets/shared/desktop/logo.svg";
import Cart from "../assets/shared/desktop/icon-cart.svg";

const Navbar = () => {
    // TODO: show specific navbar depending on if we are on homepage or not
    const location = useLocation();

    return (
        <>
            {location.pathname === "/" ?
                <nav className="bg-[#141414] h-[89px] md:h-[96px] flex items-center justify-between">
                    <Logo />
                    <div>
                        <NavLink to="/" className="text-white hover:text-orange-dark">Home</NavLink>
                        <NavLink to="/headphones" className="text-white hover:text-orange-dark">Headphones</NavLink>
                        <NavLink to="/speakers" className="text-white hover:text-orange-dark">Speakers</NavLink>
                        <NavLink to="/earphones" className="text-white hover:text-orange-dark">Earphones</NavLink>
                    </div>
                    <Cart />
                </nav>
                :
                <nav className="bg-black h-[89px] md:h-[96px] flex items-center justify-between">
                    <Logo />
                    <div>
                        <NavLink to="/" className="text-white hover:text-orange-dark">Home</NavLink>
                        <NavLink to="/headphones" className="text-white hover:text-orange-dark">Headphones</NavLink>
                        <NavLink to="/speakers" className="text-white hover:text-orange-dark">Speakers</NavLink>
                        <NavLink to="/earphones" className="text-white hover:text-orange-dark">Earphones</NavLink>
                    </div>
                    <Cart />
                </nav>}
        </>
    )
}

export default Navbar;

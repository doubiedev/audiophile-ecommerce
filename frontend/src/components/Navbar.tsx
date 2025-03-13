import { NavLink, useLocation } from "react-router";
import LayoutContainer from "./LayoutContainer";
import Logo from "../assets/shared/desktop/logo.svg";
import Cart from "../assets/shared/desktop/icon-cart.svg";

const Navbar = () => {
    // TODO: show specific navbar depending on if we are on homepage or not
    const location = useLocation();

    return (
        <>
            {location.pathname === "/" ?
                <nav className="bg-[#141414] w-full">
                    <LayoutContainer>
                        <div className="w-full h-[89px] md:h-[96px] flex items-center justify-between">
                            <Logo />
                            <div>
                                <NavLink to="/" className="text-white hover:text-orange-dark">Home</NavLink>
                                <NavLink to="/headphones" className="text-white hover:text-orange-dark">Headphones</NavLink>
                                <NavLink to="/speakers" className="text-white hover:text-orange-dark">Speakers</NavLink>
                                <NavLink to="/earphones" className="text-white hover:text-orange-dark">Earphones</NavLink>
                            </div>
                            <Cart />
                        </div>
                    </LayoutContainer>
                </nav>
                :
                <nav className="bg-black w-full">
                    <LayoutContainer>
                        <div className="w-full h-[89px] md:h-[96px] flex items-center justify-between">
                            <Logo />
                            <div>
                                <NavLink to="/" className="text-white hover:text-orange-dark">Home</NavLink>
                                <NavLink to="/headphones" className="text-white hover:text-orange-dark">Headphones</NavLink>
                                <NavLink to="/speakers" className="text-white hover:text-orange-dark">Speakers</NavLink>
                                <NavLink to="/earphones" className="text-white hover:text-orange-dark">Earphones</NavLink>
                            </div>
                            <Cart />
                        </div>
                    </LayoutContainer>
                </nav>}
        </>
    )
}

export default Navbar;

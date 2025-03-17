import { NavLink, useLocation } from "react-router";
import { useMediaQuery } from "react-responsive";
import LayoutContainer from "./LayoutContainer";
import Logo from "../assets/shared/desktop/logo.svg";
import Cart from "../assets/shared/desktop/icon-cart.svg";
import HamburgerMenu from "../assets/shared/tablet/icon-hamburger.svg";

const Navbar = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname === "/" ?
                <nav className="bg-[#141414] w-full">
                    <NavLinks />
                </nav>
                :
                <nav className="bg-black w-full">
                    <NavLinks />
                </nav>}
        </>
    );
}

const NavLinks = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    return (
        <LayoutContainer>
            <div className="w-full h-[89px] md:h-[96px] flex items-center justify-between">
                {isMobile ?
                    <>
                        <div className="flex items-center">
                            <HamburgerMenu />
                        </div>
                        <Logo />
                        <Cart />
                    </> : <></>}
                {isTablet ?
                    <>
                        <div className="flex gap-x-[42px]">
                            <div className="flex items-center">
                                <HamburgerMenu />
                            </div>
                            <Logo />
                        </div>
                        <Cart />
                    </> : <></>}
                {isDesktop ?
                    <>
                        <Logo />
                        <div className="flex gap-x-[34px]">
                            <NavLink to="/" className="text-white hover:text-orange-dark">Home</NavLink>
                            <NavLink to="/headphones" className="text-white hover:text-orange-dark">Headphones</NavLink>
                            <NavLink to="/speakers" className="text-white hover:text-orange-dark">Speakers</NavLink>
                            <NavLink to="/earphones" className="text-white hover:text-orange-dark">Earphones</NavLink>
                        </div>
                        <Cart />
                    </> : <></>}
            </div>
        </LayoutContainer>
    );
}

export default Navbar;

import { NavLink } from "react-router";
import { useResponsive } from "../contexts/ResponsiveContext";
import Logo from "../assets/shared/desktop/logo.svg";
import Cart from "../assets/shared/desktop/icon-cart.svg";
import HamburgerMenu from "../assets/shared/tablet/icon-hamburger.svg";

interface NavbarProps {
    className?: string;
}

const Navbar = ({ className = "" }: NavbarProps) => {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    return (
        <nav
            className={`${className} w-full h-[89px] md:h-[96px] flex items-center justify-between border-b-1 border-white/20`}
        >
            {isMobile ? (
                <>
                    <div className="flex items-center">
                        <HamburgerMenu />
                    </div>
                    <Logo />
                    <Cart />
                </>
            ) : (
                <></>
            )}
            {isTablet ? (
                <>
                    <div className="flex gap-x-[42px]">
                        <div className="flex items-center">
                            <HamburgerMenu />
                        </div>
                        <Logo />
                    </div>
                    <Cart />
                </>
            ) : (
                <></>
            )}
            {isDesktop ? (
                <>
                    <Logo />
                    <div className="flex gap-x-[34px]">
                        <NavLink
                            to="/"
                            className="navlink text-white hover:text-orange-dark"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/headphones"
                            className="navlink text-white hover:text-orange-dark"
                        >
                            Headphones
                        </NavLink>
                        <NavLink
                            to="/speakers"
                            className="navlink text-white hover:text-orange-dark"
                        >
                            Speakers
                        </NavLink>
                        <NavLink
                            to="/earphones"
                            className="navlink text-white hover:text-orange-dark"
                        >
                            Earphones
                        </NavLink>
                    </div>
                    <Cart />
                </>
            ) : (
                <></>
            )}
        </nav>
    );
};

export default Navbar;

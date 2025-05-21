import { useState } from "react";
import { useResponsive } from "../contexts/ResponsiveContext";
import Logo from "../assets/shared/desktop/logo.svg";
import CartIcon from "../assets/shared/desktop/icon-cart.svg";
import NavMenu from "../assets/shared/tablet/icon-hamburger.svg";
import NavLinks from "./NavLinks";
import { useNavigate } from "react-router";
import Cart from "./Cart";
import { useNavbarUpdate } from "../contexts/NavbarContext";

// TODO: Hamburger menu dropdown

const Navbar = () => {
    const { toggleCartMenu } = useNavbarUpdate();

    const navigate = useNavigate();
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="z-20 bg-transparent w-full h-[89px] md:h-[96px] flex items-center justify-between border-b-1 border-white/20 relative">
            {isMobile && (
                <>
                    <div
                        className="flex items-center"
                        onClick={() => toggleNavbar()}
                    >
                        <NavMenu />
                    </div>
                    <div
                        className="hover:cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <Logo />
                    </div>
                    <div
                        className="hover:cursor-pointer"
                        onClick={toggleCartMenu}
                    >
                        <CartIcon />
                    </div>
                </>
            )}
            {isTablet && (
                <>
                    <div className="flex gap-x-[42px]">
                        <div
                            className="flex items-center"
                            onClick={() => toggleNavbar()}
                        >
                            <NavMenu />
                        </div>
                        <div
                            className="hover:cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            <Logo />
                        </div>
                    </div>
                    <div
                        className="hover:cursor-pointer"
                        onClick={toggleCartMenu}
                    >
                        <CartIcon />
                    </div>
                </>
            )}
            {isDesktop && (
                <>
                    <div
                        className="hover:cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <Logo />
                    </div>
                    <NavLinks />
                    <div
                        className="hover:cursor-pointer"
                        onClick={toggleCartMenu}
                    >
                        <CartIcon />
                    </div>
                </>
            )}
            <Cart />
        </nav>
    );
};

export default Navbar;

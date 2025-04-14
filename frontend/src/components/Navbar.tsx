import { useState } from "react";
import { useResponsive } from "../contexts/ResponsiveContext";
import Logo from "../assets/shared/desktop/logo.svg";
import Cart from "../assets/shared/desktop/icon-cart.svg";
import NavMenu from "../assets/shared/tablet/icon-hamburger.svg";
import NavLinks from "./NavLinks";
import { useNavigate } from "react-router";

// TODO: Hamburger menu dropdown

const Navbar = () => {
    const navigate = useNavigate();
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-transparent w-full h-[89px] md:h-[96px] flex items-center justify-between border-b-1 border-white/20">
            {isMobile ? (
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
                    <Cart />
                </>
            ) : (
                <></>
            )}
            {isTablet ? (
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
                    <Cart />
                </>
            ) : (
                <></>
            )}
            {isDesktop ? (
                <>
                    <div
                        className="hover:cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <Logo />
                    </div>
                    <NavLinks />
                    <Cart />
                </>
            ) : (
                <></>
            )}
        </nav>
    );
};

export default Navbar;

import { NavLink } from "react-router";

const NavLinks = () => {
    return (
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
    );
};

export default NavLinks;

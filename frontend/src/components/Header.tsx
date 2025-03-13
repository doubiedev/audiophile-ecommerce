import { useLocation } from "react-router";
import Navbar from "./Navbar";
import Hero from "./Hero";

const Header = () => {
    const location = useLocation()

    return (
        <header>
            <Navbar />
            {location.pathname === "/" ? <Hero /> : <></>}
        </header>
    )
}

export default Header;

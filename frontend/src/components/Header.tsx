import { useLocation } from "react-router";
import Navbar from "./Navbar";
import Hero from "./Hero";

const Header = () => {
    const location = useLocation()

    return (
        <>
            <Navbar />
            {location.pathname === "/" ? <Hero /> : <></>}
        </>
    )
}

export default Header;

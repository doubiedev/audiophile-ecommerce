import { useLocation } from "react-router";
import Navbar from "./Navbar";
import Hero from "./Hero";

const Header = () => {
    const location = useLocation();

    // TODO: Add New Product section to hero
    // INFO: Different images for mobile/tablet/desktop

    return (
        <header className="h-[600px] sm:h-[729px]">
            {location.pathname === "/" ? (
                <div className="absolute top-0 left-0 w-full z-10 bg-transparent">
                    <Navbar />
                </div>
            ) : (
                <div className="bg-black w-full">
                    <Navbar />
                </div>
            )}
            <Hero />
        </header>
    );
};

export default Header;

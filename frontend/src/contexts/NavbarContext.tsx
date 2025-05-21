import { useContext, createContext, useState } from "react";

type NavbarContextType = {
    isCartMenuOpen: boolean;
};

type NavbarUpdateContextType = {
    toggleCartMenu: () => void;
};

const NavbarContext = createContext<NavbarContextType | null>(null);
const NavbarUpdateContext = createContext<NavbarUpdateContextType | null>(null);

export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error("useNavbar must be used within a NavbarProvider");
    }
    return context;
};

export const useNavbarUpdate = () => {
    const context = useContext(NavbarUpdateContext);
    if (!context) {
        throw new Error("useNavbarUpdate must be used within a NavbarProvider");
    }
    return context;
};

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);

    const toggleCartMenu = () => {
        setIsCartMenuOpen(!isCartMenuOpen);
    };

    return (
        <NavbarContext.Provider value={{ isCartMenuOpen }}>
            <NavbarUpdateContext.Provider value={{ toggleCartMenu }}>
                {children}
            </NavbarUpdateContext.Provider>
        </NavbarContext.Provider>
    );
};

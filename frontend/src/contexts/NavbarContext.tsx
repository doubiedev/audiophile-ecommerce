import { useContext, createContext, useState } from "react";

type NavbarContextType = {
    isCartOpen: boolean;
};

type NavbarUpdateContextType = {
    toggleCart: () => void;
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
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <NavbarContext.Provider value={{ isCartOpen }}>
            <NavbarUpdateContext.Provider value={{ toggleCart }}>
                {children}
            </NavbarUpdateContext.Provider>
        </NavbarContext.Provider>
    );
};

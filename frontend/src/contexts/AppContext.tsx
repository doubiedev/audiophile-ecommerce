import { useContext, createContext, useState } from "react";

type AppContextType = {
    isCartOpen: boolean;
};

type AppUpdateContextType = {
    toggleCart: () => void;
};

const AppContext = createContext<AppContextType | null>(null);
const AppUpdateContext = createContext<AppUpdateContextType | null>(null);

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};

export const useAppUpdate = () => {
    const context = useContext(AppUpdateContext);
    if (!context) {
        throw new Error("useAppUpdate must be used within an AppProvider");
    }
    return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <AppContext.Provider value={{ isCartOpen }}>
            <AppUpdateContext.Provider value={{ toggleCart }}>
                {children}
            </AppUpdateContext.Provider>
        </AppContext.Provider>
    );
};

import { useContext, createContext } from "react";
import { useMediaQuery } from "react-responsive";

interface ResponsiveContextProps {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

const ResponsiveContext = createContext<ResponsiveContextProps | null>(null);

export const useResponsive = () => {
    const context = useContext(ResponsiveContext);
    if (!context) {
        throw new Error(
            "useResponsive must be used within a ResponsiveProvider",
        );
    }
    return context;
};

export const ResponsiveProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const isMobile = useMediaQuery({ maxWidth: 639 });
    const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    return (
        <ResponsiveContext.Provider value={{ isMobile, isTablet, isDesktop }}>
            {children}
        </ResponsiveContext.Provider>
    );
};

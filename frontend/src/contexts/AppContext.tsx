import { useContext, createContext, useState } from "react";

const AppContext = createContext<boolean | null>(null);
const AppUpdateContext = createContext<(() => void) | null>(null);

export const useApp = () => {
    return useContext(AppContext);
};

export const useAppUpdate = () => {
    return useContext(AppUpdateContext);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [test, setTest] = useState<boolean>(true);

    const toggleTest = () => {
        setTest((prevTest) => !prevTest);
    };

    return (
        <AppContext.Provider value={test}>
            <AppUpdateContext.Provider value={toggleTest}>
                {children}
            </AppUpdateContext.Provider>
        </AppContext.Provider>
    );
};


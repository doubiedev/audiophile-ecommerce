import { useContext, createContext, useState } from "react";

const AppContext = createContext(null);
const AppUpdateContext = createContext(null);

export const useApp = () => {
    return useContext(AppContext);
};

export const useAppUpdate = () => {
    return useContext(AppUpdateContext);
};

export const AppProvider = ({ children }) => {
    const [test, setTest] = useState(true);

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


import { useContext, createContext, useMemo } from "react";
import rawCart from "../cart.json";
import rawData from "../data.json";

type CartItem = {
    id: number;
    quantity: number;
};

export type Product = {
    id: number;
    category: string;
    isNewProduct: boolean;
    name: string;
    description: string;
    price: number;
    features: string;
    inTheBox: { quantity: number; item: string }[];
    recommended: number[];
    url: string;
    image: {
        mobile: string;
        tablet: string;
        desktop: string;
        showcases: string[];
    };
};

type CartProduct = Product & {
    quantity: number;
    imageSrc: string;
};

type AppContextType = {
    cart: CartItem[];
    cartItems: CartProduct[];
    images: Record<string, string>;
    total: number;
    data: Product[];
};

type AppUpdateContextType = {}; // Extend when needed (e.g. add/remove item)

const AppContext = createContext<AppContextType | null>(null);
const AppUpdateContext = createContext<AppUpdateContextType | null>(null);

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within a AppProvider");
    }
    return context;
};

export const useAppUpdate = () => {
    const context = useContext(AppUpdateContext);
    if (!context) {
        throw new Error("useAppUpdate must be used within a AppProvider");
    }
    return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const cart = rawCart as CartItem[];
    // BUG: Type conversion error?
    const data = rawData as Product[];

    const images = useMemo(
        () =>
            import.meta.glob("../assets/**/*.{jpg,png,jpeg,webp,svg}", {
                eager: true,
                import: "default",
            }) as Record<string, string>,
        [],
    );

    const cartItems: CartProduct[] = cart
        .map((cartItem) => {
            const product = data.find((item) => item.id === cartItem.id);
            if (!product) return null;

            // Normalize the path (strip "./" and make relative to the import.meta.glob root)
            const imagePath = `../assets/${product.image.desktop.replace("./assets/", "")}`;
            const imageSrc = images[imagePath];

            return {
                ...product,
                quantity: cartItem.quantity,
                imageSrc,
            };
        })
        .filter((item): item is CartProduct => item !== null);

    const total = cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    return (
        <AppContext.Provider value={{ cart, cartItems, data, images, total }}>
            <AppUpdateContext.Provider value={{}}>
                {children}
            </AppUpdateContext.Provider>
        </AppContext.Provider>
    );
};

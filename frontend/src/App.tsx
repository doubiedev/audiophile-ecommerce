import { Routes, Route } from "react-router";
import { ResponsiveProvider } from "./contexts/ResponsiveContext";
import HomeScreen from "./screens/HomeScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
    return (
        <>
            <ResponsiveProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/headphones" element={<CategoriesScreen />} />
                    <Route path="/speakers" element={<CategoriesScreen />} />
                    <Route path="/earphones" element={<CategoriesScreen />} />
                    <Route path="/cart" element={<CartScreen />} />
                    <Route path="/products/:id" element={<ProductScreen />} />
                </Routes>
                <Footer />
            </ResponsiveProvider>
        </>
    );
};

export default App;

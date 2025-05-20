import { Routes, Route } from "react-router";
import { ResponsiveProvider } from "./contexts/ResponsiveContext";
import { NavbarProvider } from "./contexts/NavbarContext";
import HomeScreen from "./screens/HomeScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import ProductScreen from "./screens/ProductScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartBackground from "./components/CartBackground";
import CheckoutScreen from "./screens/CheckoutScreen";

const App = () => {
    return (
        <ResponsiveProvider>
            <NavbarProvider>
                <CartBackground />
                <Header />
            </NavbarProvider>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/headphones" element={<CategoriesScreen />} />
                <Route path="/speakers" element={<CategoriesScreen />} />
                <Route path="/earphones" element={<CategoriesScreen />} />
                <Route path="/products/:id" element={<ProductScreen />} />
                <Route path="/checkout" element={<CheckoutScreen />} />
            </Routes>
            <Footer />
        </ResponsiveProvider>
    );
};

export default App;

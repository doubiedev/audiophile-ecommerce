import { Routes, Route } from "react-router";
import { ResponsiveProvider } from "./contexts/ResponsiveContext";
import { AppProvider } from "./contexts/AppContext";
import HomeScreen from "./screens/HomeScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import ProductScreen from "./screens/ProductScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartBackground from "./components/CartBackground";

const App = () => {
    return (
        <AppProvider>
            <ResponsiveProvider>
                <CartBackground />
                <Header />
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/headphones" element={<CategoriesScreen />} />
                    <Route path="/speakers" element={<CategoriesScreen />} />
                    <Route path="/earphones" element={<CategoriesScreen />} />
                    <Route path="/products/:id" element={<ProductScreen />} />
                </Routes>
                <Footer />
            </ResponsiveProvider>
        </AppProvider>
    );
};

export default App;

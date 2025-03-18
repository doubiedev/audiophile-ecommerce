import { Routes, Route } from "react-router";
import { ResponsiveProvider } from "./contexts/ResponsiveContext";
import HomeScreen from "./screens/HomeScreen";
import HeadphonesScreen from "./screens/HeadphonesScreen";
import SpeakersScreen from "./screens/SpeakersScreen";
import EarphonesScreen from "./screens/EarphonesScreen";
import CartScreen from "./screens/CartScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
    return (
        <>
            <ResponsiveProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/headphones" element={<HeadphonesScreen />} />
                    <Route path="/speakers" element={<SpeakersScreen />} />
                    <Route path="/earphones" element={<EarphonesScreen />} />
                    <Route path="/cart" element={<CartScreen />} />
                </Routes>
                <Footer />
            </ResponsiveProvider>
        </>
    );
};

export default App;

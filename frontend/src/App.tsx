import { Routes, Route } from 'react-router';
import HomeScreen from "./screens/HomeScreen";
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomeScreen />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App;

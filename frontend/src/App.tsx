import Header from "./components/Header";
import Footer from "./components/Footer";
import BtnOrange from "./components/BtnOrange";
import BtnWhite from "./components/BtnWhite";
import BtnShop from "./components/BtnShop";

const App = () => {
    return (
        <>
            <Header />
            <BtnOrange />
            <BtnWhite />
            <BtnShop />
            <h1>This is a h1</h1>
            <h2>This is a h2</h2>
            <h3>This is a h3</h3>
            <h4>This is a h4</h4>
            <h5>This is a h5</h5>
            <h6>This is a h6</h6>
            <p>This is the body</p>
            <p className="p-overline">This is an overline</p>
            <p className="p-subtitle">This is a subtitle</p>
            <Footer />
        </>
    )
};

export default App;

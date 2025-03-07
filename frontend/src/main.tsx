import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomeScreen from "./screens/HomeScreen.tsx";
import HeadphonesCategoryScreen from './screens/HeadphonesCategoryScreen.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<HomeScreen />} />
                <Route path="/categories/headphones" element={<HeadphonesCategoryScreen />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)

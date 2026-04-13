import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// import CartSidebar from "./components/CartSidebar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/Footer";
import Catalog from "./pages/Catalog";
import CategoryPage from "./pages/Category";
import Home from "./pages/Home";

import getTheme from "./theme/theme";

import { CartProvider } from "./context/CartContext";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);


  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <BrowserRouter>
        <CssBaseline />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}
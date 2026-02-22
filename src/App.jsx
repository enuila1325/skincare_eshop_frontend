import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Footer from "./components/Footer";
import getTheme from "./theme/theme";


export default function App() {
  const [darkMode, setDarkMode] = useState(false);


  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <CssBaseline />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Container>
        <Home />
        <Catalog />
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
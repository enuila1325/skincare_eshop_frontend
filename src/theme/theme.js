import { createTheme } from "@mui/material/styles";


const getTheme = (darkMode) =>
    createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: { main: "#c48b9f" },
            secondary: { main: "#f48fb1" },
        },
        typography: {
            fontFamily: "'Inter', sans-serif",
        },
    });

export default getTheme;
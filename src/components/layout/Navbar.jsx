import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import { useCart } from "../../context/CartContext";


export default function Navbar({ darkMode, setDarkMode }) {
    const [open, setOpen] = useState(false);
    const { cart } = useCart();


    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        SkinLove
                    </Typography>
                    <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
                        <DarkModeIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={() => setOpen(true)}>
                        <Badge badgeContent={cart.length} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <CartDrawer open={open} onClose={() => setOpen(false)} />
        </>
    );
}
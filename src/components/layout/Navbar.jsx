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
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: "#1f1f1f",   // gris negro fijo
                    borderBottom: "1px solid #2a2a2a",
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 600,
                            letterSpacing: 1,
                        }}
                    >
                        SkinLove
                    </Typography>

                    {/* Dark Mode Toggle */}
                    <IconButton
                        sx={{ color: "#fff" }}
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        <DarkModeIcon />
                    </IconButton>

                    {/* Cart */}
                    <IconButton
                        sx={{ color: "#fff" }}
                        onClick={() => setOpen(true)}
                    >
                        <Badge
                            badgeContent={cart.length}
                            sx={{
                                "& .MuiBadge-badge": {
                                    backgroundColor: "#c48b9f", // rosado marca
                                    color: "#fff",
                                },
                            }}
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <CartDrawer open={open} onClose={() => setOpen(false)} />
        </>
    );
}
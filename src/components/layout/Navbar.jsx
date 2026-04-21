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
                    backgroundColor: "#ffffff",   // gris negro fijo
                    borderBottom: "1px solid #2a2a2a",
                }}
            >
                <Toolbar sx={{ display: "flex", alignItems: "center" }}>
                    {/* Left - Logo text */}
                    <Typography
                        variant="h6"
                        sx={{
                            flex: 1,
                            fontWeight: 600,
                            letterSpacing: 1,
                            color: "#c48b9f"
                        }}
                    >
                        SkinLove
                    </Typography>

                    {/* Center - Image */}
                    <img
                        src="https://res.cloudinary.com/dlqwiqhsa/image/upload/v1776735571/LOGO_SKINLOVE_PNG_r0vwhp.png"
                        alt="Banner Principal"
                        style={{
                            height: "10vh",
                            borderRadius: "10px",
                            objectFit: "cover"
                        }}
                    />

                    {/* Right - Actions */}
                    <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                        <IconButton
                            sx={{ color: "#000000" }}
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            <DarkModeIcon />
                        </IconButton>

                        <IconButton
                            sx={{ color: "#000000" }}
                            onClick={() => setOpen(true)}
                        >
                            <Badge
                                badgeContent={cart.length}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: "#c48b9f",
                                        color: "#fff",
                                    },
                                }}
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

            <CartDrawer open={open} onClose={() => setOpen(false)} />
        </>
    );
}
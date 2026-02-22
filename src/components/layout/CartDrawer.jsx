import {
    Drawer,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Divider
} from "@mui/material";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import CheckoutModal from "../CheckoutModal";

export default function CartDrawer({ open, onClose }) {
    const { cart, removeFromCart } = useCart();
    const [openCheckout, setOpenCheckout] = useState(false);

    const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

    return (
        <>
            <Drawer anchor="right" open={open} onClose={onClose}>
                <Box sx={{ width: 350, p: 2 }}>
                    <Typography variant="h6">Carrito</Typography>

                    <List>
                        {cart.map((item) => (
                            <ListItem
                                key={item._id}
                                secondaryAction={
                                    <Button
                                        color="error"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        Eliminar
                                    </Button>
                                }
                            >
                                <ListItemText
                                    primary={`${item.name} x${item.quantity}`}
                                    secondary={`L. ${item.price}`}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Divider />
                    <Typography sx={{ mt: 2 }}>Total: L. {total}</Typography>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                        disabled={cart.length === 0}
                        onClick={() => setOpenCheckout(true)}
                    >
                        Reservar productos
                    </Button>
                </Box>
            </Drawer>

            <CheckoutModal
                open={openCheckout}
                onClose={() => setOpenCheckout(false)}
            />
        </>
    );
}

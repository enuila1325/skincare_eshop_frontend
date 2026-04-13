import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const qty = product.quantity ?? 1;

        setCart((prev) => {
            const existing = prev.find(
                (item) => item._id === product._id && item.variantIndex === product.variantIndex
            );
            if (existing) {
                return prev.map((item) =>
                    item._id === product._id && item.variantIndex === product.variantIndex
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            return [...prev, { ...product, quantity: qty }];
        });
    };

    const removeFromCart = (id, variantIndex) => {
        setCart((prev) => prev.filter((i) => !(i._id === id && i.variantIndex === variantIndex)));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
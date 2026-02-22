import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useCart } from "../context/CartContext";


export default function ProductCard({ product }) {
    const { addToCart } = useCart();


    return (
        <Card>
            <CardMedia component="img" height="200" image={product.image} />
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography sx={{ mt: 1 }}>L. {product.price}</Typography>
                <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => addToCart(product)}>
                    Agregar al carrito
                </Button>
            </CardContent>
        </Card>
    );
}
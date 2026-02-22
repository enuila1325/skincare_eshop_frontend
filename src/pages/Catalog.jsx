import {
    Typography,
    Select,
    MenuItem,
    Box,
    TextField,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/appService";
import ProductCard from "../components/ProductCard";
import Slider from "react-slick";
import { PrevArrow, NextArrow } from "../components/ui/CarrouselArrows";


export default function Catalog() {
    const [allProducts, setAllProducts] = useState([]);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProducts()
            .then(setAllProducts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const products = allProducts.filter(
        (p) =>
            (category === "All" || p.category === category) &&
            p.name.toLowerCase().includes(search.toLowerCase())
    );

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 900, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
    };

    if (loading) return <Typography>Cargando catálogo...</Typography>;

    return (
        <Box sx={{ my: 6 }}>
            <Typography variant="h4" gutterBottom>
                Catálogo
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <MenuItem value="All">Todas</MenuItem>
                    <MenuItem value="Skincare">Skincare</MenuItem>
                    <MenuItem value="Maquillaje">Maquillaje</MenuItem>
                    <MenuItem value="Cabello">Cabello</MenuItem>
                    <MenuItem value="Perfumería">Perfumería</MenuItem>
                    <MenuItem value="Accesorios">Accesorios</MenuItem>
                </Select>

                <TextField
                    placeholder="Buscar producto"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Slider {...settings}>
                {products.map((product) => (
                    <Box key={product._id} sx={{ px: 1 }}>
                        <ProductCard product={product} />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}
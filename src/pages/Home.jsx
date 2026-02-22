import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../services/appService";
import ProductCard from "../components/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow, NextArrow } from "../components/ui/CarrouselArrows";


export default function Home() {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFeaturedProducts()
            .then(setFeatured)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const settings = {
        dots: true,
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

    if (loading) return <Typography>Cargando productos...</Typography>;

    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>
                Productos Destacados
            </Typography>

            <Slider {...settings}>
                {featured.map((product) => (
                    <Box key={product._id} sx={{ px: 1 }}>
                        <ProductCard product={product} />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}
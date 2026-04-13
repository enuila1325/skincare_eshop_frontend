import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getProductsByCategory, getSubcategoriesByCategory } from "../services/appService";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

import {
  Button,
  Typography,
  TextField,
  MenuItem
} from "@mui/material";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSub, setSelectedSub] = useState("all");
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getProductsByCategory(categoryId),
      getSubcategoriesByCategory(categoryId),
    ])
      .then(([prods, subs]) => {
        setProducts(prods);
        setSubcategories(subs);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [categoryId]);

  const filtered = products.filter((p) => {
    const matchesName = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchesSub =
      selectedSub === "all" ||
      String(p.subcategory?._id) === String(selectedSub);
    return matchesName && matchesSub;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button onClick={() => navigate("/")} sx={{height: "8vh", ml: "2vw"}} >
          &larr; Volver
        </Button>

        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", ml: "2vw" }}>
           {state?.categoryName ?? "Productos"}
        </Typography>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-8">
        <TextField
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ml:"2vw", mt: "1vh"}}
        />

        <TextField
          select
          value={selectedSub}
          onChange={(e) => setSelectedSub(e.target.value)}
          sx={{ml:"2vw", mt: "1vh", width: "20vw"}}
        >
          <MenuItem value="all">Todas</MenuItem>
          {subcategories.map((sub) => (
            <MenuItem key={sub._id} value={sub._id}>
              {sub.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <br/>
      {/* GRID */}
      {loading ? (
        <p className="text-center py-20">Cargando...</p>
      ) : (
        <div style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}>
          {filtered.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onClick={() => {
                setSelectedProduct(product);
                setOpenModal(true);
              }}
            />
          ))}
        </div>
      )}

      {/* MODAL */}
      <ProductModal
        product={selectedProduct}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </main>
  );
}
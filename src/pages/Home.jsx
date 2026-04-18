import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/appService";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p style={{ color: "#6b7280", fontSize: "18px" }}>Cargando categorías...</p>
      </div>
    );
  }

  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 16px" }}>
      <h1 style={{ textAlign: "center", fontSize: "28px", fontWeight: "700", color: "#1f2937", marginBottom: "8px" }}>
        Nuestras Categorías
      </h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "40px" }}>
        Selecciona una categoría para explorar los productos
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(20vw, 1fr))",
        gap: "20px",
      }}>
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => navigate(`/category/${category._id}`, { state: { categoryName: category.name } })}
            style={{
              cursor: "pointer",
              background: "white",
              borderRadius: "16px",
              border: "2px solid #e5e7eb",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "box-shadow 0.2s, border-color 0.2s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#f472b6";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)";
            }}
          >
            {/* Image */}
            {category.image ? (
              <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
                <img
                  src={category.image}
                  alt={category.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ) : (
              <div style={{
                width: "100%",
                aspectRatio: "1/1",
                background: "#fce7f3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ fontSize: "40px", fontWeight: "700", color: "#ec4899" }}>
                  {category.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            {/* Name */}
            <div style={{ padding: "12px 8px", textAlign: "center" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>
                {category.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
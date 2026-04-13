export default function ProductCard({ product, onClick }) {
  const firstImage = product.images?.[0] || product.image;
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
        <img
          src={firstImage}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div style={{ padding: "12px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 4px" }}>
          {product.name}
        </h3>
        <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 4px" }}>
          {product.description}
        </p>
        <p style={{ color: "#ec4899", fontWeight: "700", margin: 0 }}>
          L. {product.price}
        </p>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";

export default function ProductModal({ product, open, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
  }, [product]);

  if (!open || !product) return null;

  const images = product.images?.length ? product.images : [product.image];

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "30vw",
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          ✕
        </button>

        {/* Main image */}
        <div style={{ height: "40vh", overflow: "hidden", borderRadius: "8px" }}>
          <img
            src={images[selectedImage]}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        {/* Thumbnail selector — only shows if more than 1 image */}
        {images.length > 1 && (
          <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
            {images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`variedad ${index + 1}`}
                onClick={() => setSelectedImage(index)}
                style={{
                  width: "56px",
                  height: "56px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: selectedImage === index
                    ? "2px solid #e91e63"
                    : "2px solid transparent",
                  opacity: selectedImage === index ? 1 : 0.6,
                }}
              />
            ))}
          </div>
        )}

        <h2 style={{ margin: "12px 0 4px" }}>{product.name}</h2>
        <p style={{ margin: "0 0 8px", color: "#6b7280", fontSize: "14px" }}>
          {product.description}
        </p>
        <p style={{ color: "#e91e63", fontWeight: "bold", margin: "0 0 12px" }}>
          L. {product.price}
        </p>

        {/* Quantity */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <button
          onClick={() => {
            addToCart({
              ...product,
              quantity,
              selectedImage: images[selectedImage],  // which variety was picked
              variantIndex: selectedImage,
            });
            onClose();
          }}
          style={{
            width: "100%",
            background: "#e91e63",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>,
    document.body
  );
}
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";

export default function ProductModal({ product, open, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWide, setIsWide] = useState(window.innerWidth >= 640);

  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
  }, [product]);

  useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth >= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        alignItems: "center", //isWide ? "center" : "flex-end", // ← slides up from bottom on mobile
        zIndex: 9999,
      }}
      onClick={onClose} // ← tap backdrop to close
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: isWide ? "16px" : "16px 16px", // ← bottom sheet on mobile
          width: "85%",
          height: isWide ? "50%" : "auto",
          maxWidth: isWide ? "700px" : "100%",
          maxHeight: isWide ? "85vh" : "92vh",
          overflowY: "auto",
          position: "relative",
          display: "flex",
          flexDirection: isWide ? "row" : "column", // ← side-by-side on tablet+
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12, right: 12,
            zIndex: 10,
            background: "rgba(0,0,0,0.15)",
            border: "none",
            borderRadius: "50%",
            width: 28, height: 28,
            cursor: "pointer",
            fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white",
          }}
        >
          ✕
        </button>

        {/* ── LEFT / TOP: image block ── */}
        <div
          style={{
            width: isWide ? "45%" : "100%",
            flexShrink: 0,
            background: "#f3f4f6",
            borderRadius: isWide ? "16px 0 0 16px" : "16px 16px 0 0",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Main image */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              src={images[selectedImage]}
              alt={product.name}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: isWide ? "380px" : "260px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div style={{ display: "flex", gap: 8, padding: "10px 12px", flexWrap: "wrap", justifyContent: "center" }}>
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`variedad ${index + 1}`}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: 48, height: 48,
                    objectFit: "cover",
                    borderRadius: 6,
                    cursor: "pointer",
                    border: selectedImage === index ? "2px solid #e91e63" : "2px solid transparent",
                    opacity: selectedImage === index ? 1 : 0.55,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT / BOTTOM: details block ── */}
        <div style={{ padding: "20px 20px 24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ margin: "0 0 6px", fontSize: isWide ? 20 : 18 }}>{product.name}</h2>
            <p style={{ margin: "0 0 10px", color: "#6b7280", fontSize: 14, lineHeight: 1.5 }}>
              {product.description}
            </p>
            <p style={{ color: "#e91e63", fontWeight: "bold", margin: "0 0 16px", fontSize: 18 }}>
              L. {product.price}
            </p>
          </div>

          {/* Quantity */}
          <div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid #e5e7eb", background: "white",
                  fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >−</button>
              <span style={{ fontSize: 16, fontWeight: 500, minWidth: 20, textAlign: "center" }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid #e5e7eb", background: "white",
                  fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >+</button>
            </div>

            <button
              onClick={() => {
                addToCart({
                  ...product,
                  quantity,
                  selectedImage: images[selectedImage],
                  variantIndex: selectedImage,
                });
                onClose();
              }}
              style={{
                width: "100%",
                background: "#e91e63",
                color: "white",
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
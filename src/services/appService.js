const BASE_URL_PRODUCTS = "https://skincare-minimalistic-backend.onrender.com/api/products";
const BASE_URL_ORDERS = "https://skincare-minimalistic-backend.onrender.com/api/orders";

export async function getAllProducts() {
    const res = await fetch(BASE_URL_PRODUCTS);
    if (!res.ok) throw new Error("Error al obtener productos");
    return res.json();
}

export async function getFeaturedProducts() {
    const res = await fetch(`${BASE_URL_PRODUCTS}?featured=true`);
    if (!res.ok) throw new Error("Error al obtener destacados");
    return res.json();
}

export async function createOrder(data) {
    const res = await fetch(BASE_URL_ORDERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al crear orden");
    return res.json();
}

export async function uploadProof(orderId, file) {
    const formData = new FormData();
    formData.append("proof", file); 
    const res = await fetch(`${BASE_URL_ORDERS}/${orderId}/proof`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) throw new Error("Error al subir comprobante");
    return res.json();
}
const BASE_URL = "https://skincare-minimalistic-backend.onrender.com/api";


export async function getAllProducts() {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error("Error al obtener productos");
    return res.json();
}

export async function getFeaturedProducts() {
    const res = await fetch(`${BASE_URL}/products?featured=true`);
    if (!res.ok) throw new Error("Error al obtener destacados");
    return res.json();
}

export async function createOrder(data) {
    const res = await fetch(`${BASE_URL}/orders`, {
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
    const res = await fetch(`${BASE_URL}/orders/${orderId}/proof`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) throw new Error("Error al subir comprobante");
    return res.json();
}

export async function getCategories() {
    const res = await fetch(`${BASE_URL}/categories/`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}

// ── Products filtered by category ───────────────────────────
export async function getProductsByCategory(categoryId) {
    const res = await fetch(`${BASE_URL}/products/?category=${categoryId}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}

// ── Subcategories for a given category ──────────────────────
export async function getSubcategoriesByCategory(categoryId) {
    const res = await fetch(`${BASE_URL}/subcategories/?categoryId=${categoryId}`);
    if (!res.ok) throw new Error("Failed to fetch subcategories");
    return res.json();
}
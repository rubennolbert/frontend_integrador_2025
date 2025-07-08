const API_URL = "http://localhost:3000";

export async function obtenerProductos() {
  const response = await fetch(`${API_URL}/api/products`);
  return await response.json();
}

export async function enviarVenta(venta) {
  await fetch(`${API_URL}/api/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(venta)
  });
}

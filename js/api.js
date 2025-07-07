const API_URL = "http://localhost:3000/api/products";

async function obtenerProductos() {
  const res = await fetch(API_URL);
  return await res.json();
}

async function enviarVenta(venta) {
  await fetch("http://localhost:3000/api/sales", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(venta)
  });
}

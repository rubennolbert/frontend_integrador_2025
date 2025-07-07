
document.addEventListener("DOMContentLoaded", async () => {

  document.getElementById("nombreClienteNav").textContent = localStorage.getItem("nombreCliente");

  const productosDiv = document.getElementById("productos");
  const productos = await obtenerProductos();

  function renderProductos(categoria) {
    productosDiv.innerHTML = "";
    const filtrados = productos.filter(p => p.categoria === categoria && p.activo);
    filtrados.forEach(prod => {
      const card = document.createElement("div");
      card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio}</p>
        <button data-id="${prod.id}">Agregar</button>
      `;
      productosDiv.appendChild(card);
    });
  }

  document.querySelectorAll("#categorias button").forEach(btn => {
    btn.addEventListener("click", () => renderProductos(btn.dataset.cat));
  });

  productosDiv.addEventListener("click", e => {
    
    if(e.target.tagName === "BUTTON") {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const id = parseInt(e.target.dataset.id);
      const producto = productos.find(p => p.id === id);
      const existente = carrito.find(p => p.id === id);
      if(existente) existente.cantidad++;
      else carrito.push({ ...producto, cantidad: 1 });
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  });

  // Tema
  document.getElementById("switchTema").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("tema", document.body.classList.contains("dark") ? "dark" : "light");
  });

  // Tema persistente
  if(localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark");
  }
});

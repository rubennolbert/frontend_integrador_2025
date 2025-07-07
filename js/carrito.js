document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const lista = document.getElementById("listaCarrito");
  const total = document.getElementById("totalCarrito");

  function renderCarrito() {
    lista.innerHTML = "";
    let suma = 0;
    carrito.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h4>${item.nombre}</h4>
        <p>$${item.precio} x ${item.cantidad}</p>
        <button data-id="${item.id}" class="sumar">+</button>
        <button data-id="${item.id}" class="restar">-</button>
        <button data-id="${item.id}" class="eliminar">Eliminar</button>
      `;
      lista.appendChild(div);
      suma += item.precio * item.cantidad;
    });

    total.textContent = `Total: $${suma}`;
  }

  lista.addEventListener("click", e => {
    const id = parseInt(e.target.dataset.id);
    if(e.target.classList.contains("sumar")) {
      carrito.find(p => p.id === id).cantidad++;
    } else if(e.target.classList.contains("restar")) {
      const prod = carrito.find(p => p.id === id);
      if(prod.cantidad > 1) prod.cantidad--;
    } else if(e.target.classList.contains("eliminar")) {
      carrito = carrito.filter(p => p.id !== id);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();

  });

  document.getElementById("confirmarCompra").addEventListener("click", async () => {
    await enviarVenta({
      cliente: localStorage.getItem("nombreCliente"),
      carrito
    });
    localStorage.removeItem("carrito");
    window.location.href = "bienvenida.html";
  });

  renderCarrito();
  
});

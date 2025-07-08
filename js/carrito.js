import { enviarVenta } from './api.js';

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const cliente = localStorage.getItem('cliente') || "Invitado";

function renderCarrito() {
  const contenedor = document.getElementById('listaCarrito');
  contenedor.innerHTML = "";
  carrito.forEach((item, idx) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h4>${item.nombre}</h4>
      <p>Precio: $${item.precio}</p>
      <p>Cantidad: ${item.cantidad}</p>
      <button>Eliminar</button>
    `;
    div.querySelector('button').addEventListener('click', () => eliminarProducto(idx));
    contenedor.appendChild(div);
  });
  calcularTotal();
}

function eliminarProducto(idx) {
  carrito.splice(idx, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderCarrito();
}

function calcularTotal() {
  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  document.getElementById('totalCarrito').innerText = `Total: $${total}`;
}

document.getElementById('confirmarCompra').addEventListener('click', async () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  await enviarVenta({ cliente, carrito });
  alert("Compra realizada con éxito");
  localStorage.removeItem('carrito');
  window.location.href = "bienvenida.html";
});

document.addEventListener('DOMContentLoaded', renderCarrito);

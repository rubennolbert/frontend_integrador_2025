import { obtenerProductos } from './api.js';

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productos = [];

document.getElementById('switchTema').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

document.getElementById('filtro').addEventListener('input', e => {
  mostrarProductos(
    productos.filter(p =>
      p.nombre.toLowerCase().includes(e.target.value.toLowerCase())
    )
  );
});

function filtrarCategoria(cat) {
  if (cat === 'Todos') {
    mostrarProductos(productos);
  } else {
    mostrarProductos(productos.filter(p => p.categoria === cat));
  }
}

function agregarAlCarrito(producto) {
  const encontrado = carrito.find(p => p.id === producto.id);
  if (encontrado) {
    encontrado.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert("Producto agregado al carrito");
}

function mostrarProductos(lista) {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = "";
  lista.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `
      <img src="http://localhost:3000${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button>Agregar al carrito</button>
    `;
    div.querySelector('button').addEventListener('click', () => agregarAlCarrito(p));
    contenedor.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  productos = await obtenerProductos();
  mostrarProductos(productos);
});

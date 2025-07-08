function guardarNombre() {
  const nombre = document.getElementById('nombreCliente').value.trim();
  if (nombre) {
    localStorage.setItem('cliente', nombre);
    window.location.href = "index.html";
  } else {
    alert("Por favor ingresá tu nombre");
  }
}

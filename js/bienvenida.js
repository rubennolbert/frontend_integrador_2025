document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("continuarBtn");

  btn.addEventListener("click", () => {

    const nombre = document.getElementById("nombreCliente").value.trim();

    if (nombre.length > 0) {
      localStorage.setItem("nombreCliente", nombre);
      window.location.href = "index.html";
    } else {
      alert("Por favor, ingresa tu nombre para continuar.");
    }
    
  });

});

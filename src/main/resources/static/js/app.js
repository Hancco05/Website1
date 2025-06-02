document.getElementById("formulario-registro").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmar = document.getElementById("confirmar").value;
  const mensaje = document.getElementById("mensaje");

  if (password !== confirmar) {
    mensaje.textContent = "Las contraseñas no coinciden.";
    mensaje.style.color = "red";
    return;
  }

  if (password.length < 6) {
    mensaje.textContent = "La contraseña debe tener al menos 6 caracteres.";
    mensaje.style.color = "red";
    return;
  }

  // Si todo es válido
  mensaje.textContent = "Registro exitoso.";
  mensaje.style.color = "green";

  // Aquí luego podríamos enviar los datos al servidor Java (con Maven)
});

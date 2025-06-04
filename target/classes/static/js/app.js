// URLs del backend
const BASE_URL = 'http://localhost:8081/api';

// Elementos HTML
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Manejar Login
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('loginUsuario').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!usuario || !password) {
      alert('Por favor ingresa usuario y contraseña');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password }),
      });

      const user = await res.json();

      if (user && user.usuario) {
        // Guardar usuario en localStorage
        localStorage.setItem('usuarioLogeado', JSON.stringify(user));
        // Redirigir a main.html
        window.location.href = 'main.html';
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      alert('Error en la conexión al servidor');
      console.error(error);
    }
  });
}

// Manejar Registro
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('regNombre').value.trim();
    const edad = parseInt(document.getElementById('regEdad').value.trim());
    const estadoCivil = document.getElementById('regEstadoCivil').value.trim();
    const usuario = document.getElementById('regUsuario').value.trim();
    const password = document.getElementById('regPassword').value.trim();

    if (!nombre || !edad || !estadoCivil || !usuario || !password) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, edad, estadoCivil, usuario, password }),
      });

      const msg = await res.text();

      alert(msg);

      if (msg === 'Registro exitoso') {
        // Volver a login
        window.location.href = 'login.html';
      }
    } catch (error) {
      alert('Error en la conexión al servidor');
      console.error(error);
    }
  });
}

// En main.html mostrar datos del usuario logueado
if (window.location.pathname.endsWith('main.html')) {
  const usuarioData = localStorage.getItem('usuarioLogeado');
  if (!usuarioData) {
    alert('No estás logueado');
    window.location.href = 'login.html';
  } else {
    const user = JSON.parse(usuarioData);
    document.getElementById('bienvenida').textContent = `¡Bienvenido, ${user.nombre}!`;
    document.getElementById('datosUsuario').innerHTML = `
      <p><b>Nombre:</b> ${user.nombre}</p>
      <p><b>Edad:</b> ${user.edad}</p>
      <p><b>Estado Civil:</b> ${user.estadoCivil}</p>
      <p><b>Usuario:</b> ${user.usuario}</p>
    `;
  }
}

// Opción para cerrar sesión en main.html
function cerrarSesion() {
  localStorage.removeItem('usuarioLogeado');
  window.location.href = 'login.html';
}

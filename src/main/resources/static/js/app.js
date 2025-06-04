const BASE_URL = 'http://localhost:8081/api';

// Utilidad para mostrar alertas simples
const showAlert = (message) => alert(message);

// Obtener datos de un campo de texto
const getValue = (id) => document.getElementById(id)?.value.trim() || '';

// ------------------ LOGIN ------------------
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = getValue('loginUsuario');
    const password = getValue('loginPassword');

    if (!usuario || !password) {
      showAlert('Por favor ingresa usuario y contraseña');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password }),
      });

      if (!res.ok) throw new Error('Respuesta inválida del servidor');

      const user = await res.json();

      if (user?.usuario) {
        localStorage.setItem('usuarioLogeado', JSON.stringify(user));
        window.location.href = 'main.html';
      } else {
        showAlert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Login error:', error);
      showAlert('Error en la conexión al servidor');
    }
  });
}

// ------------------ REGISTRO ------------------
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = getValue('regNombre');
    const edad = parseInt(getValue('regEdad'), 10);
    const estadoCivil = getValue('regEstadoCivil');
    const usuario = getValue('regUsuario');
    const password = getValue('regPassword');

    if (!nombre || !edad || !estadoCivil || !usuario || !password) {
      showAlert('Por favor completa todos los campos');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, edad, estadoCivil, usuario, password }),
      });

      if (!res.ok) throw new Error('Error en el registro');

      const msg = await res.text();

      showAlert(msg);

      if (msg.toLowerCase().includes('exitoso')) {
        window.location.href = 'login.html';
      }
    } catch (error) {
      console.error('Registro error:', error);
      showAlert('Error en la conexión al servidor');
    }
  });
}

// ------------------ MAIN (pantalla principal) ------------------
if (window.location.pathname.endsWith('main.html')) {
  const usuarioData = localStorage.getItem('usuarioLogeado');

  if (!usuarioData) {
    showAlert('No estás logueado');
    window.location.href = 'login.html';
  } else {
    try {
      const user = JSON.parse(usuarioData);
      document.getElementById('bienvenida').textContent = `¡Bienvenido, ${user.nombre}!`;

      document.getElementById('datosUsuario').innerHTML = `
        <p><b>Nombre:</b> ${user.nombre}</p>
        <p><b>Edad:</b> ${user.edad}</p>
        <p><b>Estado Civil:</b> ${user.estadoCivil}</p>
        <p><b>Usuario:</b> ${user.usuario}</p>
      `;
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      localStorage.removeItem('usuarioLogeado');
      window.location.href = 'login.html';
    }
  }
}

// ------------------ Cerrar sesión ------------------
function cerrarSesion() {
  localStorage.removeItem('usuarioLogeado');
  window.location.href = 'login.html';
}

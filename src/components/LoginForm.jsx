import React, { useState } from 'react';

const LoginForm = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contraseña }),
      });

      if (response.ok) {
        const data = await response.text();
        setMensaje(data); // Muestra mensaje del backend
      } else {
        setMensaje('Correo o contraseña inválidos');
      }
    } catch (error) {
      setMensaje('Error al conectarse con el servidor');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo"
          required
        />
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Entrar</button>
      </form>

      {/* ✅ Aquí se muestra el mensaje */}
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default LoginForm;

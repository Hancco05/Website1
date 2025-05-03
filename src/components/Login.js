import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí va la lógica de autenticación
    navigate('/welcome?usuario=EjemploUsuario');
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      <input type="email" placeholder="Correo electrónico" required />
      <input type="password" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
      <p>¿No tienes cuenta? <a href="/register">Crear una cuenta</a></p>
    </form>
  );
};

export default Login;

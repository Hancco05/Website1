import React from 'react';
import { useLocation } from 'react-router-dom';

const Welcome = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const usuario = params.get("usuario") || "Usuario";

  return (
    <div>
      <h2>¡Bienvenido, {usuario}!</h2>
      <a href="/">Cerrar sesión</a>
    </div>
  );
};

export default Welcome;

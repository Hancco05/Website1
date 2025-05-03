// src/components/Register.js

import React, { useState } from 'react';

function Register() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const respuesta = await fetch('http://localhost:8081/api/usuarios/guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
    const resultado = await respuesta.text();
    alert(resultado);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} required />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;

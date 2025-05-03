import React from 'react';

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí va la lógica de registro
    alert('Usuario registrado');
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Crear Cuenta</h2>
      <input type="text" placeholder="Nombre completo" required />
      <input type="date" required />
      <select required>
        <option value="">Género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Otro">Otro</option>
      </select>
      <input type="number" placeholder="Edad" required />
      <input type="text" placeholder="Nombre de usuario" required />
      <input type="password" placeholder="Contraseña" required />
      <input type="password" placeholder="Confirmar contraseña" required />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;

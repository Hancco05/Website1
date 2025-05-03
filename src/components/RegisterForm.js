import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterForm() {
    const [form, setForm] = useState({
        nombre: '', email: '', contraseña: '',
        genero: '', fechaNacimiento: '', edad: '', nombreUsuario: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8081/api/usuarios/registrar', form);
        alert('Usuario registrado, ahora puedes iniciar sesión');
        window.location.href = '/';
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <input placeholder="Nombre completo" onChange={e => setForm({ ...form, nombre: e.target.value })} />
            <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Nombre de Usuario" onChange={e => setForm({ ...form, nombreUsuario: e.target.value })} />
            <input type="password" placeholder="Contraseña" onChange={e => setForm({ ...form, contraseña: e.target.value })} />
            <input placeholder="Edad" type="number" onChange={e => setForm({ ...form, edad: e.target.value })} />
            <input type="date" onChange={e => setForm({ ...form, fechaNacimiento: e.target.value })} />
            <select onChange={e => setForm({ ...form, genero: e.target.value })}>
                <option value="">Seleccione Género</option>
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
            </select>
            <button type="submit">Registrarse</button>
        </form>
    );
}

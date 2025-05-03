import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8081/api/usuarios/login', { email, contraseña });
            if (res.data !== "Error") {
                navigate('/bienvenido', { state: { nombreUsuario: res.data } });
            } else {
                setError("Email o contraseña incorrectos.");
            }
        } catch (err) {
            setError("Error en el servidor.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
            <button type="submit">Entrar</button>
            {error && <p>{error}</p>}
            <p>¿No tienes cuenta? <a href="/registro">Regístrate</a></p>
        </form>
    );
}

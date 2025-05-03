import { useLocation, useNavigate } from 'react-router-dom';

export default function Bienvenido() {
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <h2>Bienvenido, {state?.nombreUsuario}!</h2>
            <button onClick={() => navigate('/')}>Cerrar sesión</button>
        </div>
    );
}

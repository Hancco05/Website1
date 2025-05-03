import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Bienvenido from './components/Bienvenido';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/registro" element={<RegisterForm />} />
                <Route path="/bienvenido" element={<Bienvenido />} />
            </Routes>
        </Router>
    );
}

export default App;

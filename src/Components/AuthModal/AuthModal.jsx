import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogin = () => {
        onClose();
        navigate('/ingresar');
    };

    const handleSignup = () => {
        onClose();
        navigate('/signup');
    };

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="auth-modal-close" onClick={onClose}>✕</button>
                
                <h2>¡Debes iniciar sesión!</h2>
                <p>Para agregar productos al carrito necesitas tener una cuenta</p>

                <div className="auth-modal-buttons">
                    <button className="auth-modal-btn primary" onClick={handleLogin}>
                        Ya tengo cuenta
                    </button>
                    <button className="auth-modal-btn secondary" onClick={handleSignup}>
                        Crear cuenta nueva
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
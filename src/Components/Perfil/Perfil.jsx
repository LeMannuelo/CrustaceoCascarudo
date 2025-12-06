import React, { useEffect, useState } from 'react';
import './Perfil.css';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    } else {
      navigate('/ingresar');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  if (!usuario) {
    return <div className="perfil">Cargando...</div>;
  }

  return (
    <div className="perfil">
      <div className="perfil-container">
        
        <div className="perfil-avatar">
          {usuario.name ? usuario.name.charAt(0).toUpperCase() : "U"}
        </div>

        <h1>¡Hola, {usuario.name}!</h1>
        
        <div className="perfil-info">
          <p><strong>Nombre:</strong> {usuario.name}</p>
          <p><strong>Correo:</strong> {usuario.email}</p>
          <p><strong>Rol:</strong> {usuario.role === 'ADMIN' ? 'Administrador' : 'Cliente'}</p>
        </div>

        <button onClick={handleLogout}>
          Cerrar Sesión
        </button>

      </div>
    </div>
  );
};

export default Perfil;
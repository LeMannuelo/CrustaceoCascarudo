import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import logo from '../Assets/KKlogo.png'
import inicio from '../Assets/inicio.png'
import menu from '../Assets/menu.png'
import ordenar from '../Assets/ordenar.png'
import cart from '../Assets/cart.png'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
    const { getTotalCartItems } = useContext(ShopContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Estado del usuario y del menú desplegable
    const [user, setUser] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Verificar si hay sesión activa al cargar
    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [location]); // Se actualiza si cambiamos de ruta

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        setUser(null);
        setShowProfileMenu(false);
        navigate('/'); // Redirigir al home
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    // Icono SVG de Usuario (Avatar)
    const UserIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="user-avatar-svg">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );

    return (
        <div className="navbar">
            
            {/* LOGO */}
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>

            {/* MENÚ CENTRAL (Escritorio / Barra inferior Móvil) */}
            <div className="navbar-menu">
                <Link to="/" className={`menu-item ${isActive('/')}`}>
                    <img src={inicio} alt="inicio" />
                    <span>Inicio</span>
                </Link>
                <Link to="/menu" className={`menu-item ${isActive('/menu')}`}>
                    <img src={menu} alt="menu" />
                    <span>Menú</span>
                </Link>
                <Link to="/mispedidos" className={`menu-item ${isActive('/mispedidos')}`}>
                    <img src={ordenar} alt="pedidos" />
                    <span>Mis Pedidos</span>
                </Link>
            </div>

            {/* ZONA DERECHA: Login/Perfil + Carrito */}
            <div className="nav-login">
                
                {user ? (
                    // SI HAY USUARIO: Mostrar Icono y Dropdown
                    <div className="nav-user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                        <UserIcon />
                        {showProfileMenu && (
                            <div className="profile-dropdown">
                                <p className="profile-name">Hola, {user.name}</p>
                                <hr />
                                <button onClick={handleLogout}>Cerrar Sesión</button>
                            </div>
                        )}
                    </div>
                ) : (
                    // NO HAY USUARIO: Mostrar Botón Ingresar
                    <Link to="/signup">
                        <button>Ingresar</button>
                    </Link>
                )}

                <Link to="/cart" className="nav-cart">
                    <img src={cart} alt="carrito" />
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                </Link>
            </div>

        </div>
    )
}

export default Navbar
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <div className="navbar">
            
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>

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

            <div className="nav-login">
                <Link to="/login">
                    <button>Ingresar</button>
                </Link>
                <Link to="/cart" className="nav-cart">
                    <img src={cart} alt="carrito" />
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                </Link>
            </div>

        </div>
    )
}

export default Navbar
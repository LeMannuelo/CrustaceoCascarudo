import './Navbar.css'
import logo from '../Assets/KKlogo.png'
import inicio from '../Assets/inicio.png'
import menu from '../Assets/menu.png'
import ordenar from '../Assets/ordenar.png'
import cart from '../Assets/cart.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className="navbar-menu">
        <Link to="/" className="menu-item">
          <img src={inicio} alt="icono inicio" />
          <span>Inicio</span>
        </Link>
        <Link to="/menu" className="menu-item">
          <img src={menu} alt="icono menú" />
          <span>Menú</span>
        </Link>
        <Link to="/ordenar" className="menu-item">
          <img src={ordenar} alt="icono ordenar" />
          <span>Ordenar</span>
        </Link>
      </div>

      <div className="nav-login">
        <Link to="/login">
          <button>Iniciar Sesión</button>
        </Link>
        <Link to="/cart" className="nav-cart">
          <img src={cart} alt="carrito" />
          <div className="nav-cart-count">0</div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar

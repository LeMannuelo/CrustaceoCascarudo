import './App.css';
import React from 'react'; 
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import MisPedidos from './Pages/MisPedidos';
import Cart from './Pages/Cart';
import Signup from './Components/Signup/Signup';
import Footer from './Components/Footer/Footer';
import SobreNosotros from "./Components/SobreNosotros/sobre-nosotros"
import PreguntasFrecuentes from "./Components/PreguntasFrecuentes/preguntas-frecuentes"
import Ingresar from "./Components/Ingresar/ingresar"
import MenuCategory from './Pages/MenuCategory';
import Product from './Pages/Product';
import Admin from "./Pages/Admin";
import ScrollToTop from './Components/ScrollToTop';
import Perfil from './Components/Perfil/Perfil'; 


function App() {
  
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/menu" element={<MenuCategory />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/mispedidos" element={<MisPedidos />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/perfil" element={<Perfil />} />
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

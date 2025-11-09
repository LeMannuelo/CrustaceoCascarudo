import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Menu from './Pages/Menu';
import Ordenar from './Pages/Ordenar';
import Cart from './Pages/Cart';
import Login from './Components/Login/Login';
import Footer from './Components/Footer/Footer';
import SobreNosotros from "./Components/SobreNosotros/sobre-nosotros"
import PreguntasFrecuentes from "./Components/PreguntasFrecuentes/preguntas-frecuentes"


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/ordenar" element={<Ordenar />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

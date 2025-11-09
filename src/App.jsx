import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Menu from './Pages/Menu';
import Ordenar from './Pages/Ordenar';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Footer from './Components/Footer/Footer';
import SobreNosotros from "./Pages/sobre-nosotros"
import PreguntasFrecuentes from "./Pages/preguntas-frecuentes"


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
        <Route path="/sobrenosotros" element={<SobreNosotros />} />
        <Route path="/preguntasfrecuentes" element={<PreguntasFrecuentes />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

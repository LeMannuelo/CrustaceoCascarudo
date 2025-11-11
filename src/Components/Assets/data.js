import cangri1 from "./cangri1.png";
import cangri2 from "./cangri2.png";
import perro from "./perro.png";
import acompañamientos from "./acompañamientos.png";
import malteadas from "./malteadas.png";
import postre from "./postre.png";

let data_product = [
  {
    id: 1,
    name: "Cangreburger",
    description: "La legendaria Cangreburger, preparada con la receta secreta de Don Cangrejo. ¡Irresistible!",
    image: cangri1,
    new_price: 18.00,
    old_price: 22.00,
    popular: true,
  },
  {
    id: 2,
    name: "Cangreburger Doble Carne",
    description: "El doble de sabor, el doble de felicidad. Dos jugosas carnes con pan cascarudo tostado.",
    image: cangri2,
    new_price: 25.00,
    old_price: 30.00,
    popular: true,
  },
  {
    id: 4,
    name: "Perro Cascarudo",
    description: "Una opción clásica del fondo de bikini: pan suave, salchicha casera y nuestra salsa secreta.",
    image: perro,
    new_price: 15.00,
    old_price: 18.00,
    popular: true,
  },
  {
    id: 50,
    name: "Acompañamientos",
    description: "Crujientes aros de cebolla, papas o yucas fritas al estilo del Crustáceo Cascarudo.",
    image: acompañamientos,
    new_price: 10.00,
    old_price: 12.00,
    popular: true,
  },
  {
    id: 60,
    name: "Bebidas",
    description: "Espesas, dulces y con sabor a la felicidad. Disponibles en fresa, vainilla y chocolate.",
    image: malteadas,
    new_price: 12.00,
    old_price: 14.00,
    popular: true,
  },
  {
    id: 25,
    name: "Postre Cascarudo",
    description: "El toque final perfecto: un postre hecho con amor y una pizca de azúcar del mar.",
    image: postre,
    new_price: 6.00,
    old_price: 7.50,
    popular: true,
  },
];

export default data_product;

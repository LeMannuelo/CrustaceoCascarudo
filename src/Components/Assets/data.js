import acompañamientos from "./acompañamientos.png";
import cangri2 from "./cangri2.png";
import malteadas from "./malteadas.png";
import cangri3 from "./cangri3.png";

let data_product = [
  {
    id: 1,
    name: "Acompañamientos",
    description: "Crujientes y deliciosos para acompañar tu hamburguesa.",
    image: acompañamientos,
    new_price: 10.00,
    old_price: 14.00,
  },
  {
    id: 2,
    name: "Cangri doble carne",
    description: "La clásica receta con doble sabor y pan dorado.",
    image: cangri2,
    new_price: 25.00,
    old_price: 30.00,
  },
  {
    id: 3,
    name: "Malteadas",
    description: "Refrescantes y cremosas, disponibles en varios sabores.",
    image: malteadas,
    new_price: 12.00,
    old_price: 15.00,
  },
  {
    id: 4,
    name: "Cangri triple deluxe",
    description: "Versión especial con tres carnes y salsa secreta.",
    image: cangri3,
    new_price: 30.00,
    old_price: 38.00,
  },
];

export default data_product;
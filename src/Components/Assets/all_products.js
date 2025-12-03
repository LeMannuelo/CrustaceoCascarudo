import cangri1 from "./cangri1.png";
import cangri2 from "./cangri2.png";
import cangri3 from "./cangri3.png";
import aroscebolla from "./aroscebolla.png";
import yuca from "./yuca.png";
import papas from "./papas.png";
import malteada1 from "./malteada1.png";
import malteada2 from "./malteada2.png";
import malteada3 from "./malteada3.png";
import perro from "./perro.png";
import pizza from "./pizza.png";
import ensalada from "./ensalada.png";
import postre from "./postre.png";
import brocoli from "./brocoli.png";
import combo1 from "./combo1.png";
import combo2 from "./combo2.png";
import combo3 from "./combo3.png";
import combo4 from "./combo4.png";
import combo5 from "./combo5.png";
import combo6 from "./combo6.png";
import criollas from "./criollas.png";
import pchocolate from "./pchocolate.png";
import pfresa from "./pfresa.png";
import pvainilla from "./pvainilla.png";
import postre2 from "./postre2.png";
import postre3 from "./postre3.png";
import salchipapas from "./salchipapas.png";
import soda1 from "./soda1.png";
import soda2 from "./soda2.png";
import soda3 from "./soda3.png";

let all_products = [
  // PRINCIPALES
  {
    id: 1,
    name: "Cangreburger",
    category: "principal",
    image: cangri1,
    price: 18.0,
    description: "La especialidad de la casa: una receta secreta que ha conquistado los corazones de Fondo de Bikini. Preparada con ingredientes frescos y el inconfundible toque del Crustáceo Cascarudo. Cada bocado es una explosión de sabor que te transportará al legendario restaurante submarino.",
  },
  {
    id: 2,
    name: "Cangreburger Doble Carne",
    category: "principal",
    image: cangri2,
    price: 25.0,
    description: "El doble de sabor, el doble de felicidad. Dos jugosas carnes de la mejor calidad, preparadas al grill con especias exclusivas del Crustáceo Cascarudo. Acompañadas con pan tostado cascarudo, queso derretido y la inconfundible salsa secreta que solo Don Cangrejo domina a la perfección.",
  },
  {
    id: 3,
    name: "Cangreburger Triple Deluxe",
    category: "principal",
    image: cangri3,
    price: 30.0,
    description: "Tres niveles de perfección absoluta: carne premium, queso derretido y la inigualable salsa secreta que ha hecho famoso al Crustáceo Cascarudo en todo Fondo de Bikini. Una experiencia gastronómica submarina que solo los verdaderos amantes del sabor pueden apreciar.",
  },
  {
    id: 4,
    name: "Perro Cascarudo",
    category: "principal",
    image: perro,
    price: 15.0,
    description: "Una versión marina del clásico perro caliente, presentada a la manera del Crustáceo Cascarudo. Pan suave y tostado, salchicha jugosa preparada según la receta especial, y coronada con la legendaria salsa cascaruda que complementa cada bocado.",
  },
  {
    id: 5,
    name: "Pizza",
    category: "principal",
    image: pizza,
    price: 22.0,
    description: "La pizza oficial del Crustáceo Cascarudo, preparada en horno marino de alta temperatura. Masa esponjosa y dorada, cubierta de extra queso derretido y toques de especias submarinas exclusivas de Don Cangrejo. Cada rebanada trae el auténtico sabor de Fondo de Bikini.",
  },
  {
    id: 6,
    name: "Salchipapas",
    category: "principal",
    image: salchipapas,
    price: 14.0,
    description: "Un festín irresistible de papas crujientes, salchichas jugosas y una variedad de salsas al mejor estilo del Crustáceo Cascarudo. La combinación perfecta que ha enamorado a clientes de todo Fondo de Bikini. Ideal para compartir o disfrutar en solitario.",
  },
  {
    id: 7,
    name: "Combo #1",
    category: "principal",
    image: combo1,
    price: 25.0,
    description: "Cangreburger clásica + papas + soda. El combo perfecto para sobrevivir al turno en el Crustáceo.",
  },
  {
    id: 8,
    name: "Combo #2",
    category: "principal",
    image: combo2,
    price: 28.0,
    description: "La combinación perfecta: una Cangreburger doble acompañada de nuestros mejores acompañamientos y una malteada recién preparada de tu sabor favorito. Diseñado por Don Cangrejo para satisfacer los paladares más exigentes.",
  },
  {
    id: 9,
    name: "Combo #3",
    category: "principal",
    image: combo3,
    price: 30.0,
    description: "Cangreburger triple + soda + papas criollas. Potente como Bob en modo chef.",
  },
  {
    id: 10,
    name: "Combo #4",
    category: "principal",
    image: combo4,
    price: 27.0,
    description: "Perro caliente + papas + malteada. Ideal para un almuerzo submarino.",
  },
  {
    id: 11,
    name: "Combo #5",
    category: "principal",
    image: combo5,
    price: 29.0,
    description: "Cangreburger doble con papas criollas y soda especial de medusa.",
  },
  {
    id: 12,
    name: "Combo #6",
    category: "principal",
    image: combo6,
    price: 32.0,
    description: "Pizza Cascaruda + ensalada + bebida. Perfecto para compartir con Calamardo.",
  },

  // ACOMPAÑAMIENTOS
  {
    id: 13,
    name: "Aros de Cebolla",
    category: "acompañamientos",
    image: aroscebolla,
    price: 6.0,
    description: "Crujientes y dorados al horno submarino del Crustáceo Cascarudo, estos aros de cebolla son el acompañamiento favorito de Don Cangrejo. Rebozados en la mezcla secreta que los hace irresistibles. Perfectos para compartir o como entrada.",
  },
  {
    id: 14,
    name: "Yucas Fritas",
    category: "acompañamientos",
    image: yuca,
    price: 6.0,
    description: "Crujientes por fuera y suaves por dentro, estas yucas fritas son una delicia del Crustáceo Cascarudo. Preparadas con aceite de arrecife premium y servidas con la salsa de coral cascaruda que las complementa a la perfección.",
  },
  {
    id: 15,
    name: "Papas Fritas",
    category: "acompañamientos",
    image: papas,
    price: 6.0,
    description: "Las papas más famosas de Fondo de Bikini, fritas a la perfección en el aceite secreto del Crustáceo Cascarudo. Crujientes por fuera, tiernas por dentro, y con ese toque inconfundible que las hace irresistibles. El acompañamiento que todo cliente desea.",
  },
  {
    id: 16,
    name: "Ensalada",
    category: "acompañamientos",
    image: ensalada,
    price: 7.0,
    description: "Una fresca mezcla marina preparada por los mejores cocineros submarinos del Crustáceo Cascarudo. Ingredientes seleccionados del arrecife, combinados con algas crujientes y aderezo cascarudo que realza cada sabor del fondo del océano.",
  },
  {
    id: 17,
    name: "Papas Criollas",
    category: "acompañamientos",
    image: criollas,
    price: 7.0,
    description: "Doradas y con un sabor intenso, el acompañamiento más local del mar.",
  },
  {
    id: 18,
    name: "Brócoli",
    category: "acompañamientos",
    image: brocoli,
    price: 7.0,
    description: "Brócoli fresco del arrecife cultivado en las aguas más puras de Fondo de Bikini. Al vapor con un toque de mantequilla cascaruda y especias marinas. Ideal para los clientes que buscan una opción más saludable sin sacrificar el sabor submarino.",
  },

  // BEBIDAS
  {
    id: 19,
    name: "Malteada de Fresa",
    category: "bebidas",
    image: malteada1,
    price: 10.0,
    description: "Una refrescante malteada de fresa elaborada con los métodos tradicionales del Crustáceo Cascarudo, hecha con frutas frescas del arrecife. Espumosa y burbujeante, con ese toque marino que solo Don Cangrejo sabe lograr. Perfecta para acompañar cualquier comida.",
  },
  {
    id: 20,
    name: "Malteada de Chocolate",
    category: "bebidas",
    image: malteada2,
    price: 10.0,
    description: "Cremosa y deliciosa, elaborada con los mejores ingredientes del Crustáceo Cascarudo. Chocolate premium derretido suavemente, con una textura aterciopelada que derrite en tu paladar. Perfecta para acompañar una Cangreburger o disfrutar como un capricho submarino.",
  },
  {
    id: 21,
    name: "Malteada de Vainilla",
    category: "bebidas",
    image: malteada3,
    price: 10.0,
    description: "El clásico sabor vainilla con el toque secreto del Crustáceo Cascarudo. Cremosa y suave, preparada con vainilla premium de las aguas profundas. Cada sorbo evoca la elegancia culinaria que Don Cangrejo ha perfeccionado a través de los años.",
  },
  {
    id: 22,
    name: "Soda Neptuna",
    category: "bebidas",
    image: soda1,
    price: 8.0,
    description: "Una bebida burbujeante y energética, extraída directamente del legendario campo de medusas de Fondo de Bikini. Con un sabor vibrante y refrescante que captura la esencia del océano. La bebida favorita de los trabajadores del Crustáceo Cascarudo.",
  },
  {
    id: 23,
    name: "Soda Coralina",
    category: "bebidas",
    image: soda2,
    price: 8.0,
    description: "Con sabor a frutas frescas del arrecife de Fondo de Bikini, esta soda es dulce y refrescante. Preparada en las cocinas del Crustáceo Cascarudo con métodos tradiciones submarinos. Perfecta para acompañar cualquier comida del menú.",
  },
  {
    id: 24,
    name: "Soda de Medusa",
    category: "bebidas",
    image: soda3,
    price: 8.0,
    description: "Refrescante y exótica, con burbujas capturadas del fondo del océano. Una bebida única que solo existe en el Crustáceo Cascarudo. Su sabor especial combina ingredientes marinos que harán que cada sorbo sea una experiencia inolvidable.",
  },

  // POSTRES
  {
    id: 25,
    name: "Postre Cascarudo",
    category: "postres",
    image: postre,
    price: 6.0,
    description: "El clásico postre de la casa del Crustáceo Cascarudo, suave y dulce como una tarde relajante bajo el mar. Preparado con la receta especial de Don Cangrejo, cada porción derrite en tu boca con una combinación perfecta de sabores submarinos.",
  },
  {
    id: 26,
    name: "Pastel de Vainilla",
    category: "postres",
    image: pvainilla,
    price: 6.0,
    description: "Un bizcocho esponjoso y delicado elaborado en las cocinas del Crustáceo Cascarudo, cubierto con crema de vainilla premium y un aroma marino inconfundible. Cada bocado es una experiencia suave que complementa perfectamente cualquier comida.",
  },
  {
    id: 27,
    name: "Pastel de Chocolate",
    category: "postres",
    image: pchocolate,
    price: 6.0,
    description: "El favorito incondicional de Bob Esponja y de todos los clientes del Crustáceo Cascarudo: un pastel húmedo, cremoso y lleno de sabor chocolatero intenso. Preparado con chocolate premium submarino, es el postre perfecto para satisfacer los antojos más exigentes.",
  },
  {
    id: 28,
    name: "Pastel de Fresa",
    category: "postres",
    image: pfresa,
    price: 6.0,
    description: "Dulce y rosado como una medusa bebé, este pastel de fresa es una delicia del Crustáceo Cascarudo. Preparado con fresas frescas del arrecife y decorado con precisión, es perfecto para compartir en ocasiones especiales o disfrutar en solitario.",
  },
  {
    id: 29,
    name: "Postre Coralino",
    category: "postres",
    image: postre2,
    price: 6.5,
    description: "Un toque tropical que evoca las maravillas del arrecife de Fondo de Bikini. Hecho con frutas exóticas del arrecife combinadas con crema ligera y aireada. El postre del Crustáceo Cascarudo que trae el sabor del paraíso submarino a tu mesa.",
  },
  {
    id: 30,
    name: "Delicia Neptuna",
    category: "postres",
    image: postre3,
    price: 7.0,
    description: "El postre más elegante y sofisticado del fondo del mar, creado por Don Cangrejo para los clientes más exigentes del Crustáceo Cascarudo. Una combinación refinada de sabores marinos, texturas delicadas y presentación impecable. Ideal para cerrar cualquier comida con un broche de oro submarino.",
  },
];

export default all_products;

import React from 'react';
import "./Popular.css";
import Item from '../Item/Item';
import data_product from '../Assets/data.js';

const Popular = () => {
  const popularProducts = data_product.filter(item => item.popular);

  return (
    <div className='popular'>
      <h1>POPULAR</h1>
      <hr />
      <div className='popular-item'>
        {popularProducts.map((item, i) => {
          
          // Lógica simple para redirigir categorías especiales
          let specialLink = null;
          
          if (item.name.includes("Acompañamientos")) {
             specialLink = "/menu?category=acompañamientos";
          } else if (item.name.includes("Bebidas")) {
             specialLink = "/menu?category=bebidas";
          }

          return (
            <Item 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              // CORRECCIÓN 1: Pasamos 'new_price' (del data.js) como 'price' (que espera el Item)
              price={item.new_price} 
              // CORRECCIÓN 2: Pasamos el link especial si existe
              customLink={specialLink}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
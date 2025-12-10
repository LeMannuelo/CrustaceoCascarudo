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
s              price={item.new_price} 
              customLink={specialLink}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
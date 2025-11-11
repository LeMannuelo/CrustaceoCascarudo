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
        {popularProducts.map((item, i) => (
          <Item 
            key={i} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            new_price={item.new_price} 
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;

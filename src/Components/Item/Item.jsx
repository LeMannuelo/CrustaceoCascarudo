import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = (props) => {
  const isCategoryLink = 
    props.name.toLowerCase().includes('acompañ') || 
    props.name.toLowerCase().includes('bebid');

  const linkTo = isCategoryLink
    ? `/menu?category=${props.name.toLowerCase().includes('bebid') ? 'bebidas' : 'acompañamientos'}`
    : `/product/${props.id}`;

  return (
    <div className="item">
      {/* La imagen va arriba, ocupando todo el ancho */}
      <Link to={linkTo} className="item-img-container">
        <img src={props.image} alt={props.name} />
      </Link>
      
      {/* Envolvemos el texto para darle padding separado */}
      <div className="item-details">
        <p>{props.name}</p>
        <div className="item-prices">
          <div className='item-price-new'>${props.new_price}</div>
        </div>
      </div>
    </div>
  );
};

export default Item;
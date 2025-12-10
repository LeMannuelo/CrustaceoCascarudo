import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = (props) => {
  const linkTo = props.customLink ? props.customLink : `/product/${props.id}`;

  return (
    <div className="item">
      <Link to={linkTo} onClick={() => window.scrollTo(0, 0)} className="item-img-container">
        <img src={props.image} alt={props.name} />
      </Link>
      
      <div className="item-details">
        <p>{props.name}</p>
        <div className="item-prices">
          <div className='item-price-new'>${props.price}</div>
        </div>
      </div>
    </div>
  );
};

export default Item;
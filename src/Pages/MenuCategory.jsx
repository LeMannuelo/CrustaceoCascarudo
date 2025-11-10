import React, { useContext, useState } from 'react';
import './CSS/MenuCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

const MenuCategory = () => {
  const { all_products } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Filtrado por categoría
  const filteredProducts =
    selectedCategory === 'todos'
      ? all_products
      : all_products.filter((item) => item.category === selectedCategory);

  return (
    <div className="menu-category">
      <h1></h1>

      <div className="menu-filters">
        <button
          className={selectedCategory === 'todos' ? 'active' : ''}
          onClick={() => setSelectedCategory('todos')}
        >
          Todos
        </button>
        <button
          className={selectedCategory === 'principal' ? 'active' : ''}
          onClick={() => setSelectedCategory('principal')}
        >
          Principales
        </button>
        <button
          className={selectedCategory === 'acompañamientos' ? 'active' : ''}
          onClick={() => setSelectedCategory('acompañamientos')}
        >
          Acompañamientos
        </button>
        <button
          className={selectedCategory === 'malteadas' ? 'active' : ''}
          onClick={() => setSelectedCategory('malteadas')}
        >
          Malteadas
        </button>
        <button
          className={selectedCategory === 'postres' ? 'active' : ''}
          onClick={() => setSelectedCategory('postres')}
        >
          Postres
        </button>
      </div>

      <p className="menu-count">
        Mostrando {filteredProducts.length} producto
        {filteredProducts.length !== 1 && 's'}
      </p>

      <div className="menucategory-products">
        {filteredProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.precio}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;

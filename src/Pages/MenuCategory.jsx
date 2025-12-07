import React, { useContext, useEffect, useState } from 'react';
import './CSS/MenuCategory.css'; // Asegúrate de que esta carpeta CSS exista dentro de Pages
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import { useSearchParams, useNavigate } from 'react-router-dom';

const MenuCategory = () => {
  const { all_products } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryFromURL = searchParams.get('category') || 'todos';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);

  useEffect(() => {
    setSelectedCategory(categoryFromURL);
  }, [categoryFromURL]);

  const filteredProducts =
    selectedCategory === 'todos'
      ? all_products
      : all_products.filter((item) => item.category === selectedCategory);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams(category === 'todos' ? {} : { category });
    navigate(category === 'todos' ? '/menu' : `/menu?category=${category}`);
  };

  return (
    <div className="menu-category">
      <div className="menu-filters">
        {['todos', 'principal', 'acompañamientos', 'bebidas', 'postres'].map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <p className="menu-count">
        Mostrando {filteredProducts.length} producto
        {filteredProducts.length !== 1 && 's'}
      </p>

      <div className="menucategory-products">
        {filteredProducts.map((item) => {
           // Corrección de la ruta de imagen si viene del backend
           const imagePath = item.image.startsWith('./') 
              ? item.image.replace('./', '/images/') 
              : item.image; 

          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={imagePath}
              price={item.price}     // <--- OJO: backend usa 'price', no 'new_price'
              category={item.category} // <--- Necesario para que el link funcione
            />
          );
        })}
      </div>
    </div>
  );
};

export default MenuCategory;
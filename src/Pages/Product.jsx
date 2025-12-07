import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import Loading from '../Components/Loading/Loading';

const Product = () => {
  const { all_products } = useContext(ShopContext); 
  const { productId } = useParams();
  
  // Buscamos el producto
  const product = all_products.find((e) => e.id === Number(productId));

  if (!product) {
        return <Loading />;
    }

  const productWithFixedImage = {
      ...product,
      image: product.image.startsWith('./') ? product.image.replace('./', '/images/') : product.image
  };

  return (
    <div>
      <Breadcrum product={productWithFixedImage}/>
      <ProductDisplay product={productWithFixedImage}/>
      <DescriptionBox/>
    </div>
  )
}

export default Product;
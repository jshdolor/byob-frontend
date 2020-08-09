import React from 'react';

const Product = (props) => {
  let { products } = props;
  let { name, image, price } = products;
  return (
    <div className='product-preview'>
      <div className='product-img'>
        <img src={image} alt='' />
      </div>
      <div className='product-desc'>
        <div className='name'>{name}</div>
        <div className='price'>{price}</div>
      </div>
      <a href='#' className='add-btn'>
        Add To Cart
      </a>
    </div>
  );
};

export default Product;

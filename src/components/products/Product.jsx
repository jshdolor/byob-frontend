import React from 'react';
import AddCartButton from '~/components/buttons/addCart';
import Link from 'next/link';

const Product = (props) => {
    const { products } = props;
    const { name, slug, image, displayPrice, id, type } = products;
    return (
        <div className='product-preview'>
            <Link href={`/products/[slug]`} as={`/products/${slug}`}>
                <a>
                    <div className='product-img'>
                        <img src={image} alt='' />
                    </div>
                    <div className='product-desc'>
                        <div className='name'>{name}</div>
                        <div className='price'>{displayPrice}</div>
                    </div>
                </a>
            </Link>
            <AddCartButton id={id} type={type}></AddCartButton>
        </div>
    );
};

export default Product;

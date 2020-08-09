import React, { useState, useEffect } from 'react';
import ProductService from '~/services/Product';

import ProductModel from '~/models/product';
import mockProducts from '../../../mockdb/db.json';

import Item from './item';
import { Row, Col } from 'react-bootstrap';

const Catalogue = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(mockProducts);
        const data = mockProducts.products.data.map((d) => new ProductModel(d));
        setProducts(data);
        // ProductService.getAll().then((prod) => setProducts(prod));
    }, []);

    return (
        <Row>
            {(products || []).map((product) => (
                <Col key={product.id} lg={3}>
                    <Item data={product}></Item>
                </Col>
            ))}
        </Row>
    );
};

export default Catalogue;

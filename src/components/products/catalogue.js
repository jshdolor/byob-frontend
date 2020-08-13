import React, { useState, useEffect } from 'react';
import ProductService from '~/services/Product';

import Item from './item';
import { Row, Col } from 'react-bootstrap';

const Catalogue = ({ products }) => {
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

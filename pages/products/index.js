import Head from 'next/head';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Banner, Filter, Catalogue } from '~/components/products';
import { useState, useEffect } from 'react';
import ProductService from '~/services/Product';
import SortFilter from '~/components/products/SortFilter';

function ProductsPage() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getAll().then((prod) => {
            setProducts(prod);
            setFilteredProducts(prod);
        });
    }, []);

    return (
        <>
            <Head>
                <title>BYOB | Products</title>
            </Head>
            <Container id='products-page'>
                <Row>
                    <Col lg={2}></Col>
                    <Col>
                        <Banner></Banner>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col lg={3}>
                        <Form.Group className='my-3'>
                            <Form.Row>
                                <Form.Label column='sm' lg={4}>
                                    Sort by:
                                </Form.Label>
                                <Col>
                                    <SortFilter
                                        products={filteredProducts}
                                        handle={setFilteredProducts}
                                    ></SortFilter>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={2}>
                        <Filter
                            products={products}
                            handle={setFilteredProducts}
                        ></Filter>
                    </Col>
                    <Col>
                        <Catalogue
                            products={filteredProducts}
                            className='my-5'
                        ></Catalogue>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ProductsPage;

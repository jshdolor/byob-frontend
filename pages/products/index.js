import Head from 'next/head';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Banner, Filter, Catalogue } from '~/components/products';
import { useState, useEffect } from 'react';
import ProductService from '~/services/Product';
import SortFilter from '~/components/products/SortFilter';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { TOGGLE_CART_MENU } from '~/store/cartMenu/actions';

function ProductsPage() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [typeFilter, setTypeFilter] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const [, forceUpdate] = useState();

    useEffect(() => {
        ProductService.getAll().then((prod) => {
            setProducts(prod);
            setFilteredProducts(prod);
        });

        if (router.query['open']) {
            dispatch({ type: TOGGLE_CART_MENU, payload: true });
        }
    }, []);

    const handleTypeFilter = (type) => {
        const inTypeFilter = typeFilter.indexOf(type) > -1;
        const newTypeFilter = [...typeFilter];

        if (inTypeFilter) {
            newTypeFilter.splice(typeFilter.indexOf(type), 1);
        } else {
            newTypeFilter.push(type);
        }

        setTypeFilter(newTypeFilter);
    };

    return (
        <>
            <Head>
                <title>BYOB | Products</title>
            </Head>
            <Container id='products-page'>
                <Row>
                    <Col lg={3}>
                        <Filter
                            products={products}
                            handle={setFilteredProducts}
                            typeFilter={handleTypeFilter}
                        ></Filter>
                    </Col>
                    <Col lg={9}>
                        <Banner></Banner>
                        <Row className='align-items-center'>
                            <Col lg={8}>
                                <Form.Label className='pt-3'>
                                    {filteredProducts.length} Results
                                </Form.Label>
                            </Col>
                            <Col lg={4} className='text-right'>
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
                        {typeFilter.indexOf(2) > -1 && (
                            <Row>
                                <Col>
                                    Return the used bottle at BYOB booth to
                                    receive a refund code that you can use in
                                    your next purchase.
                                </Col>
                            </Row>
                        )}

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

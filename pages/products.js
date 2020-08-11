import Head from 'next/head';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Banner, Filter, Catalogue } from '~/components/products';

export default function ProductsPage() {
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
                                    <Form.Control as='select'>
                                        <option>Popularity</option>
                                        <option>test</option>
                                        <option>test2</option>
                                        <option>test1</option>
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={2}>
                        <Filter></Filter>
                    </Col>
                    <Col>
                        <Catalogue className='my-5'></Catalogue>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

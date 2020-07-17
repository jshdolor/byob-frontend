import { Row, Col, Image } from 'react-bootstrap';

const cartItem = ({ item }) => (
    <Row noGutters className='cart-item py-4 px-0'>
        <Col lg={5}>
            <Image src={item.image} fluid></Image>
        </Col>
        <Col lg={5}>
            <div className='px-1'>
                <div className='byob-text-small font-weight-bold cart-item-name'>
                    {item.name}
                </div>
                <div className='byob-text-small byob-text-secondary cart-item-description'>
                    {item.description}
                </div>
            </div>
        </Col>
        <Col lg={2} className='text-right byob-text-small font-weight-bold'>
            {item.price_currency}
        </Col>
    </Row>
);

export default cartItem;

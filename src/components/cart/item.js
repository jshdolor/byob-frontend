import { Row, Col, Image } from 'react-bootstrap';
import QuantityModifier from './quantityModifier';

import RemoveCartItemButton from './RemoveCartItemButton';

const cartItem = ({ item }) => {
    return (
        <Row noGutters className='cart-item py-4 px-0'>
            <Col lg={5} className='text-center'>
                {/* <Image src={item.image} fluid></Image> */}
            </Col>
            <Col lg={5} className='px-1'>
                <div className='byob-text-small font-weight-bold cart-item-name'>
                    {item.name}
                </div>
                <div className='byob-text-small byob-text-secondary cart-item-description pb-4'>
                    {item.description}
                </div>

                <QuantityModifier
                    id={item.product_id}
                    type={item.type}
                    quantity={item.qty}
                    bottles={item.bottles}
                ></QuantityModifier>

                <RemoveCartItemButton
                    id={item.product_id}
                ></RemoveCartItemButton>
            </Col>
            <Col lg={2} className='text-right byob-text-small font-weight-bold'>
                {item.displayPrice}
            </Col>
        </Row>
    );
};

export default cartItem;

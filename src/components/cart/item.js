import { Row, Col, Image } from 'react-bootstrap';
import QuantityModifier from './quantityModifier';

import RemoveCartItemButton from './RemoveCartItemButton';

const CartItem = ({ item, checkout = false, disabled = false, ...rest }) => {
    return (
        <Row noGutters className="cart-item" {...rest}>
            <Col lg={checkout ? 2 : 5} xs={5} className="item-image">
                <Image src={item.image} fluid></Image>
            </Col>
            <Col lg={checkout ? 8 : 5} xs={5} className="px-1 item-description">
                <div
                    className={`byob-text-small font-weight-bold cart-item-name ${
                        checkout ? 'pt-3' : ''
                    }`}
                >
                    {item.name}
                </div>
                {!checkout && (
                    <div className="byob-text-small byob-text-secondary cart-item-description pb-4">
                        {item.description}
                    </div>
                )}

                <QuantityModifier
                    id={item.product_id}
                    type={item.type}
                    quantity={item.qty}
                    disabled={disabled}
                ></QuantityModifier>
            </Col>
            <Col
                lg={2}
                xs={2}
                className={`text-right byob-text-small font-weight-bold ${
                    checkout ? 'pt-3' : ''
                }`}
            >
                {item.displayPrice}

                <RemoveCartItemButton
                    id={item.product_id}
                    large={checkout}
                    disabled={disabled}
                ></RemoveCartItemButton>
            </Col>
        </Row>
    );
};

export default CartItem;

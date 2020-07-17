import { Row, Col, Image } from 'react-bootstrap';

const cartItem = (props) => (
    <Row noGutters className='cart-item py-4 px-0'>
        <Col lg={5}>
            <Image
                src='https://semantic-ui.com/images/wireframe/image.png'
                fluid
            ></Image>
        </Col>
        <Col lg={5}>
            <div className='px-1'>
                <div className='byob-text-small font-weight-bold cart-item-name'>
                    Datu Puti
                </div>
                <div className='byob-text-small byob-text-secondary cart-item-description'>
                    This is the item's short description
                </div>
            </div>
        </Col>
        <Col lg={2} className='text-right byob-text-small font-weight-bold'>
            P24.50
        </Col>
    </Row>
);

export default cartItem;

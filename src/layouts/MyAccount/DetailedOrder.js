import { Row, Col, Button } from 'antd';
import ReOrderBtn from '~/components/buttons/reOrder';

const DetailedOrder = (props) => {
    const {
        orderNumber,
        products,
        totalPriceDisplay,
        subTotalDisplay,
        bottles,
        status,
        paymentType,
        bottlesPriceDisplay,
        orderPendingAt,
    } = props.record;
    return (
        <>
            <Row>
                <Col>
                    <div className='byob-title text-primary'>{orderNumber}</div>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col span={14}>
                    {products.map((product) => {
                        return (
                            <Row>
                                <Col span={14}>{product.name}</Col>
                                <Col span={10} className='text-right'>
                                    {product.product_type_id === 2
                                        ? product.pivot.qty + 'ml'
                                        : 'x' + product.pivot.qty}
                                </Col>
                            </Row>
                        );
                    })}
                </Col>
                <Col span={10} style={{ borderLeft: '1px solid #ccc' }}>
                    <Row>
                        <Col span={12}>Subtotal</Col>
                        <Col className='text-right' span={12}>
                            {subTotalDisplay}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>Bottle(x{bottles})</Col>
                        <Col span={12} className='text-right'>
                            {bottlesPriceDisplay}
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col span={12}>
                            Total
                            <br />
                            (VAT included)
                        </Col>
                        <Col span={12} className='text-right'>
                            {totalPriceDisplay}
                        </Col>
                    </Row>
                    <Row>
                        <Col>Paid via {paymentType}</Col>
                    </Row>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col span={12}>
                    <div>
                        <b>Ordered</b>
                    </div>
                    <div>{orderPendingAt}</div>
                    <div>
                        <b>Status</b>
                        <div>{status}</div>
                    </div>
                </Col>
                <Col span={12} className='text-right'>
                    <ReOrderBtn></ReOrderBtn>
                </Col>
            </Row>
        </>
    );
};

export default DetailedOrder;

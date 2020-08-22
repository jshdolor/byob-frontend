import { Row, Col, Button } from 'antd';
import ReOrderBtn from '~/components/buttons/reOrder';

const DetailedOrder = (props) => {
  const { orderNumber, products, totalPriceDisplay, subTotalDisplay, bottles, status, paymentType, bottlesPriceDisplay, orderPendingAt } = props.record;
  return (
    <>
      <Row>
        <Col>
          <div className='byob-title text-primary'>{orderNumber}</div>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col span={14} className='history-product-cont'>
          {products.map((product, i) => {
            return (
              <Row key={i}>
                <Col span={14}>{product.name}</Col>
                <Col span={10} className='text-right'>
                  {product.product_type_id === 2 ? product.pivot.qty + 'ml' : 'x' + product.pivot.qty}
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col span={10} className='history-sub-cont'>
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
          <ReOrderBtn cart={products}></ReOrderBtn>
        </Col>
      </Row>
    </>
  );
};

export default DetailedOrder;

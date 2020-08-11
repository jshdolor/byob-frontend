import React, { Component } from 'react';
import { Row, Col } from 'antd';

class HowToOrderTPL extends Component {
  state = {};
  render() {
    return (
      <>
        <h1 className='how-title'>How to Order</h1>
        <Row className='how-to-order-cont'>
          <Col sm={24} lg={12} className='two-cols'>
            <div className='one-bg'></div>
          </Col>
          <Col sm={24} lg={12} className='two-cols'>
            <div className='two-bg'></div>
          </Col>
        </Row>
      </>
    );
  }
}

export default HowToOrderTPL;

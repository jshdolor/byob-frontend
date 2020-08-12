import React, { Component } from 'react';
import { Row, Col, InputNumber } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import StarRatingComponent from 'react-star-rating-component';
import Product from '~/components/products/Product';
import ReviewForm from '../../components/forms/ReviewForm/ReviewForm';

class SingleProductTPL extends Component {
  state = { quantity: 0, total: 0, price: 25, averageRating: 4, review: false };

  onAdd = () => {
    this.setState(
      {
        quantity: this.state.quantity + 1,
      },
      this.computeSubTotal
    );
  };

  onMinus = () => {
    this.setState(
      {
        quantity: this.state.quantity - 1,
      },
      this.computeSubTotal
    );
  };

  computeSubTotal = () => {
    let subtotal = this.state.quantity * this.state.price;

    this.setState({
      total: subtotal,
    });
  };

  showReview = () => {
    console.log('clicked');
    if (this.state.review === false) {
      this.setState({
        review: true,
      });
    } else {
      this.setState({
        review: false,
      });
    }
  };

  render() {
    const { averageRating, quantity, total } = this.state;

    var products = [
      {
        name: 'test 1',
        price: 'P20',
        image: 'https://via.placeholder.com/500',
      },
      {
        name: 'test 2',
        price: 'P30',
        image: 'https://via.placeholder.com/500',
      },
    ];

    return (
      <div className='single-product-cont'>
        <Row>
          <Col sm={24} lg={14}>
            <div className='product-image'>
              <img src='https://via.placeholder.com/800x1000?text=Product Preview' alt='' />
            </div>
          </Col>
          <Col sm={24} lg={10} className='product-side'>
            <div className='product-details'>
              <div className='name-cont'>
                <h4 className='name'>Product Name</h4>
                <h4 className='price'>P25</h4>
              </div>
              <div className='rating-cont'>
                <StarRatingComponent value={averageRating} editing={false} />
              </div>
              <div className='desc'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis rem illum pariatur consequuntur. Voluptates, vel omnis. Animi non at vel doloribus, asperiores tempore aliquid
                dolores architecto! Eligendi asperiores doloremque nulla!
              </div>
            </div>
            <div className='product-order'>
              <div className='quantity-cont'>
                <div className='quantity'>
                  <h5 className='title'>Quantity</h5>
                  <div className='counter-cont'>
                    <MinusOutlined className='minus-btn' onClick={this.onMinus} />
                    <span className='order-quantity'>{quantity}</span>
                    <PlusOutlined className='plus-btn' onClick={this.onAdd} />
                  </div>
                </div>
                <div className='subtotal-cont'>
                  <p>
                    Subtotal: P<span>{total}</span>
                  </p>
                </div>
              </div>
              <div className='order-button-cont'>{/* ADD TO CAR BUTTON HERE */}</div>
            </div>
            <div className='more-products'>
              <p>More from Datu Puti</p>
              <div className='more-product-cont'>
                {products.map((product, i) => (
                  <Product key={i} products={product}></Product>
                ))}
              </div>
            </div>
            <div className='reviews-cont'>
              {!this.state.review ? (
                <div className='main-review'>
                  <div className='review-title'>
                    <h4 className='title'>Reviews</h4>
                    <p className='write-btn' onClick={this.showReview}>
                      Write a Review
                    </p>
                  </div>
                  <div className='review-lists'>
                    <div className='review'>
                      <h4 className='name'>John Doe</h4>
                      <StarRatingComponent value={1} editing={false} />
                      <p className='para'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus neque necessitatibus vero quibusdam, quasi dolorum distinctio, nesciunt quis tenetur debitis, autem fuga vitae
                        tempora obcaecati. Odit deleniti eos sapiente alias.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='write-review'>
                  <div className='review-title'>
                    <h4 className='title'>Rate this Product</h4>
                    <p className='write-btn' onClick={this.showReview}>
                      Cancel
                    </p>
                  </div>
                  <div className='review-form'>
                    <ReviewForm></ReviewForm>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SingleProductTPL;

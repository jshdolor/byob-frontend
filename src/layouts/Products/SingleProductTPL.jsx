import React, { Component } from 'react';
import { Row, Col, InputNumber, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import StarRatingComponent from 'react-star-rating-component';
import Product from '~/components/products/Product';
import ReviewForm from '../../components/forms/ReviewForm/ReviewForm';
import ProductModel from '~/models/product';
import AddCart from '~/components/buttons/addCart';

import { amountPrecision } from '~/config/app';

class SingleProductTPL extends Component {
    state = {
        quantity: 1,
        total: this.props.product.price,
        price: this.props.product.price,
        review: false,
    };

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
                quantity:
                    this.state.quantity === 1
                        ? this.state.quantity
                        : this.state.quantity - 1,
            },
            this.computeSubTotal
        );
    };

    onQuantityChange = (value) => {
        value = parseInt(value) ?? 1;

        this.setState(
            {
                quantity: this.state.quantity > 0 ? value : 1,
            },
            this.computeSubTotal
        );
    };

    computeSubTotal = () => {
        const subtotal = this.state.quantity * this.state.price;

        this.setState({
            total: parseFloat(subtotal).toFixed(amountPrecision),
        });
    };

    showReview = () => {
        this.setState({
            review: !this.state.review,
        });
    };

    render() {
        const { quantity, total } = this.state;
        const {
            type,
            description,
            displayPrice,
            name,
            brand,
            id,
            image,
            average_rating,
        } = new ProductModel(this.props.product);

        const suggestions = this.props.suggestions.map(
            (product) => new ProductModel(product)
        );
        const { reviews } = this.props;

        return (
            <div className='single-product-cont'>
                <Row>
                    <Col sm={24} lg={14}>
                        <div className='product-image'>
                            <img src={image} alt='' />
                        </div>
                    </Col>
                    <Col sm={24} lg={10} className='product-side'>
                        <div className='product-details'>
                            <div className='name-cont'>
                                <h4 className='name'>{name}</h4>
                                <h4 className='price'>{displayPrice}</h4>
                            </div>
                            <div className='rating-cont'>
                                <StarRatingComponent
                                    name='productStarRating'
                                    value={average_rating}
                                    editing={false}
                                />
                            </div>
                            <div className='desc'>{description}</div>
                        </div>
                        <div className='product-order'>
                            <div className='quantity-cont'>
                                {type.id === 1 ? (
                                    <div className='quantity'>
                                        <h5 className='title'>Quantity</h5>
                                        <div className='counter-cont'>
                                            <MinusOutlined
                                                className='minus-btn'
                                                onClick={this.onMinus}
                                            />
                                            <span className='order-quantity'>
                                                {quantity}
                                            </span>
                                            <PlusOutlined
                                                className='plus-btn'
                                                onClick={this.onAdd}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <InputNumber
                                        onChange={this.onQuantityChange}
                                        defaultValue='1'
                                        type='number'
                                        size='large'
                                        min={1}
                                        max={9999}
                                        value={quantity}
                                        placeholder='Input ML'
                                    ></InputNumber>
                                )}

                                <div className='subtotal-cont'>
                                    <p>
                                        Subtotal: P
                                        <span>
                                            {parseFloat(total).toFixed(
                                                amountPrecision
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className='order-button-cont'>
                                <div className='buy-now-btn'>
                                    <Button type='success' size='large'>
                                        Buy Now
                                    </Button>
                                </div>

                                <AddCart
                                    id={id}
                                    type={type}
                                    qty={quantity}
                                    className='add-cart-btn'
                                >
                                    <Button type='primary' id={id} size='large'>
                                        Add to Cart
                                    </Button>
                                </AddCart>
                            </div>
                        </div>
                        <div className='more-products'>
                            <p>More from {brand?.name}</p>
                            <div className='more-product-cont'>
                                {suggestions.map((product, i) => (
                                    <Product
                                        key={i}
                                        products={product}
                                    ></Product>
                                ))}
                            </div>
                        </div>
                        <div className='reviews-cont'>
                            {!this.state.review ? (
                                <div className='main-review'>
                                    <div className='review-title'>
                                        <h4 className='title'>Reviews</h4>
                                        <p
                                            className='write-btn'
                                            onClick={this.showReview}
                                        >
                                            Write a Review
                                        </p>
                                    </div>
                                    {reviews.length === 0 ? (
                                        ''
                                    ) : (
                                        <div className='review-lists'>
                                            {reviews.map((review, i) => (
                                                <div key={i} className='review'>
                                                    <h4 className='name'>
                                                        {review.name}
                                                    </h4>
                                                    <StarRatingComponent
                                                        name={i + review.name}
                                                        value={review.rating}
                                                        editing={false}
                                                    />
                                                    <p className='para'>
                                                        {review.message}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className='write-review'>
                                    <div className='review-title'>
                                        <h4 className='title'>
                                            Rate this Product
                                        </h4>
                                        <p
                                            className='write-btn'
                                            onClick={this.showReview}
                                        >
                                            Cancel
                                        </p>
                                    </div>
                                    <div className='review-form'>
                                        <ReviewForm product={id}></ReviewForm>
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

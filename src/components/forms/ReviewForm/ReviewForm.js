import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Form, Input, Button, Spin, Modal } from 'antd';
const { TextArea } = Input;
import PostReviewRequest from '~/services/Products/PostReviewRequest';
import ProductService from '~/services/Product';

class ReviewForm extends Component {
    state = {
        rating: 0,
        isSubmitting: false,
        apiMessage: false,
        visible: false,
    };

    onFinish = async (values) => {
        const request = new PostReviewRequest({
            ratings: this.state.rating,
            message: values.review,
        });

        this.setState({ isSubmitting: true });
        try {
            console.log(this.props);
            const apiMessage = await ProductService.postReview(
                this.props.product.id,
                request
            );
            this.setState({
                rating: 0,
                apiMessage,
                visible: true,
            });
        } catch (e) {
            this.setState({
                apiMessage: false,
                visible: true,
            });
        }
        this.setState({ isSubmitting: false });
    };

    onRatingChange = (nextValue, prevValue, name) => {
        this.setState({ rating: nextValue });
    };

    handleOk = () => {
        this.setState({ visible: false });
    };

    render() {
        const { rating } = this.state;
        return (
            <>
                {this.state.apiMessage ? (
                    <Modal
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        className='byob-popup'
                        closable={false}
                        footer={null}
                    >
                        <h1 className='title'>
                            {this.state.apiMessage ? 'success' : 'error'}
                        </h1>
                        <p>{this.state.apiMessage ?? 'Please try again'}</p>

                        <Button type='primary' onClick={this.handleOk}>
                            Okay
                        </Button>
                    </Modal>
                ) : (
                    ''
                )}

                <Form onFinish={this.onFinish} className='review-form'>
                    <Spin spinning={this.state.isSubmitting}>
                        <StarRatingComponent
                            name='rate1'
                            starCount={5}
                            value={rating}
                            onStarClick={this.onRatingChange}
                        />
                        <Form.Item
                            name='review'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your review!',
                                },
                            ]}
                        >
                            <TextArea
                                name='review'
                                placeholder='Write a review'
                                autoSize={{ minRows: 10, maxRows: 14 }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='submit-btn'
                            >
                                SEND
                            </Button>
                        </Form.Item>
                    </Spin>
                </Form>
            </>
        );
    }
}

export default ReviewForm;

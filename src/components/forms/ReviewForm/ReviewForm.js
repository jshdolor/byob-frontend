import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;

class ReviewForm extends Component {
  state = { rating: 0 };

  onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  onRatingChange = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue });
  };

  render() {
    const { rating } = this.state;
    return (
      <Form onFinish={this.onFinish}>
        <StarRatingComponent name='rate1' starCount={5} value={rating} onStarClick={this.onRatingChange} />
        <Form.Item name='review' rules={[{ required: true, message: 'Please input your review!' }]}>
          <TextArea name='review' placeholder='Write a review' autoSize={{ minRows: 10, maxRows: 14 }} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='submit-btn'>
            SEND
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ReviewForm;

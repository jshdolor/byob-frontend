import React, { Component } from 'react';
import Slider from 'react-slick';
import { Row, Col } from 'antd';
import { Container } from 'react-bootstrap';
import Product from '~/components/products/Product';

class HomeTPL extends Component {
  state = {};
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    var productSettings = {
      dots: false,
      infinite: false,
      arrows: false,
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1.5,
          },
        },
      ],
    };

    var products = [
      { name: 'test 1', price: 'P20', image: 'https://via.placeholder.com/500' },
      { name: 'test 2', price: 'P30', image: 'https://via.placeholder.com/500' },
      { name: 'test 3', price: 'P40', image: 'https://via.placeholder.com/500' },
      { name: 'test 4', price: 'P50', image: 'https://via.placeholder.com/500' },
    ];
    return (
      <div className='home-container'>
        <div className='home-slider'>
          <Slider {...settings}>
            <div className='slide'>
              <img className='-desktop' src='/images/carousel.png' alt='' />
              <img className='-mobile' src='/images/carousel_mobile.png' alt='' />
            </div>
            <div className='slide'>
              <img className='-desktop' src='/images/carousel.png' alt='' />
              <img className='-mobile' src='/images/carousel_mobile.png' alt='' />
            </div>
            <div className='slide'>
              <img className='-desktop' src='/images/carousel.png' alt='' />
              <img className='-mobile' src='/images/carousel_mobile.png' alt='' />
            </div>
          </Slider>
        </div>
        <Row>
          <Col sm={24} lg={12} className='two-cols'>
            <div className='one-bg'></div>
          </Col>
          <Col sm={24} lg={12} className='two-cols'>
            <div className='two-bg'></div>
          </Col>
        </Row>
        <Container>
          <div className='featured-products'>
            <h1 className='byob-title'>Featured Products</h1>
            <div className='product-list'>
              <Slider {...productSettings}>
                {products.map((product) => (
                  <Product products={product}></Product>
                ))}
              </Slider>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default HomeTPL;

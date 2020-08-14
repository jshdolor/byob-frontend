import React, { Component } from 'react';
import Slider from 'react-slick';
import { Row, Col } from 'antd';
import { Container } from 'react-bootstrap';
import Product from '~/components/products/Product';
import ProductService from '~/services/Product';

class HomeTPL extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    (async () => {
      const products = await ProductService.getFeatured();
      this.setState({ products });
    })();
  }

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
      autoplay: true,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

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
                {this.state.products.map((product, i) => (
                  <Product key={i} products={product}></Product>
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

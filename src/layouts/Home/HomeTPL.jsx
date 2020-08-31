import React, { Component } from 'react';
import Slider from 'react-slick';
import { Row, Col, Button } from 'antd';
import { Container } from 'react-bootstrap';
import Product from '~/components/products/Product';
import ProductService from '~/services/Product';
import CarouselService from '~/services/CarouselService';
import Link from 'next/link';

class HomeTPL extends Component {
    state = {
        products: [],
        carousel: [],
    };

    componentDidMount() {
        (async () => {
            const products = await ProductService.getFeatured();
            const carousel = await CarouselService.getAll();
            this.setState({ products, carousel });
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
                        {this.state.carousel.map((slide) => (
                            <div className='slide' key={slide.id}>
                                <Link
                                    href={slide.redirect_link}
                                    passHref={true}
                                    prefetch={false}
                                >
                                    <a>
                                        <img
                                            className='-desktop'
                                            src={slide.url}
                                            alt=''
                                        />
                                        <img
                                            className='-mobile'
                                            src={slide.url}
                                            alt=''
                                        />
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
                <h1 className='collect-title'>How Click & Collect Works</h1>
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
                                    <Product
                                        key={i}
                                        products={product}
                                    ></Product>
                                ))}
                            </Slider>
                        </div>
                        <div className='button-cont'>
                            <Link href='/products'>
                                <Button className='shop-btn'>SHOP NOW</Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default HomeTPL;

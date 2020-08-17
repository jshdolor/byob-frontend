import { Row, Col, Image } from 'react-bootstrap';

const bannerImg = '/images/products_banner.png';

const Banner = () => (
  <>
    <Row>
      <Col className='byob-title mb-3 text-primary text-uppercase'>Products</Col>
    </Row>
    <Row>
      <Col>
        <Image src={bannerImg} fluid></Image>
      </Col>
    </Row>
  </>
);

export default Banner;

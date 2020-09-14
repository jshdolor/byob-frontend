import Head from 'next/head';
import AboutUsService from '~/services/AboutUsService';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Blog from '~/components/blog/Blog';
import SocialServices from '~/services/SocialService';
import { Row, Col } from 'antd';

export default function AboutUs() {
  const [content, setContent] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await AboutUsService.getAll();
      setContent(data?.content);

      const relatedArticles = await SocialServices.getRelated(0);
      setArticles(relatedArticles);
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>BYOB | About Us</title>
      </Head>
      <Container
        className='about-cont'
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></Container>
      <Container>
        <div className='more-blogs'>
          <h1 className='title'>You Might Also Like</h1>
          <div className='more-blog-list'>
            <Row gutter={16}>
              {(articles || []).map((article, i) => (
                <Col xs={24} md={8}>
                  <Blog key={i} id={article.id} type={article.type} image={article.image} title={article.title} link={article.link}></Blog>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

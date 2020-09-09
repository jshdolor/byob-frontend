import Head from 'next/head';
import AboutUsService from '~/services/AboutUsService';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Blog from '~/components/blog/Blog';
import SocialServices from '~/services/SocialService';

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
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            ></Container>
            <Container>
                <Row className='more-blog-list mt-5'>
                    {(articles || []).map((article, i) => (
                        <Col key={i}>
                            <Blog
                                id={article.id}
                                type={article.type}
                                image={article.image}
                                title={article.title}
                                link={article.link}
                            ></Blog>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

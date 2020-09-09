import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Blog from '../../components/blog/Blog';
import { useEffect, useState } from 'react';
import SocialServices from '../../services/SocialService';
import { useRouter } from 'next/router';

const BlogArticlePage = () => {
    const [data, setData] = useState({});
    const [articles, setArticles] = useState([]);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const id = router.query?.slug;

                const articleData = await SocialServices.articleById(id);
                setData(articleData);
                const relatedArticles = await SocialServices.getRelated(id);
                setArticles(relatedArticles);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [router.query.slug]);

    return (
        <>
            <Container>
                <div className='single-blogs-cont'>
                    <h1 className='title'>{data.title}</h1>
                    <p className='date'>{data.publishedAt}</p>

                    <div className='image-cont'>
                        <img src={data.image} alt='' />
                        {/* <p className='desc'>Test</p> */}
                    </div>

                    <div
                        className='body'
                        dangerouslySetInnerHTML={{
                            __html: data.content,
                        }}
                    ></div>

                    <div className='more-blogs'>
                        <h1 className='title'>You Might Also Like</h1>
                        <div className='more-blog-list'>
                            {(articles || []).map((article, i) => (
                                <Blog
                                    key={i}
                                    id={article.id}
                                    type={article.type}
                                    image={article.image}
                                    title={article.title}
                                    link={article.link}
                                ></Blog>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default BlogArticlePage;

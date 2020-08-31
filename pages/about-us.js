import Head from 'next/head';
import AboutUsService from '~/services/AboutUsService';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function AboutUs() {
    const [content, setContent] = useState('');

    useEffect(() => {
        (async () => {
            const data = await AboutUsService.getAll();
            setContent(data?.content);
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
        </div>
    );
}

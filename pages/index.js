import Head from 'next/head';
import AppLayout from '~/layouts/App';
import { Container } from 'react-bootstrap';

export default function HomePage() {
    return (
        <AppLayout>
            <Head>
                <title>BYOB | Home</title>
            </Head>
            <Container></Container>
        </AppLayout>
    );
}

import Head from 'next/head';
import { Container } from 'react-bootstrap';
import HowToOrderTPL from '../src/layouts/HowToOrder/HowToOrderTPL';

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>BYOB | How to Order</title>
            </Head>
            <HowToOrderTPL></HowToOrderTPL>
        </div>
    );
}

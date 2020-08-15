import Head from 'next/head';
import { Container } from 'react-bootstrap';
import HowToOrderTPL from '../src/layouts/HowToOrder/HowToOrderTPL';
import Cart from '~/components/cart';
import CheckoutTPL from '../src/layouts/Checkout/CheckoutTPL';

export default function CheckoutPage() {
    return (
        <div>
            <Head>
                <title>BYOB | Checkout</title>
            </Head>
            <CheckoutTPL />
        </div>
    );
}

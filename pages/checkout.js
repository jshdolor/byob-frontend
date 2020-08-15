import Head from 'next/head';
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

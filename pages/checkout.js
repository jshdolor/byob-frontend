import Head from 'next/head';
import CheckoutTPL from '../src/layouts/Checkout/CheckoutTPL';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from '../src/store/session/actions';
import authCheck from '../src/middleware/auth';

export default function CheckoutPage(props) {
    // const { user = {} } = props;
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(setUser(user));
    // }, []);
    return (
        <div>
            <Head>
                <title>BYOB | Checkout</title>
            </Head>
            <CheckoutTPL />
        </div>
    );
}

// CheckoutPage.getInitialProps = async (ctx) => {
//     const user = await authCheck(ctx, false);
//     console.log(user);
//     return { user };
// };

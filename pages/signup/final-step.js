import Head from 'next/head';
import { Container } from 'react-bootstrap';
import Signup2TPL from '../../src/layouts/Signup/Signup2TPL';
import CookieManager from '~/lib/CookieManager';

const Signup2 = (props) => {
    console.log('props', props);
    return (
        <div>
            <Head>
                <title>BYOB | Sign Up</title>
            </Head>
            <Signup2TPL {...props}></Signup2TPL>
        </div>
    );
};

export const getServerSideProps = (ctx) => {
    const token = CookieManager.setContext(ctx).get('regtoken');
    return { props: { token } };
};

export default Signup2;

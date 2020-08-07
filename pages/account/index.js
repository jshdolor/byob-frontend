import Head from 'next/head';
import AccountLayout from '~/layouts/Account';

const Account = (props) => {
    console.log(props);

    return (
        <AccountLayout>
            <Head>
                <title>BYOB | Account </title>
            </Head>
        </AccountLayout>
    );
};

export const getServerSideProps = async (ctx) => {
    // Must validate JWT
    // If the JWT is invalid it must redirect
    // back to the main page. You can do that
    // with Router from 'next/router
    console.log(ctx);

    // Must return an object
    return { props: { acct: 1 } };
};
export default Account;

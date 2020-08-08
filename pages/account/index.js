import Head from 'next/head';
import AccountLayout from '~/layouts/Account';
import authCheck from '~/middleware/auth';

const Account = (props) => {
    return (
        <AccountLayout>
            <Head>
                <title>BYOB | Account </title>
            </Head>
        </AccountLayout>
    );
};

Account.getInitialProps = async (ctx) => {
    await authCheck(ctx);
    return {};
};

export default Account;

import Head from 'next/head';
import AccountLayout from '~/layouts/Account';
import authCheck from '~/middleware/auth';
import MyAccountTPL from '../../src/layouts/MyAccount/MyAccountTPL';

const Account = (props) => {
    return (
        <div className='my-account-container'>
            <AccountLayout>
                <Head>
                    <title>BYOB | My Account </title>
                </Head>
                <MyAccountTPL></MyAccountTPL>
            </AccountLayout>
        </div>
    );
};

Account.getInitialProps = async (ctx) => {
    const data = await authCheck(ctx);
    return {};
};

export default Account;

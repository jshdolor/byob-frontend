import Head from 'next/head';
import AccountLayout from '~/layouts/Account';
import ProfileService from '~/services/ProfileService';

const Account = (props) => {
    return (
        <AccountLayout>
            <Head>
                <title>BYOB | Account </title>
            </Head>
        </AccountLayout>
    );
};

export const getServerSideProps = async (ctx) => {
    let data = {};
    try {
        data = await ProfileService.get(ctx);
    } catch (e) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', `/login`);
    }

    return { props: data.toJSON() };
};

export default Account;

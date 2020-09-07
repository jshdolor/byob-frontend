import Head from 'next/head';
import HomeTPL from '../src/layouts/Home/HomeTPL';

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>BYOB | Click & Collect</title>
            </Head>
            <HomeTPL></HomeTPL>
        </div>
    );
}

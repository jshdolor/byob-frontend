import Head from 'next/head';
import HomeTPL from '../src/layouts/Home/HomeTPL';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>BYOB | Home</title>
      </Head>
      <HomeTPL></HomeTPL>
    </div>
  );
}

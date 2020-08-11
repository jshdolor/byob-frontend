import Head from 'next/head';

import UpdatePasswordTPL from '../src/layouts/UpdatePassword/UpdatePasswordTPL';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>BYOB | Update Password</title>
      </Head>

      <UpdatePasswordTPL />
    </div>
  );
}

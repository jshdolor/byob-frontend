import Head from 'next/head';
import SignupTPL from '~/layouts/Signup/SignupTPL';

export default function Signup() {
  return (
    <div>
      <Head>
        <title>BYOB | Sign Up</title>
      </Head>
      <SignupTPL></SignupTPL>
    </div>
  );
}

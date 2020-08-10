import Head from 'next/head';
import { Container } from 'react-bootstrap';
import SignupTPL from '../../src/layouts/Signup/SignupTPL';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>BYOB | Home</title>
      </Head>
      <SignupTPL></SignupTPL>
    </div>
  );
}

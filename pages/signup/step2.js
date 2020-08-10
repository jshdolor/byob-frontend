import Head from 'next/head';
import { Container } from 'react-bootstrap';
import Signup2TPL from '../../src/layouts/Signup/Signup2TPL';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>BYOB | Home</title>
      </Head>
      <Signup2TPL></Signup2TPL>
    </div>
  );
}

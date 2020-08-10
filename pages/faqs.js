import Head from 'next/head';
import { Container } from 'react-bootstrap';
import FaqsTPL from '../src/layouts/Faqs/FaqsTPL';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>BYOB | FAQS</title>
      </Head>
      <FaqsTPL></FaqsTPL>
    </div>
  );
}

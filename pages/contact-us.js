import Head from 'next/head';
import { Container } from 'react-bootstrap';
import ContactUsTPL from '../src/layouts/ContactUs/ContactUsTPL';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>BYOB | Contact Us</title>
      </Head>
      <ContactUsTPL></ContactUsTPL>
    </div>
  );
}

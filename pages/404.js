import Head from 'next/head';
import { Container } from 'react-bootstrap';

export default function Custom404() {
  return (
    <div>
      <Head>
        <title>BYOB | 404</title>
      </Head>
      <div className='oops-body'>
        <img className='error-one' src='images/error.png' alt='' />
        <img className='error-two' src='images/error.png' alt='' />
        <div className='oops-cont'>
          <h1>Oops..</h1>
          <p>The page could not be found</p>
        </div>
      </div>
    </div>
  );
}

import Head from 'next/head';
import SingleProductTPL from '../../src/layouts/Products/SingleProductTPL';

export default function SingleProductPage({ slug }) {
  return (
    <>
      <Head>
        <title>BYOB | Products</title>
      </Head>
      <SingleProductTPL slug={slug}></SingleProductTPL>
    </>
  );
}

SingleProductPage.getInitialProps = async (ctx) => {
  const slug = ctx.query.slug;

  return slug;
};

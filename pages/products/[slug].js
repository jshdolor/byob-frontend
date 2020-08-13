import Head from 'next/head';
import SingleProductTPL from '../../src/layouts/Products/SingleProductTPL';
import ProductService from '~/services/Product';
export default function SingleProductPage(props) {
    return (
        <>
            <Head>
                <title>BYOB | Products</title>
            </Head>
            <SingleProductTPL {...props}></SingleProductTPL>
        </>
    );
}

SingleProductPage.getInitialProps = async (ctx) => {
    const slug = ctx.query.slug;
    const product = await ProductService.getById(slug, false);
    const suggestions = await ProductService.getSuggestions(slug);
    const reviews = await ProductService.getReviews(slug);

    return { product, suggestions, reviews };
};

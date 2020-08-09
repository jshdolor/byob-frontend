import '../scss/app.scss';
import React from 'react';
import { Provider } from 'react-redux';
import store from '~/store';
import Layout from '~/layouts/App';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ProductsService from '~/services/Product';

const App = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
};

App.getInitialProps = async () => {
    const products = await ProductsService.getAll();
    return {
        products,
    };
};

export default App;

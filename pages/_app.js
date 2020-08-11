import '../scss/app.scss';
import React from 'react';
import { Provider } from 'react-redux';
import store from '~/store';
import Layout from '~/layouts/App';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Loader from '~/components/loader';

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Loader></Loader>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;

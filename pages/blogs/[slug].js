import React, { Component } from 'react';
import Head from 'next/head';
import SingleTPL from '../../src/layouts/Blogs/SingleTPL';

class SingleArticle extends Component {
  state = {};
  render() {
    return (
      <>
        <Head>
          <title>BYOB | Blogs</title>
        </Head>
        <SingleTPL></SingleTPL>
      </>
    );
  }
}

export default SingleArticle;

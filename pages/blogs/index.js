import React, { Component } from 'react';
import Head from 'next/head';
import BlogsTPL from '../../src/layouts/Blogs/BlogsTPL';

class BlogsPage extends Component {
    state = {};
    render() {
        return (
            <>
                <Head>
                    <title>BYOB | Blogs</title>
                </Head>
                <BlogsTPL></BlogsTPL>
            </>
        );
    }
}

export default BlogsPage;

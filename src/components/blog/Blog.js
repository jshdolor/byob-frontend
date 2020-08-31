import React, { Component } from 'react';
import Link from 'next/link';

class Blog extends Component {
    state = {};
    render() {
        const { id, image, title, link, type, video, onClick } = this.props;

        return (
            <div className='blog' onClick={onClick}>
                {type === 'video' ? (
                    <div className='video'>
                        <div
                            className='blog-image'
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                        <h4 className='title'>{title}</h4>
                    </div>
                ) : (
                    ''
                )}

                {type === 'external-link' ? (
                    <a href={link} target='_blank'>
                        <div
                            className='blog-image'
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                        <h4 className='title'>{title}</h4>
                    </a>
                ) : (
                    ''
                )}

                {type === 'article' ? (
                    <Link href={`/blogs/[slug]`} as={link}>
                        <a>
                            <div
                                className='blog-image'
                                style={{ backgroundImage: `url(${image})` }}
                            ></div>
                            <h4 className='title'>{title}</h4>
                        </a>
                    </Link>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

export default Blog;

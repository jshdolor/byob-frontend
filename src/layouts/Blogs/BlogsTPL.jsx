import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import Blog from '../../components/blog/Blog';
import ModalVideo from 'react-modal-video';
import SocialService from '~/services/SocialService';

class BlogsTPL extends Component {
    state = {
        video: '',
        open: false,
        blogs: [],
    };

    componentDidMount() {
        (async () => {
            const videos = await SocialService.videos();
            const links = await SocialService.links();
            const articles = await SocialService.articles();
            console.log(articles);
            this.setState({ blogs: [...videos, ...links, ...articles] });
        })();
    }

    onOpen = (video) => {
        this.setState({ video }, this.openModal);
    };

    openModal = () => {
        this.setState({ open: true });
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open, video } = this.state;

        let { blogs } = this.state;

        return (
            <>
                <ModalVideo
                    channel='youtube'
                    isOpen={open}
                    videoId={video}
                    onClose={this.closeModal}
                />
                <div className='blog-banner'></div>
                <Container>
                    <div className='blogs-cont'>
                        <h1 className='title'>BLOGS</h1>
                        <div className='blog-list'>
                            {blogs.map((blog, i) =>
                                blog.type === 'video' ? (
                                    <Blog
                                        key={i}
                                        type={blog.type}
                                        image={blog.image}
                                        title={blog.title}
                                        onClick={() => this.onOpen(blog.video)}
                                    ></Blog>
                                ) : (
                                    <Blog
                                        key={i}
                                        type={blog.type}
                                        image={blog.image}
                                        title={blog.title}
                                        link={blog.link}
                                    ></Blog>
                                )
                            )}
                        </div>
                    </div>
                </Container>
            </>
        );
    }
}

export default BlogsTPL;

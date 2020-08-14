import React, { Component } from 'react';
import Link from 'next/link';

class Blog extends Component {
  state = {};
  render() {
    const { image, title, link, type, video, onClick } = this.props;

    return (
      <div className='blog' onClick={onClick}>
        {type === 'video' ? (
          <div className='video'>
            <div className='blog-image' style={{ backgroundImage: `url(${image})` }}></div>
            <h4 className='title'>{title}</h4>
          </div>
        ) : (
          <a href={link}>
            <div className='blog-image' style={{ backgroundImage: `url(${image})` }}></div>
            <h4 className='title'>{title}</h4>
          </a>
        )}
      </div>
    );
  }
}

export default Blog;

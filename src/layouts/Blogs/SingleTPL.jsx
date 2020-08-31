import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Blog from '../../components/blog/Blog';

class SingleTPL extends Component {
  state = {};
  render() {
    return (
      <>
        <Container>
          <div className='single-blogs-cont'>
            <h1 className='title'>TITLE</h1>
            <p className='date'>September 1</p>

            <div className='image-cont'>
              <img src='https://via.placeholder.com/800x400' alt='' />
              <p className='desc'>Test</p>
            </div>

            <div className='body'>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores sequi est facilis odit dignissimos provident quis labore inventore. Maxime minus quis rerum dignissimos ut modi!
                Possimus doloribus maiores ad consectetur.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse at inventore libero labore cumque corrupti, sunt, quasi ducimus, ut ipsam reprehenderit nostrum doloribus vel sit eius
                qui recusandae incidunt. Nulla!
              </p>
            </div>

            <div className='more-blogs'>
              <h1 className='title'>You Might Also Like</h1>
              <div className='more-blog-list'>
                <Blog type='post' image='https://via.placeholder.com/400x400' title='Test' link='#'></Blog>
                <Blog type='post' image='https://via.placeholder.com/400x400' title='Test' link='#'></Blog>
                <Blog type='post' image='https://via.placeholder.com/400x400' title='Test' link='#'></Blog>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

export default SingleTPL;

import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

class FaqsTPL extends Component {
  state = {};
  render() {
    return (
      <div className='faqs-container'>
        <Container>
          <h4 className='faqs-title'>Frequently Asked Questions</h4>
          <div className='accordion-cont'>
            <Collapse expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
              <Panel header='Faqs 1' key='1'>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas nihil aliquam architecto, totam nobis, cumque ducimus tempora vitae sit sed asperiores labore pariatur officia harum
                  eveniet accusantium! Commodi, dolores? Repellat.
                </p>
              </Panel>
              <Panel header='Faqs 2' key='2'>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas nihil aliquam architecto, totam nobis, cumque ducimus tempora vitae sit sed asperiores labore pariatur officia harum
                  eveniet accusantium! Commodi, dolores? Repellat.
                </p>
              </Panel>
              <Panel header='Faqs 3' key='3'>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas nihil aliquam architecto, totam nobis, cumque ducimus tempora vitae sit sed asperiores labore pariatur officia harum
                  eveniet accusantium! Commodi, dolores? Repellat.
                </p>
              </Panel>
            </Collapse>
          </div>
          <p>
            Can't find what you're looking for?
            <a href='#' className='contact-btn'>
              Contact Us
            </a>
          </p>
        </Container>
      </div>
    );
  }
}

export default FaqsTPL;

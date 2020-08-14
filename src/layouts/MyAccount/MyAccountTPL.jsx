import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import EditProfileForm from '../../components/forms/EditProfileForm/EditProfileForm';

class MyAccountTPL extends Component {
  state = { edit: false };

  showEdit = () => {
    this.setState({
      edit: !this.state.edit,
    });
  };

  render() {
    return (
      <div className='my-account-cont'>
        <h2 className='account-title'>My Account</h2>
        <div className='account-sub'>
          <p>Personal Profile</p>
          <Button type='link' className='edit-btn account-btn' onClick={this.showEdit}>
            Edit
          </Button>
        </div>
        <div className='account-details'>
          <ul>
            <li className='details'>John Doe</li>
            <li className='details'>email@domain.com</li>
            <li className='details'>09175141703</li>
            <li className='details'>123, Street, Village, Barangay, City</li>
          </ul>
        </div>
        <div className='account-options'>
          {!this.state.edit ? (
            <div className='account-sub'>
              <p>Account Options</p>
              <Button type='link' className='account-btn'>
                Update Password
              </Button>
              <Button type='link' className='account-btn'>
                Delete Account
              </Button>
            </div>
          ) : (
            <>
              <EditProfileForm></EditProfileForm>
              <Button type='link' className='account-btn cancel-btn' onClick={this.showEdit}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default MyAccountTPL;

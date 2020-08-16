import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Button, Modal, Checkbox, Input } from 'antd';
import EditProfileForm from '../../components/forms/EditProfileForm/EditProfileForm';

class MyAccountTPL extends Component {
    constructor(props) {
        super();
        this.state = {
            edit: false,
            visible: false,
            delete: false,
            terms: false,
            others: false,
            profile: props.data,
        };
    }

    showEdit = () => {
        this.setState({
            edit: !this.state.edit,
        });
    };

    showDelete = () => {
        this.setState({
            delete: !this.state.delete,
        });
    };

    updatePassword = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            visible: false,
        });
    };

    onChange = (e) => {
        this.setState({
            others: !this.state.others,
        });
    };

    onTerms = (e) => {
        this.setState({
            terms: !this.state.terms,
        });
    };

    setProfile = (profile) => {
        this.setState({ profile });
    };

    render() {
        const {
            name,
            email,
            mobileNumber,
            address1,
            address2,
        } = this.state.profile;

        const options = [
            { label: 'Pick up locations are too far away', value: 'far' },
            { label: 'I did not get my order on time', value: 'time' },
            { label: 'Unavailability of product/s I want', value: 'want' },
            { label: 'Its hard to buy from the website', value: 'hard' },
            { label: 'I prefer cash payment', value: 'cash' },
        ];

        return (
            <>
                <Modal
                    visible={this.state.delete}
                    onOk={this.handleOk}
                    className='byob-popup delete-account'
                    footer={null}
                    closable={false}
                >
                    <div className='close-modal' onClick={this.showDelete}>
                        <svg
                            viewBox='64 64 896 896'
                            focusable='false'
                            class=''
                            data-icon='close'
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            aria-hidden='true'
                        >
                            <path d='M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z'></path>
                        </svg>
                    </div>
                    <h1 className='title'>Delete your account</h1>
                    <div className='delete-form'>
                        <h4 className='delete-title'>Help Us Improve</h4>
                        <p>Why would you like to delete your account?</p>
                        <p className='italic'>Choose at least one</p>
                        <div className='checkbox-cont'>
                            <Checkbox.Group options={options} />
                            <Checkbox
                                onChange={this.onChange}
                                className='other-check'
                            >
                                Others (Please Specify)
                            </Checkbox>
                            <Input
                                placeholder='Others'
                                className='other-input'
                                disabled={!this.state.others}
                            />
                        </div>
                    </div>
                    <div className='content-cont'>
                        <div className='content'>
                            <h4 className='content-title'>
                                What you must know once your account is deleted:
                            </h4>
                            <p>
                                You will no longer be able to access your order
                                details/history.
                            </p>
                            <p>
                                Your deleted account cannot be retrieved in
                                future. Hence, you have to sign up again if you
                                wish to apply for a new account
                            </p>
                            <p>
                                There are exclusive promos that can only be
                                availed by account users.
                            </p>
                        </div>
                    </div>

                    <Checkbox onChange={this.onTerms} className='terms-check'>
                        I understand the consequences of deleting my account
                    </Checkbox>

                    <Button
                        type='primary'
                        onClick={this.handleOk}
                        disabled={!this.state.terms}
                    >
                        Delete Account
                    </Button>
                </Modal>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    className='byob-popup change-password'
                    closable={false}
                    footer={null}
                >
                    <h1 className='title'>CHANGE PASSWORD REQUEST</h1>
                    <p>
                        Instructions have been sent to your email. If you have
                        not recieved an email within 5 minutes, please try
                        again.
                    </p>

                    <Button type='primary' onClick={this.handleOk}>
                        Okay
                    </Button>
                </Modal>
                <div className='my-account-cont'>
                    <h2 className='account-title'>My Account</h2>
                    <div className='account-sub'>
                        <p>Personal Profile</p>
                        <Button
                            type='link'
                            className='edit-btn account-btn'
                            onClick={this.showEdit}
                        >
                            Edit
                        </Button>
                    </div>
                    <div className='account-details'>
                        <ul>
                            <li className='details'>{name}</li>
                            <li className='details'>{email}</li>
                            <li className='details'>{mobileNumber}</li>
                            <li className='details'>{address1}</li>
                            <li className='details'>{address2}</li>
                        </ul>
                    </div>
                    <div className='account-options'>
                        {!this.state.edit ? (
                            <div className='account-sub'>
                                <p>Account Options</p>
                                <Button
                                    type='link'
                                    className='account-btn'
                                    onClick={this.updatePassword}
                                >
                                    Update Password
                                </Button>
                                <Button
                                    type='link'
                                    className='account-btn'
                                    onClick={this.showDelete}
                                >
                                    Delete Account
                                </Button>
                            </div>
                        ) : (
                            <>
                                <EditProfileForm
                                    data={this.state.profile}
                                    handle={this.setProfile}
                                ></EditProfileForm>
                                <Button
                                    type='link'
                                    className='account-btn cancel-btn'
                                    onClick={this.showEdit}
                                >
                                    Cancel
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default MyAccountTPL;

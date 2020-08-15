import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { editForm } from '../../../store/checkout/actions';

const CFCheckoutInformation = () => {
    const { email = '', claimingMethod = 'locker' } = useSelector(
        (state) => state.checkout.formValues,
    );
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(editForm());
    };
    return (
        <ul className="checkout-information">
            <li className="information-item">
                <Row>
                    <Col span={7}>Contact</Col>
                    <Col>{email}</Col>
                    <a
                        className="change-link"
                        href={'#'}
                        onClick={handleClick}
                        style={{ marginLeft: 'auto' }}
                    >
                        Change
                    </a>
                </Row>
            </li>
            <li className="information-item">
                <Row>
                    <Col span={7}>Pickup Method</Col>
                    <Col>{claimingMethod}</Col>
                </Row>
            </li>
            <li className="information-item">
                <Row>
                    <Col span={7}>Contact</Col>
                    <Col>{email}</Col>
                </Row>
            </li>
        </ul>
    );
};

export default CFCheckoutInformation;

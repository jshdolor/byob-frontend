import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { editForm } from '../../../store/checkout/actions';
import { CLAIMING_METHOD } from '../../../config/checkout';

const CFCheckoutInformation = () => {
    const {
        email = '',
        claimingMethod = CLAIMING_METHOD.LOCKER,
        lockerDate,
        lockerTimeText,
    } = useSelector((state) => state.checkout.formValues);
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
            {claimingMethod === CLAIMING_METHOD.LOCKER && (
                <li className="information-item">
                    <Row>
                        <Col span={7}>Date</Col>
                        <Col>
                            {lockerDate} --- {lockerTimeText}
                        </Col>
                    </Row>
                </li>
            )}
        </ul>
    );
};

export default CFCheckoutInformation;

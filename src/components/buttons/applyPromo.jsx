import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Spin, Input } from 'antd';
import PromoService from '~/services/Promo/PromoService';

import { useDispatch, useSelector } from 'react-redux';
import { setDiscount } from '~/store/checkout/actions';

const applyPromoBtn = ({ disabled }) => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.session);
    const { discount } = useSelector((state) => state.checkout);

    const [isApplyingPromo, setIsApplyingPromo] = useState(false);
    const [errors, setErrors] = useState([]);
    const [code, setCode] = useState('');

    const handleClick = async () => {
        setIsApplyingPromo(true);
        setErrors([]);
        try {
            const data = await PromoService.verify(code);
            data.code = code;
            dispatch(setDiscount({ ...data, code }));
        } catch (e) {
            if (e.getErrors) {
                const messages = e.getErrors();
                setErrors(messages);
            }
            dispatch(setDiscount({}));
        }
        setIsApplyingPromo(false);
    };

    const handleClear = () => {
        dispatch(setDiscount({}));
        setCode('');
    };

    return (
        <Spin spinning={isApplyingPromo}>
            <InputGroup className='voucher-input'>
                <FormControl
                    placeholder='Voucher Code'
                    aria-label='Voucher Code'
                    disabled={!isLoggedIn || discount.code}
                    aria-describedby='Voucher Code'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onFocus={(e) => setErrors([])}
                />

                {!discount.code && (
                    <InputGroup.Append>
                        <Button
                            onClick={handleClick}
                            variant='outline-secondary'
                        >
                            APPLY
                        </Button>
                    </InputGroup.Append>
                )}

                {discount.code && (
                    <InputGroup.Append>
                        <Button
                            onClick={handleClear}
                            variant='outline-secondary'
                        >
                            CLEAR
                        </Button>
                    </InputGroup.Append>
                )}

                {discount.code && (
                    <FormControl.Feedback type='valid' className='d-block'>
                        Code applied
                    </FormControl.Feedback>
                )}

                <FormControl.Feedback type='invalid' className='d-block'>
                    {errors.map((error, i) => (
                        <span key={i} className='text-danger'>
                            {error}
                        </span>
                    ))}
                </FormControl.Feedback>
            </InputGroup>
        </Spin>
    );
};

export default applyPromoBtn;

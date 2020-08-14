import * as yup from 'yup';
import {
    FIRST_NAME_REQUIRED,
    LAST_NAME_REQUIRED,
    EMAIL_VALID,
    EMAIL_REQUIRED,
    MOBILE_REQUIRED,
} from 'config/messages/errors';
import { CLAIMING_METHOD } from '../../../src/config/checkout';

const checkoutFormSchema = yup.object().shape({
    firstName: yup.string().required(FIRST_NAME_REQUIRED),
    lastName: yup.string().required(LAST_NAME_REQUIRED),
    email: yup.string().email(EMAIL_VALID).required(EMAIL_REQUIRED),
    mobileNumber: yup.string().required(MOBILE_REQUIRED),
    lockerDate: yup.string().when('claimingMethod', {
        is: CLAIMING_METHOD.LOCKER,
        then: yup.string().required('Must select Date'),
    }),
    lockerTime: yup.string().when('claimingMethod', {
        is: CLAIMING_METHOD.LOCKER,
        then: yup.string().required('Must select Time'),
    }),
});

export default checkoutFormSchema;

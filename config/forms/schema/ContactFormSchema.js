import * as yup from 'yup';
import {
    NAME_REQUIRED,
    EMAIL_VALID,
    EMAIL_REQUIRED,
    MESSAGE_REQUIRED,
    MOBILE_REQUIRED,
    MOBILE_FORMAT,
} from 'config/messages/errors';
import { MOBILE_NUMBER } from '../regex';

const ContactFormSchema = yup.object().shape({
    name: yup.string().required(NAME_REQUIRED),
    email: yup.string().email(EMAIL_VALID).required(EMAIL_REQUIRED),
    message: yup.string().required(MESSAGE_REQUIRED),
    mobileNumber: yup
        .string()
        .matches(MOBILE_NUMBER, MOBILE_FORMAT)
        .required(MOBILE_REQUIRED),
});

export default ContactFormSchema;

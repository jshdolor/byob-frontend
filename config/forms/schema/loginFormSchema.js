import * as yup from 'yup';
import {
    EMAIL_VALID,
    EMAIL_REQUIRED,
    PASSWORD_REQUIRED,
} from 'config/messages/errors';

const loginFormSchema = yup.object().shape({
    password: yup.string().required(PASSWORD_REQUIRED),
    email: yup.string().email(EMAIL_VALID).required(EMAIL_REQUIRED),
});

export default loginFormSchema;

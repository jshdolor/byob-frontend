import * as yup from 'yup';
import {
    PASSWORD_ERROR_FORMAT,
    PASSWORD_REQUIRED,
    PASSWORD_CONFIRM_REQUIRED,
    PASSWORD_CONFIRM_MATCH,
    PASSWORD_MAX_CHARS,
} from 'config/messages/errors';

import { PASSWORD_FORMAT, MOBILE_NUMBER } from '../regex';

yup.addMethod(yup.string, 'isEqualToInput', function (comparableName, message) {
    return this.test('is-equal', message, function (value) {
        const { parent } = this;
        return parent[comparableName] == value;
    });
});

const updatePassword = yup.object().shape({
    password: yup
        .string()
        .max(16, PASSWORD_MAX_CHARS)
        .test('is-password', PASSWORD_ERROR_FORMAT, (val) => {
            return PASSWORD_FORMAT.test(val);
        })
        .required(PASSWORD_REQUIRED),
    passwordConfirmation: yup
        .string()
        .isEqualToInput('password', PASSWORD_CONFIRM_MATCH)
        .required(PASSWORD_CONFIRM_REQUIRED),
});

export default updatePassword;

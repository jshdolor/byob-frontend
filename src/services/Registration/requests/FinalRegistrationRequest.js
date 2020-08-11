import FormData from '~/lib/FormData';

export default class FinalRegistrationRequest extends FormData {
    constructor(data = {}) {
        super();
        this._password = data.password;
        this._mobile_number = data.mobileNumber;
        this._password_confirmation = data.passwordConfirmation;
    }
}

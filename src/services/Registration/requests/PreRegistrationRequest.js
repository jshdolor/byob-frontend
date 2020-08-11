import FormData from '~/lib/FormData';

export default class PreRegistrationRequest extends FormData {
    constructor(data = {}) {
        super();
        this._firstname = data.firstName;
        this._lastname = data.lastName;
        this._email = data.email;
        this._address_line_1 = data.address1;
        this._address_line_2 = data.address2;
    }
}

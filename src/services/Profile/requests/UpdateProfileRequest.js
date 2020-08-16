import FormData from '~/lib/FormData';

export default class UpdateProfileRequest extends FormData {
    constructor(data) {
        super();
        this._firstname = data.firstName;
        this._lastname = data.lastName;
        this._mobile_number = data.mobileNumber;
        this._address_line_1 = data.address1;
        this._address_line_2 = data.address2;
    }
}

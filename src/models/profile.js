import BaseModel from '~/models/baseModel';

export default class Profile extends BaseModel {
    constructor(data) {
        super();
        this._firstName = data.firstname;
        this._lastName = data.lastname;
        this._mobileNumber = data.mobile_number;
        this._email = data.email;
        this._address1 = data.address_line_1;
        this._address2 = data.address_line_2;
        this._name = `${this._firstName} ${this._lastName}`;
    }

    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get mobileNumber() {
        return this._mobileNumber;
    }
    get email() {
        return this._email;
    }

    get address1() {
        return this._address1;
    }

    get address2() {
        return this._address2;
    }

    get name() {
        return this._name;
    }
}

import BaseModel from '~/models/baseModel';

export default class Profile extends BaseModel {
    constructor(data) {
        super();
        this._firstName = data.firstname;
        this._lastName = data.lastname;
        this._mobileNumber = data.mobile_number;
        this._email = data.email;
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
}

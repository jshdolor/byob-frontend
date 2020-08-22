import FormData from '~/lib/FormData';

export default class ContactUsRequest extends FormData {
    constructor(data = {}) {
        super();
        this._name = data.name;
        this._email = data.email;
        this._message = data.message;
    }
}

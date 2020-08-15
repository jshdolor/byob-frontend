import FormData from '~/lib/FormData';

export default class CheckoutRequest extends FormData {
    constructor(data = {}) {
        super();
        this._payment_gateway = data.payment_gateway;
        this._lastname = data.lastname;
        this._mobile_number = data.mobile_number;
        this._firstname = data.firstname;
        this._email = data.email;
        this._cart = data.cart;
    }
}

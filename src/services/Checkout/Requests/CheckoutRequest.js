import FormData from '~/lib/FormData';

export default class CheckoutRequest extends FormData {
    constructor(data = {}) {
        super();
        this._payment_gateway = data.payment_gateway;
        this._lastname = data.lastname;
        this._mobile_number = data.mobile_number;
        this._firstname = data.firstname;
        this._email = data.email;

        this._pickup_type = data.pickup_type;
        this._lockers = data.lockers;

        this._cart = data.cart.map((item) => {
            return { product_id: item.product_id, qty: item.qty };
        });
    }
}

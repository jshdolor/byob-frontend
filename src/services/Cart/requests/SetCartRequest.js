import FormData from '~/lib/FormData';

export default class SetCartRequest extends FormData {
    constructor(data = {}) {
        super();
        this._localCart = data;
    }

    get localCart() {
        return this._localCart;
    }

    getCart() {
        return {
            cart: this.localCart,
        };
    }
}

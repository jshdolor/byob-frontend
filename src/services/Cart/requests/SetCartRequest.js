import FormData from '~/lib/FormData';

export default class SetCartRequest extends FormData {
    constructor(data = {}) {
        super();
        this._localCart = data;
    }

    get localCart() {
        return this._localCart.map((cartItem) => {
            return {
                qty: cartItem.quantity,
                product_id: cartItem.id,
            };
        });
    }

    getCart() {
        return {
            cart: this.localCart,
        };
    }
}

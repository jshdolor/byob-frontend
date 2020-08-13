import FormData from '~/lib/FormData';

export default class UpdateCartRequest extends FormData {
    constructor(data = {}) {
        super();
        this._qty = data.qty;
        this._product_id = data.product_id;
    }

    get qty() {
        return this._qty;
    }

    get product_id() {
        return this._product_id;
    }
}

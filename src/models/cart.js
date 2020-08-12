import ProductService from '~/services/Product';

export default class CartItem {
    constructor(data, product) {
        this._product_id = data.product_id;
        this._qty = data.qty;
        this._product = product;
    }

    get product_id() {
        return this._product_id;
    }
    get qty() {
        return this._qty;
    }

    //
    get price() {
        return parseFloat(this._product?.price || 0).toFixed(2);
    }
    get image() {
        return this._product?._image;
    }

    get name() {
        return this._product?._name;
    }
    //

    get product() {
        return this._product;
    }

    set product(value) {
        return (this._product = value);
    }

    //custom fields
    get total() {
        return Math.ceil(this.qty * this.price).toFixed(2);
    }

    get displayPrice() {
        return `P${this.total}`;
    }

    getLocalData() {
        return {
            product_id: this.product_id,
            qty: this.qty,
        };
    }
}

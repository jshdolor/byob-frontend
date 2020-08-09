export default class CartItem {
    constructor(data) {
        this._id = data.product_id;
        this._quantity = data.quantity;

        //get from product
        this._product = {};
    }

    get id() {
        return this._id;
    }
    get quantity() {
        return this._quantity;
    }

    //
    get price() {
        return (this.product.price || 0).toFixed(2);
    }
    get image() {
        return this.product.image;
    }

    get name() {
        return this.product.name;
    }
    //
    set product(value) {
        return (this._product = value);
    }

    get total() {
        return Math.ceil(this.quantity * this.price).toFixed(2);
    }
}

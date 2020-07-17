export default class Cart {
    constructor(data) {
        this._id = data.id;
        this._price = data.price;
        this._name = data.name;
        this._image = data.image;
        this._quantity = data.quantity;
    }

    get price() {
        return (this._price || 0).toFixed(2);
    }

    get id() {
        return this._id;
    }

    get image() {
        return this._image;
    }

    get quantity() {
        return this._quantity;
    }

    get name() {
        return this._name;
    }

    get total() {
        return Math.ceil(this.quantity * this.price).toFixed(2);
    }
}

export default class Product {
    constructor(data) {
        this._id = data.id;
        this._price = data.price;
        this._name = data.name;
        this._image = data.image;
        this._description = data.description;
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

    get description() {
        return this._description;
    }

    get name() {
        return this._name;
    }
}

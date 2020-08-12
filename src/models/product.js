export default class Product {
    constructor(data) {
        this._id = data.id;
        this._price = data.price || 0;
        this._name = data.name;
        this._image = data.image;
        this._slug = data.slug;
        this._description = data.description;

        this._category = data.category;
        this._brand = data.brand;
        this._type = data.type;
        this._average_ratings = data.average_ratings;
    }

    get price() {
        return parseFloat(this._price);
    }

    get displayPrice() {
        return 'P' + parseFloat(this.price).toFixed(2);
    }

    get id() {
        return this._id;
    }

    get average_ratings() {
        return parseInt(this._average_ratings);
    }

    get image() {
        return this._image;
    }

    get slug() {
        return this._slug;
    }

    get description() {
        return this._description;
    }

    get name() {
        return this._name;
    }

    get category() {
        return this._category;
    }
    get brand() {
        return this._brand;
    }
    get type() {
        return { ...this._type, name: this._type.type };
    }
}

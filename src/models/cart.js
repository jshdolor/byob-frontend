import ProductService from '~/services/Product';

export default class CartItem {
    constructor(data) {
        this._id = data.product_id;
        this._quantity = data.qty;

        //get this from product
        ProductService.getAll().then((products) => {
            this._product = products.find((product) => product.id === this.id);
        });
    }

    get id() {
        return this._id;
    }
    get quantity() {
        return this._quantity;
    }

    //
    get price() {
        return parseFloat(this.product.price || 0).toFixed(2);
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

    get product() {
        return this._product;
    }

    get total() {
        return Math.ceil(this.quantity * this.price).toFixed(2);
    }

    toJSON() {
        return {
            price: this.price,
            image: this.image,
            name: this.name,
            product: this.product,
            total: this.total,
            id: this.id,
            quantity: this.quantity,
        };
    }
}

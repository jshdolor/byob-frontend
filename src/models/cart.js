import { amountPrecision, bottlePerMl, bottlePrice } from '../config/app';

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
        return parseFloat(this._product?.price || 0).toFixed(amountPrecision);
    }
    get image() {
        return this._product?._image;
    }

    get name() {
        return this._product?._name;
    }

    get type() {
        return this._product?._type;
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
        const computedPrice = parseFloat(this.qty * this.price).toFixed(
            amountPrecision
        );

        return this.type.id === 1
            ? computedPrice
            : parseFloat(computedPrice) +
                  parseFloat(this.bottles * bottlePrice);
    }

    get displayPrice() {
        return `P${parseFloat(this.total).toFixed(amountPrecision)}`;
    }

    get bottles() {
        // 1 bottle per 100ml
        return Math.ceil(this.qty / bottlePerMl);
    }

    getLocalData() {
        return {
            product_id: this.product_id,
            qty: this.qty,
            type: this.type,
        };
    }
}

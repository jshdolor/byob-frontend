import BaseModel from '~/models/baseModel';
import { bottlePrice, amountPrecision } from '~/config/app';

export default class Order extends BaseModel {
    constructor(data) {
        super();
        this._orderPendingAt = data.order_pending_at;
        this._orderConfirmedAt = data.order_confirmed_at;
        this._products = data.products || [];
        this._orderNumber = data.reference_no;
        this._status = data.status;
        this._featuredProducts = [];
        this._paymentType = data.payment_type;
        this._totalPrice = data.total_price || 0;
    }

    get orderPendingAt() {
        return this._orderPendingAt;
    }
    get orderConfirmedAt() {
        return this._orderConfirmedAt;
    }
    get products() {
        return this._products;
    }
    get orderNumber() {
        return this._orderNumber;
    }

    get featuredProducts() {
        return this._featuredProducts;
    }

    set featuredProducts(value) {
        this._featuredProducts = value;
    }

    get bottles() {
        return this.products.reduce(
            (a, product) => a + product.pivot.bottles,
            0
        );
    }

    get bottlesPrice() {
        return this.bottles * bottlePrice;
    }

    get totalPrice() {
        return this._totalPrice;
    }

    get status() {
        return this._status;
    }

    get subTotal() {
        return this.totalPrice - this.bottlesPrice;
    }

    get subTotalDisplay() {
        return 'P' + Number(this.subTotal || 0)?.toFixed(amountPrecision);
    }

    get totalPriceDisplay() {
        return 'P' + Number(this.totalPrice || 0)?.toFixed(amountPrecision);
    }

    get bottlesPriceDisplay() {
        return 'P' + Number(this.bottlesPrice || 0)?.toFixed(amountPrecision);
    }

    get paymentType() {
        return this._paymentType;
    }
}

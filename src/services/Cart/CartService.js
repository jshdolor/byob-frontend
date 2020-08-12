import CartModel from '~/models/cart';
import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class CartService {
    static endpoint = '/cart';

    static getCart() {
        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                return data.map((d) => new CartModel(d));
            })
            .catch((e) => {
                throw new ExceptionHandler('CartService - getCart', e);
            });
    }

    static setCart(localCartRequest) {
        return Client.setUrl(this.endpoint)
            .post(localCartRequest)
            .then(({ data }) => {
                return data.map((d) => new CartModel(d));
            })
            .catch((e) => {
                throw new ExceptionHandler('CartService - setCart', e);
            });
    }

    static updateCart(request) {
        return Client.setUrl(this.endpoint)
            .put(request.toFormData(true))
            .then(({ data }) => {
                return data.map((d) => new CartModel(d));
            })
            .catch((e) => {
                throw new ExceptionHandler('CartService - updateCart', e);
            });
    }

    static removeFromCart(product) {
        return Client.setUrl(this.endpoint)
            .delete(product)
            .then(({ data }) => {
                return data.map((d) => new CartModel(d));
            })
            .catch((e) => {
                throw new ExceptionHandler('CartService - removeItem', e);
            });
    }

    setItem() {}
}

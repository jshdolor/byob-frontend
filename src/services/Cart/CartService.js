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
            .catch((e) => new ExceptionHandler('CartService - getCart', e));
    }

    static updateCart(request) {
        //will update or create an entry on the user's cart
        return Client.setUrl(this.endpoint)
            .withAuth()
            .put()
            .then(({ data }) => {
                return new CartModel(data);
            })
            .catch((e) => new ExceptionHandler('CartService - updateCart', e));
    }

    //will be called after login
    async initializeCart() {
        await this.getCart();
    }

    static setCart(localCartRequest) {
        console.log(localCartRequest.getCart());
        return (
            Client.setUrl(this.endpoint)
                // .withAuth()
                .post(localCartRequest.getCart())
                .then(({ data }) => {
                    return data.map((d) => new CartModel(d));
                })
                .catch((e) => new ExceptionHandler('CartService - setCart', e))
        );
    }

    static removeItem(productId) {
        return Client.setUrl(this.endpoint)
            .withAuth()
            .delete(productId)
            .then(({ data }) => {
                return new CartModel(data);
            })
            .catch((e) => new ExceptionHandler('CartService - removeItem', e));
    }

    setItem() {}
}

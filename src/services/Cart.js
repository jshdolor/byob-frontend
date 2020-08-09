import CartModel from '~/models/cart';
import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class CartService {
    static endpoint = '/cart';

    getCart() {
        return Client.setUrl(this.endpoint)
            .withAuth()
            .get()
            .then(({ data }) => {
                return new CartModel(data);
            })
            .catch((e) => new ExceptionHandler('CartService - getCart', e));
    }

    setCart() {}

    removeItem() {}

    setItem() {}
}

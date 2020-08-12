import CartModel from '~/models/cart';
import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

import ProductService from '~/services/Product';

export default class CartService {
    static endpoint = '/cart';

    static async getCart() {
        const cart = await Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                return data.map((d) => {
                    return ProductService.getById(d.product_id).then(
                        (product) => {
                            return new CartModel(d, product);
                        }
                    );
                });
            })
            .catch((e) => {
                throw new ExceptionHandler('CartService - getCart', e);
            });

        return Promise.all(cart);
    }

    // static setCart(localCartRequest) {
    //     return Client.setUrl(this.endpoint)
    //         .post(localCartRequest)
    //         .then(({ data }) => {
    //             return data.map((d) => new CartModel(d));
    //         })
    //         .catch((e) => {
    //             throw new ExceptionHandler('CartService - setCart', e);
    //         });
    // }

    static async updateCartItem(request) {
        const cart = await Client.setUrl(this.endpoint)
            .patch(request.toFormData(true))
            .then(({ data }) => {
                return data.map((d) => {
                    return ProductService.getById(d.product_id).then(
                        (product) => {
                            return new CartModel(d, product);
                        }
                    );
                });
            })
            .catch((e) => {
                throw new ExceptionHandler('CartService - updateCartItem', e);
            });

        return Promise.all(cart);
    }

    static async updateCart(request) {
        const cart = await Client.setUrl(this.endpoint)
            .put(request.toFormData(true))
            .then(({ data }) => {
                return data.map((d) => {
                    return ProductService.getById(d.product_id).then(
                        (product) => {
                            return new CartModel(d, product);
                        }
                    );
                });
            })
            .catch((e) => {
                throw new ExceptionHandler('CartService - updateCart', e);
            });

        return Promise.all(cart);
    }

    static async removeFromCart(product) {
        const cart = await Client.setUrl(this.endpoint)
            .delete(product)
            .then(({ data }) => {
                return data.map((d) => {
                    return ProductService.getById(d.product_id).then(
                        (product) => {
                            return new CartModel(d, product);
                        }
                    );
                });
            })
            .catch((e) => {
                throw new ExceptionHandler('CartService - removeItem', e);
            });
        return Promise.all(cart);
    }

    setItem() {}
}

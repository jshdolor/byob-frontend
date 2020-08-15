import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class CheckoutService {
    static endpoint = '/checkout';

    static checkout(request) {
        return Client.setUrl(this.endpoint)
            .post(request.toJSON())
            .then((data) => data)
            .catch((e) => {
                throw new ExceptionHandler('CheckoutService - checkout', e);
            });
    }

    static expressCheckout(request) {
        return Client.setUrl(this.endpoint + '?express=1')
            .post(request.toJSON())
            .then((data) => data)
            .catch((e) => {
                throw new ExceptionHandler(
                    'CheckoutService - expressCheckout',
                    e,
                );
            });
    }
}

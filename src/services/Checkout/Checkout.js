import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class CheckoutService {
    static endpoint = '/checkout';

    static checkout(request, express = false, promo_code = null) {
        const endpoint = express ? `${this.endpoint}?express=1` : this.endpoint;

        let checkoutRequest = request.toJSON();

        if (promo_code) {
            checkoutRequest = { ...checkoutRequest, promo_code };
        }

        return Client.setUrl(endpoint)
            .post(checkoutRequest)
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
                    e
                );
            });
    }
}

import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class PromoService {
    static endpoint = '/apply-promo-code';

    static verify(code) {
        return Client.setUrl(this.endpoint)
            .post({ code })
            .then(({ data }) => {
                return data;
            })
            .catch((e) => {
                throw new ExceptionHandler('PromoService - verify', e);
            });
    }
}

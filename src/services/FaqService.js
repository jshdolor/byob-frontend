import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class FAQService {
    static endpoint = '/faqs';

    static getAll() {
        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                return data.faqs || [];
            })
            .catch((e) => {
                throw new ExceptionHandler('FAQService - getAll', e);
            });
    }
}

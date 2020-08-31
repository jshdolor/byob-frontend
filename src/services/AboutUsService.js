import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class AboutUsService {
    static endpoint = '/about';

    static getAll() {
        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                return data[0] || [];
            })
            .catch((e) => {
                throw new ExceptionHandler('AboutUsService - getAll', e);
            });
    }
}

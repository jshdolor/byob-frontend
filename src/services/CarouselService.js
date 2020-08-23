import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class CarouselService {
    static endpoint = '/carousell';

    static getAll() {
        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                return data.images || [];
            })
            .catch((e) => {
                throw new ExceptionHandler('CarouselService - getAll', e);
            });
    }
}

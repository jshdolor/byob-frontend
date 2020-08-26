import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';
import CacheManager from '~/lib/CacheManager';

export default class CarouselService {
    static endpoint = '/carousell';
    static cacheKey = 'carousel-images';

    static getAll() {
        if (CacheManager.has(this.cacheKey)) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(this.cacheKey));
            });
        }

        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                CacheManager.set(this.cacheKey, data.images);

                return data.images || [];
            })
            .catch((e) => {
                throw new ExceptionHandler('CarouselService - getAll', e);
            });
    }
}

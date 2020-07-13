import Client from '~/clients/ApiClient';
import Model from '~/models/product';
import CacheManager from '~/utils/Cache';

export default class ProductService {
    static cacheKey = 'products';
    static endpoint = '/products';

    static getAll() {
        if (CacheManager.has(this.cacheKey)) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(this.cacheKey));
            });
        }

        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                const products = data.map((d) => new Model(d));
                CacheManager.set(this.cacheKey, products);
                return products;
            })
            .catch((e) => e);
    }
}

import Client from '~/clients/ApiClient';
import CacheManager from '~/utils/Cache';

export default class BaseService {
    static cacheKey = 'base-service';
    static endpoint = '/base-service';
    static model = class BaseService {};
    static cacheable = true;

    static getAll() {
        if (this.cacheable) {
            if (CacheManager.has(this.cacheKey)) {
                return new Promise((resolve, rej) => {
                    resolve(CacheManager.get(this.cacheKey));
                });
            }
        }

        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                const products = data.map((d) => new this.model(d));
                if (this.cacheable) {
                    CacheManager.set(this.cacheKey, products);
                }
                return products;
            })
            .catch((e) => e);
    }

    static get(id) {
        const cacheKey = `${this.cacheKey}_${id}`;

        if (this.cacheable) {
            if (CacheManager.has(cacheKey)) {
                return new Promise((resolve, rej) => {
                    resolve(CacheManager.get(cacheKey));
                });
            }
        }

        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                const modeledData = new this.model(data);
                if (this.cacheable) {
                    CacheManager.set(cacheKey, modeledData);
                }
                return modeledData;
            })
            .catch((e) => e);
    }
}

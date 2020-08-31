import ArticleModel from '~/models/article';
import Client from '~/clients/ApiClient';
import CacheManager from '~/lib/CacheManager';

export default class ArticleService {
    static cacheKey = 'articles';
    static endpoint = '/socials/articles';
    static model = ArticleModel;

    static getAll() {
        if (CacheManager.has(this.cacheKey)) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(this.cacheKey));
            });
        }

        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                const modeledData = (data || []).map((d) => {
                    const modeledProduct = new this.model(d);

                    CacheManager.set(
                        `${this.cacheKey}_${d.id}`,
                        modeledProduct
                    );

                    return modeledProduct;
                });
                CacheManager.set(this.cacheKey, modeledData);
                return modeledData;
            })
            .catch((e) => {
                throw e;
            });
    }

    static getById(id, modelData = true) {
        const cacheKey = `${this.cacheKey}_${id}`;

        if (CacheManager.has(cacheKey) && modelData) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(cacheKey));
            });
        }

        return Client.setUrl(this.endpoint + `/${id}`)
            .get()
            .then(({ data }) => {
                if (modelData) {
                    const modeledData = new this.model(data || {});
                    CacheManager.set(cacheKey, modeledData);
                    return modeledData;
                }
                return data.product;
            })
            .catch((e) => {
                throw e;
            });
    }
}

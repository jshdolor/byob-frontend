import ProductModel from '~/models/product';
import Client from '~/clients/ApiClient';
import CacheManager from '~/lib/CacheManager';
export default class ProductService {
    static cacheKey = 'products';
    static endpoint = '/products';
    static model = ProductModel;

    static getAll() {
        if (CacheManager.has(this.cacheKey)) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(this.cacheKey));
            });
        }

        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                const modeledData = (data.products || []).map((d) => {
                    const modeledProduct = new this.model(d);

                    CacheManager.set(
                        `${this.cacheKey}_${modeledProduct.id}`,
                        modeledProduct
                    );

                    CacheManager.set(
                        `${this.cacheKey}_${modeledProduct.slug}`,
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

    //can be id|slug
    static getById(id) {
        const cacheKey = `${this.cacheKey}_${id}`;

        if (CacheManager.has(cacheKey)) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(cacheKey));
            });
        }

        return Client.setUrl(this.endpoint + `/${id}`)
            .get()
            .then(({ data }) => {
                const modeledData = new this.model(data.product || {});
                CacheManager.set(cacheKey, modeledData);
                return modeledData;
            })
            .catch((e) => {
                throw e;
            });
    }
}

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
                        `${this.cacheKey}_${d.id}`,
                        modeledProduct
                    );

                    CacheManager.set(
                        `${this.cacheKey}_${d.slug}`,
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
    //used by get initial props on single product page
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
                    const modeledData = new this.model(data.product || {});
                    CacheManager.set(cacheKey, modeledData);
                    return modeledData;
                }
                return data.product;
            })
            .catch((e) => {
                throw e;
            });
    }

    static getFeatured() {
        const featuredKey = 'featured-products';

        if (CacheManager.has(featuredKey)) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(featuredKey));
            });
        }

        return Client.setUrl(this.endpoint + '/featured')
            .get()
            .then(({ data = [] }) => {
                const modeledData = data.map((d) => {
                    const modeledProduct = new this.model(d);

                    CacheManager.set(featuredKey, modeledProduct);

                    return modeledProduct;
                });
                CacheManager.set(featuredKey, modeledData);
                return modeledData;
            })
            .catch((e) => {
                throw e;
            });
    }

    static getReviews(id) {
        const reviewsKey = `reviews-products-${id}`;

        if (CacheManager.has(reviewsKey)) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(reviewsKey));
            });
        }

        return Client.setUrl(`${this.endpoint}/${id}/reviews`)
            .get()
            .then(({ data }) => data.reviews)
            .catch((e) => {
                throw e;
            });
    }

    static getSuggestions(id) {
        const suggestionKey = `suggestions-products-${id}`;

        if (CacheManager.has(suggestionKey)) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(suggestionKey));
            });
        }

        return Client.setUrl(`${this.endpoint}/${id}/suggestions`)
            .get()
            .then(({ data }) => data.suggestions)
            .catch((e) => {
                throw e;
            });
    }
}

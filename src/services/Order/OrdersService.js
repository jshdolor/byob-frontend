import OrderModel from '~/models/order';
import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';
import ProductService from '~/services/Product';

export default class OrdersService {
    static endpoint = '/orders';

    static history() {
        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                const history = data
                    .map((d) => new OrderModel(d))
                    .map(async (d) => {
                        const fetchedProducts = d.products
                            .filter((a, i) => i < 2)
                            .map(
                                async (product) =>
                                    await ProductService.getById(product.id)
                            );

                        d.featuredProducts = await Promise.all(fetchedProducts);

                        return d;
                    });

                return Promise.all(history).then((d) => d);
            })
            .catch((e) => {
                throw new ExceptionHandler('OrdersService - history', e);
            });
    }
}

import ProductModel from '~/models/product';
import BaseService from './BaseService';

export default class ProductService extends BaseService {
    static cacheKey = 'products';
    static endpoint = '/products';
    static model = ProductModel;
}

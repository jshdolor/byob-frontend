import CartModel from '~/models/cart';
import BaseService from './BaseService';

export default class CartService extends BaseService {
    static endpoint = '/cart';
    static model = CartModel;
    static cacheable = false;
}

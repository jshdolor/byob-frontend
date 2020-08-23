import { useSelector, useDispatch } from 'react-redux';
import { setExpressCart } from '~/store/express-cart/actions';
import { useRouter } from 'next/router';

import ProductService from '~/services/Product';
import CartModel from '~/models/cart';

const buyNow = ({ qty, product_id, type, children }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleClick = async () => {
        const product = await ProductService.getById(product_id);

        const cart = new CartModel({ product_id, qty }, product);

        dispatch(setExpressCart(cart));
        router.push('/checkout?express=1');
    };

    return <div onClick={handleClick}>{children}</div>;
};

export default buyNow;

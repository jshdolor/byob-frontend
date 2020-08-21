import { Popconfirm, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { handle as removeItem } from '~/components/cart/RemoveCartItemButton';
import { addToCart as addItem } from '~/components/buttons/addCart';
const reOrder = ({ cart }) => {
    const router = useRouter();

    const currentCart = useSelector((state) => state.cart);

    const confirm = async (e) => {
        const removePromise = currentCart.map(
            async (cart) => await removeItem(cart.product_id)
        );

        await Promise.all(removePromise);

        const addingPromise = cart.map(async (cartItem) => {
            const qty = cartItem?.pivot?.qty;
            const type = { id: cartItem?.product_type_id };
            const product_id = cartItem?.pivot?.product_id;

            return await addItem(product_id, type, qty);
        });

        await Promise.all(addingPromise);

        router.push('/products?open=1');
    };

    return (
        <Popconfirm
            title='Your current cart will be replaced by this cart, continue?'
            onConfirm={confirm}
            okText='Yes'
            cancelText='No'
        >
            <Button>Re-order</Button>
        </Popconfirm>
    );
};

export default reOrder;

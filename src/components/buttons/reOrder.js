import { Popconfirm, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { handle as removeItem } from '~/components/cart/RemoveCartItemButton';

const reOrder = ({ cart }) => {
    const router = useRouter();

    const currentCart = useSelector((state) => state.cart);

    const confirm = async (e) => {
        currentCart.map(async (cart) => await removeItem(cart.product_id));

        // await removeItem();

        console.log(currentCart);
        message.success({
            content: 'tesafsatwt',
            top: '100',
        });

        // remove cart items
        // insert reorder

        // router.push('/products?open=1');
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

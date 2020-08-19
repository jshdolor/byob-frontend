import { Popconfirm, Button } from 'antd';

function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
}

function cancel(e) {
    console.log(e);
    message.error('Click on No');
}

const reOrder = () => {
    return (
        <Popconfirm
            title='Your current cart will be replaced by this cart, continue?'
            onConfirm={confirm}
            onCancel={cancel}
            okText='Yes'
            cancelText='No'
        >
            <Button>Re-order</Button>
        </Popconfirm>
    );
};

export default reOrder;

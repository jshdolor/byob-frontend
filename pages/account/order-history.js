import Head from 'next/head';
import AccountLayout from '~/layouts/Account';

import authCheck from '~/middleware/auth';
import { useEffect, useState } from 'react';
import OrdersService from '~/services/Order/OrdersService';
import DetailedOrder from '~/layouts/MyAccount/DetailedOrder';

import { Table, Badge, Menu, Dropdown, Space } from 'antd';
import { orderHistoryProductShow } from '~/config/app';

const renderSummaryItem = (targetColumn, row) => {
    const exceedsToBeShown = row.products.length > orderHistoryProductShow;
    const hasMore = exceedsToBeShown
        ? `+${row.products.length - 2} more`
        : null;

    return targetColumn.map((product, i) => {
        return (
            <>
                <img key={i} src={product.image} style={{ width: 60 }}></img>
                {i === 1 ? hasMore : ''}
            </>
        );
    });
};
function OrderHistory(props) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        (async () => {
            const orderHistory = await OrdersService.history();
            setHistory(
                orderHistory.map((h) => {
                    h.key = h.orderNumber;
                    return h;
                })
            );
        })();
    }, []);

    const columns = [
        { title: 'Order Number', dataIndex: 'orderNumber', key: 'orderNumber' },
        {
            title: 'Date of Purchase',
            dataIndex: 'orderPendingAt',
            key: 'orderPendingAt',
        },
        {
            title: 'Items',
            dataIndex: 'featuredProducts',
            key: 'featuredProducts',
            render: renderSummaryItem,
        },
    ];

    return (
        <AccountLayout>
            <Head>
                <title>BYOB | Account - Order History</title>
            </Head>
            <div className='my-account-cont'>
                <h2 className='account-title'>My Account</h2>
                <span className=''>Order History</span>
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record) => (
                            <DetailedOrder record={record}></DetailedOrder>
                        ),
                    }}
                    dataSource={history}
                />
            </div>
        </AccountLayout>
    );
}

OrderHistory.getInitialProps = async (ctx) => {
    await authCheck(ctx);

    //can pass data here for initial page call
    return {};
};

export default OrderHistory;

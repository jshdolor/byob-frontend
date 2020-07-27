import Head from 'next/head';
import AccountLayout from '~/layouts/Account';
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [
    {
        dataField: 'id',
        text: 'Order Number',
    },
    {
        dataField: 'name',
        text: 'Product Name',
    },
    {
        dataField: 'price',
        text: 'Product Price',
    },
];

const products = [
    {
        id: 1,
        name: 'test',
        price: 100.0,
    },
    {
        id: 2,
        name: 'test',
        price: 100.0,
    },
];

const expandRow = {
    renderer: (row) => (
        <div>
            <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
            <p>
                You can render anything here, also you can add additional data
                on every row object
            </p>
            <p>
                expandRow.renderer callback will pass the origin row object to
                you
            </p>
        </div>
    ),
    onlyOneExpanding: true,
};

export default function OrderHistory() {
    return (
        <AccountLayout>
            <Head>
                <title>BYOB | Account - Order History</title>
            </Head>
            <div className='mb-3 font-weight-bold byob-text-small'>
                Order History
            </div>
            <BootstrapTable
                keyField='id'
                data={products}
                columns={columns}
                expandRow={expandRow}
            />
        </AccountLayout>
    );
}

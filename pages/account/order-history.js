import Head from 'next/head';
import AccountLayout from '~/layouts/Account';
import BootstrapTable from 'react-bootstrap-table-next';
import ProfileService from '~/services/ProfileService';

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

function OrderHistory(props) {
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

export const getServerSideProps = async (ctx) => {
    let data = {};
    try {
        data = await ProfileService.get(ctx);
    } catch (e) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', `/login`);
    }

    return { props: data.toJSON() };
};

export default OrderHistory;

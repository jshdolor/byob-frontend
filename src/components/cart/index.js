import Item from './item';

const items = [{}, {}, {}];

const price = 10;

const cart = () => (
    <div className='cart container'>
        <div className='row'>
            <div className='col-9'></div>
            <div className='col-3'>
                <div>Cart</div>

                {items.map((d, i) => (
                    <Item key={i}></Item>
                ))}

                <div className='row'>
                    <div className='col-12'>
                        <button className='btn btn-dark btn-block'>
                            Checkout - {price}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default cart;

const cartItem = () => (
    <div
        className='row cart-item pt-4 pb-4 pl-0 pr-0'
        style={{
            borderTop: '1px solid #404040',
        }}
    >
        <div className='col-4'>
            <img
                src='https://semantic-ui.com/images/wireframe/image.png'
                className='img-fluid'
            ></img>
        </div>
        <div className='col-6'>
            <div className='cart-item-name'>Datu Puti</div>
            <div className='cart-item-description'>
                This is the item's short description
            </div>
        </div>
        <div className='col-2 text-right'>P24.50</div>
    </div>
);

export default cartItem;

import { Button } from 'react-bootstrap';
import { addCartItem, setCartItems } from '~/store/cart/actions';
import { connect, useStore } from 'react-redux';
import { bindActionCreators } from 'redux';

const addCart = (props) => {
    const {
        id,
        text = 'Add to Cart',
        cls = 'py-0 px-0 text-primary text-capitalize',
        style,
    } = props;

    const handleClick = () => {
        addCartItem;
    };

    return (
        <Button
            onClick={handleClick}
            variant='link'
            className={`add-to-cart ${cls}`}
            style={style}
        >
            {text}
        </Button>
    );
};

const mapStateToProps = function (state) {
    return state;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(
        {
            addCartItem,
            setCartItems,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(addCart);

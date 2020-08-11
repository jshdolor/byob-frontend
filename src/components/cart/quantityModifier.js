import { Button } from 'react-bootstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { connect, useStore } from 'react-redux';
import { bindActionCreators } from 'redux';

import { decrementItem, incrementItem } from '~/store/cart/actions';

const size = '0.7em';

const QuantityModifier = ({ incrementItem, decrementItem, id, quantity }) => {
    return (
        <div className='quantity-modifier'>
            <FaMinus
                className='mx-1'
                size={size}
                onClick={() => {
                    if (!callService) decrementItem(id);
                }}
            ></FaMinus>
            <span className='mx-1 quantity-count' style={{ fontSize: size }}>
                {quantity}
            </span>
            <FaPlus
                className='mx-1'
                size={size}
                onClick={() => {
                    if (!callService) incrementItem(id);

                    incrementItem(id);
                }}
            ></FaPlus>
        </div>
    );
};

const mapStateToProps = function (state) {
    return state;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(
        {
            incrementItem,
            decrementItem,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(QuantityModifier);

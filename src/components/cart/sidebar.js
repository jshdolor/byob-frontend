import Sidebar from 'react-sidebar';
import Cart from '~/components/cart';

import { toggleCartMenu } from '~/store/cartMenu/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const sideBarStyle = {
    sidebar: { zIndex: 2003 },
    overlay: {
        zIndex: 2002,
    },
};

const CartSidebar = ({ toggleCartMenu, open, children }) => {
    return (
        <Sidebar
            open={open}
            pullRight
            onSetOpen={toggleCartMenu}
            sidebar={<Cart></Cart>}
            children={' '}
            rootId='cart-sidebar'
            sidebarClassName='cart-content'
            styles={sideBarStyle}
        >
            {children}
        </Sidebar>
    );
};

const mapStateToProps = function (state) {
    return state.cartMenu;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(
        {
            toggleCartMenu,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(CartSidebar);

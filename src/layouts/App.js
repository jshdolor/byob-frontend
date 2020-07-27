import Header from '~/components/header';
import Footer from '~/components/footer';
import CartSidebar from '~/components/cart/sidebar';

const AppLayout = ({ children }) => {
    return (
        <div id='app'>
            <CartSidebar>
                <Header></Header>
                <div id='byob-content'>{children}</div>
                <Footer></Footer>
            </CartSidebar>
        </div>
    );
};

export default AppLayout;

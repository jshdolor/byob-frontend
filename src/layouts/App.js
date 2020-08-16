import Header from '~/components/header';
import Footer from '~/components/footer';
import CartSidebar from '~/components/cart/sidebar';

import { Modal, Button } from 'antd';

import { useEffect, useState } from 'react';
import CookieManager from '~/lib/CookieManager';

const AppLayout = ({ children }) => {
    const [showCookiemodal, setShowCookiemodal] = useState(false);

    useEffect(() => {
        const byobCookie = CookieManager.get('byob-cookie');
        setShowCookiemodal(!byobCookie);
    }, []);

    const acceptCookieAgreement = () => {
        CookieManager.set('byob-cookie', true, { maxAge: 5000000 });
        setShowCookiemodal(false);
    };

    return (
        <div id='app'>
            <Modal
                visible={showCookiemodal}
                className='byob-popup'
                closable={false}
                footer={null}
            >
                <p>
                    This website uses cookies to ensure you get the best
                    experience in our website.
                </p>
                <Button type='primary' onClick={() => acceptCookieAgreement()}>
                    Okay
                </Button>
            </Modal>
            <CartSidebar>
                <Header></Header>
                <div id='byob-content'>{children}</div>
                <Footer></Footer>
            </CartSidebar>
        </div>
    );
};

export default AppLayout;

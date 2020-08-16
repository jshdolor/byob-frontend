import Header from '~/components/header';
import Footer from '~/components/footer';
import CartSidebar from '~/components/cart/sidebar';

import { Button, notification, Divider, Space } from 'antd';

import { useEffect, useState } from 'react';
import CookieManager from '~/lib/CookieManager';

const AppLayout = ({ children }) => {
    const [showCookiemodal, setShowCookiemodal] = useState(false);

    useEffect(() => {
        const cookieUsageAccepted = CookieManager.get('byob-cookie');

        if (cookieUsageAccepted) {
            return;
        }

        notification.info({
            message: 'Cookie Usage',
            description: `This website uses cookies to ensure you get the best
                    experience in our website.`,
            placement: 'bottomLeft',
            duration: 0,
            onClose: acceptCookieAgreement,
        });
    }, []);

    const acceptCookieAgreement = () => {
        CookieManager.set('byob-cookie', true, { maxAge: 5000000 });
        setShowCookiemodal(false);
    };

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

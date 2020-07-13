import Header from '../components/header';
import Footer from '../components/footer';

const AppLayout = ({ children }) => (
    <div id='app'>
        <Header></Header>
        <div className='py-5'>{children}</div>
        <Footer></Footer>
    </div>
);

export default AppLayout;

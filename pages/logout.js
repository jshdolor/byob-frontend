import Head from 'next/head';
import { useEffect } from 'react';
import { logoutUser } from '~/store/session/actions';
import Router from 'next/router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Logout({ logoutUser }) {
    useEffect(() => {
        logoutUser();
        Router.replace('/');
    }, []);

    return (
        <>
            <Head>
                <title>BYOB | Logout</title>
            </Head>
        </>
    );
}

const mapStateToProps = function (state) {
    return state;
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(
        {
            logoutUser,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

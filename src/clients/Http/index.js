import axios from 'axios';
import { mergeDeep } from '~/helpers';
import CookieManager from '~/lib/CookieManager';

export default class Http {
    constructor(ctx = null) {
        this.config = {};
        this.ctx = ctx;
    }

    get(url, params = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'get', config);
        this.config.params = params;
        return this._send();
    }

    post(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'post', config);
        this.config.data = data;
        return this._send();
    }

    put(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'put', config);
        this.config.data = data;
        return this._send();
    }

    patch(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'patch', config);
        this.config.data = data;
        return this._send();
    }

    delete(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'delete', config);
        this.config.data = data;
        return this._send();
    }

    _prepareXhr(url, method, config) {
        this.config.url = url;
        this.config.method = method;
        this.overrides = config;
    }

    _construct() {
        this.overrides = {};
        this.config = {
            url: '',
            data: {},
            method: 'get',
            headers: {},
            params: {},
        };
    }

    _send() {
        if (!!Object.keys(this.overrides).length) {
            this.config = mergeDeep(this.config, this.overrides);
            this.config.ctx = this.ctx;
        }

        return axios(this.config).then((response) => {
            return response.data;
        });
    }
}

const intercept = () => {
    axios.interceptors.request.use(
        (config) => {
            if (process.browser) {
                window.callInProgress = true;
                const token = CookieManager.get('b-at');
                if (token && token.length)
                    config.headers['Authorization'] = `Bearer ${token}`;
            }

            //todo handle server calls
            return config;
        },
        (error) => {
            if (process.browser) {
                window.callInProgress = false;
            }
            //todo handle server calls
            throw error;
        }
    );

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (!error.response) {
                throw 'Check your internet connection';
            }

            if (error.response.status === 401) {
                if (process.browser) {
                    const { data } = error.response.data;
                    //expired
                    if (data['access-token']) {
                        CookieManager.set('b-at', data['access-token']);

                        const refreshConfig = Object.assign(error.config, {
                            headers: Object.assign(error.config.headers, {
                                Authorization: `Bearer ${data['access-token']}`,
                            }),
                        });

                        return axios(refreshConfig);
                    }
                } else {
                    const { data } = error.response.data;
                    if (data['access-token']) {
                        CookieManager.setContext(error.config.ctx).set(
                            'b-at',
                            data['access-token']
                        );

                        CookieManager.set('b-at', data['access-token']);

                        const refreshConfig = Object.assign(error.config, {
                            headers: Object.assign(error.config.headers, {
                                Authorization: `Bearer ${data['access-token']}`,
                            }),
                        });

                        return axios(refreshConfig);
                    }

                    // console.log(error.req);
                    // console.log('================');
                    // console.log(error.response.config);
                    // console.log('>>>>>>>>');
                    // console.log(error.response.data);
                    // console.log('================');
                    // console.log('================');
                    // console.log('================');
                }
            }

            // if (
            //     !CookieManager.get(null, 'fetchingNewAccessToken') &&
            //     error.response.status === 401 &&
            //     error.config.url.indexOf('login') === -1 &&
            //     error.config.url.indexOf('registration') === -1
            // ) {
            //     CookieManager.set('fetchingNewAccessToken', true);

            //     const refreshConfig = {
            //         url: '/api/v2/refresh',
            //         method: 'post',
            //         headers: error.config.headers,
            //     };

            //     axios(refreshConfig)
            //         .then(
            //             ({
            //                 data: {
            //                     data: { token },
            //                 },
            //             }) => {
            //                 window.Store.dispatch('session/setAuth', {
            //                     token_type: 'Bearer',
            //                     access_token: token,
            //                 });

            //                 window.location.reload();
            //             }
            //         )
            //         .catch((e) => CookieManager.delete('p-at'))
            //         .finally((e) => {
            //             CookieManager.delete('fetchingNewAccessToken');
            //         });

            //     return false;
            // }

            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    );
};

intercept();

import ProfileModel from '~/models/profile';
import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

import CookieManager from '~/lib/CookieManager';

export default class ProfileService {
    static endpoint = '/profile';

    static get(context) {
        const token = CookieManager.setContext(context).get('b-at');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        return Client.setUrl(this.endpoint)
            .get(null, config, context)
            .then(({ data }) => {
                return new ProfileModel(data);
            })
            .catch((e) => {
                throw new ExceptionHandler('ProfileService - get', e);
            });
    }

    static deleteAccount(reasons) {
        return Client.setUrl(this.endpoint)
            .delete(reasons)
            .then(({ data }) => {
                return data;
            })
            .catch((e) => {
                throw new ExceptionHandler('ProfileService - deleteAccount', e);
            });
    }

    static updatePassword({ password, password_confirmation }) {
        const config = {
            headers: {
                'password-reset-token': CookieManager.get(
                    'password-reset-token'
                ),
            },
        };
        return Client.setUrl(this.endpoint + '/password')
            .put({ password, password_confirmation }, config)
            .then(({ data }) => {
                return new ProfileModel(data);
            })
            .catch((e) => {
                throw new ExceptionHandler('ProfileService - updateProfile', e);
            });
    }

    static updateProfile(request) {
        return Client.setUrl(this.endpoint)
            .put(request.toJSON())
            .then(({ data }) => {
                return new ProfileModel(data);
            })
            .catch((e) => {
                throw new ExceptionHandler('ProfileService - updateProfile', e);
            });
    }

    static passwordChange() {
        return Client.setUrl(this.endpoint + '/password')
            .get()
            .then(({ message }) => {
                return message;
            })
            .catch((e) => {
                throw new ExceptionHandler(
                    'ProfileService - passwordChange',
                    e
                );
            });
    }
}

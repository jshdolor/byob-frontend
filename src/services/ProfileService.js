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
}

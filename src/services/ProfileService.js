import ProfileModel from '~/models/profile';
import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

import nookies from 'nookies';

export default class ProfileService {
    static endpoint = '/profile';

    static get(context) {
        const cookies = nookies.get(context);

        const config = {
            headers: {
                Authorization: `Bearer ${cookies['b-at']}`,
            },
        };

        return Client.setUrl(this.endpoint)
            .get(null, config)
            .then(({ data }) => {
                return new ProfileModel(data);
            })
            .catch((e) => {
                throw new ExceptionHandler('ProfileService - get', e);
            });
    }
}

import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

import AuthModel from '~/models/auth';
export default class LoginService {
    static endpoint = '/login';

    static handle(request) {
        return Client.setUrl(this.endpoint)
            .post(request.toJSON())
            .then(({ data }) => {
                return new AuthModel(data);
            })
            .catch((e) => {
                throw new ExceptionHandler('LoginService', e);
            });
    }
}

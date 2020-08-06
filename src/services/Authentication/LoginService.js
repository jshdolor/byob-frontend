import Client from '~/clients/ApiClient';

export default class LoginService {
    static endpoint = '/login';

    static handle(request) {
        return Client.setUrl(this.endpoint)
            .post(request.toJSON())
            .then((data) => {
                console.log(data);

                return data;
            })
            .catch((e) => e);
    }
}

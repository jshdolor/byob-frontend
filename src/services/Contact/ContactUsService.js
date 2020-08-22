import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class ContactUsService {
    static endpoint = '/contact-us';

    static send(request) {
        return Client.setUrl(this.endpoint)
            .post(request.toJSON(), {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((e) => {
                console.log(e);
                throw new ExceptionHandler('ContactUsService - send', e);
            });
    }
}

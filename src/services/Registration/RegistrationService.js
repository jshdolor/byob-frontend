import ProductModel from '~/models/product';
import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class RegistrationService {
    static endpoint = '/pre-registration';
    static model = ProductModel;

    static preRegistration(request) {
        return Client.setUrl('/pre-registration')
            .post(request)
            .then((data) => data)
            .catch((e) => {
                throw new ExceptionHandler(
                    'RegistrationService - preRegistration',
                    e
                );
            });
    }

    static finalRegistration(request, token) {
        return Client.setUrl('/registration')
            .post(request, {
                headers: {
                    'registration-token': token,
                },
            })
            .then((data) => data)
            .catch(
                (e) =>
                    new ExceptionHandler(
                        'RegistrationService - finalRegistration',
                        e
                    )
            );
    }

    static checkRegistrationToken(token) {
        Client.setUrl('/check-registration-token')
            .get(null, {
                headers: { 'registration-token': token },
            })
            .then((data) => {
                return data;
            })
            .catch((e) => {
                return new ExceptionHandler(
                    'RegistrationService - checkRegistrationToken',
                    e
                );
            });
    }
}

import LockerModel from '~/models/locker';
import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class BoothService {
    static endpoint = '/booth';

    static getSchedules() {
        return Client.setUrl(this.endpoint)
            .post()
            .then(({ data }) => {
                return data.available.map((datum) => new LockerModel(datum));
            })
            .catch((e) => {
                throw new ExceptionHandler('BoothService - getSchedules', e);
            });
    }
}

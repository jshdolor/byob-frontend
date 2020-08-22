import LockerModel from '~/models/locker';
import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class LockerService {
    static endpoint = '/lockers';

    static getSchedules(lockers) {
        return Client.setUrl(this.endpoint)
            .post({ lockers })
            .then(({ data }) => {
                return data.available.map((datum) => new LockerModel(datum));
            })
            .catch((e) => {
                throw new ExceptionHandler('LockerService - getSchedules', e);
            });
    }
}

import LockerModel from '~/models/locker';
import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class VoucherService {
    static endpoint = '/voucher/verify';

    static verify(code) {
        return Client.setUrl(this.endpoint)
            .post({ code })
            .then(({ data }) => {
                return data.map((datum) => new LockerModel(datum));
            })
            .catch((e) => {
                throw new ExceptionHandler('VoucherService - verify', e);
            });
    }
}

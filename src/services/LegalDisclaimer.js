import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';

export default class LegalDisclaimer {
    static endpoint = '/legal';

    static get() {
        return Client.setUrl(this.endpoint)
            .get()
            .then(({ data }) => {
                const { content = '' } = data[0];
                return content;
            })
            .catch((e) => {
                throw new ExceptionHandler('LegalDisclaimer - get', e);
            });
    }
}

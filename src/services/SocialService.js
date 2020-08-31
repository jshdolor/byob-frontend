import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';
import Blog from '~/models/blog';

export default class SocialServices {
    static endpoint = '/socials';

    static videos() {
        return Client.setUrl(this.endpoint + '/videos')
            .get()
            .then(({ data }) => {
                return (data?.videos || []).map((video) => new Blog(video));
            })
            .catch((e) => {
                throw new ExceptionHandler('SocialServices - videos', e);
            });
    }

    static links() {
        return Client.setUrl(this.endpoint + '/links')
            .get()
            .then(({ data }) => {
                return (data?.links || []).map(
                    (link) => new Blog(link, 'external-link')
                );
            })
            .catch((e) => {
                throw new ExceptionHandler('SocialServices - links', e);
            });
    }
}

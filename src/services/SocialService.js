import Client from '~/clients/ApiClient';
import ExceptionHandler from '~/exception/Handler';
import Blog from '~/models/blog';
import CacheManager from '~/lib/CacheManager';

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

    static articles() {
        const cacheKey = 'social-articles';
        if (CacheManager.has(cacheKey)) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(cacheKey));
            });
        }

        return Client.setUrl(this.endpoint + '/articles')
            .get()
            .then(({ data }) => {
                const articles = (data?.links || []).map((link) => {
                    const modeled = new Blog(link, 'article');
                    CacheManager.set(`socialarticle-${link.id}`, modeled);

                    return modeled;
                });

                CacheManager.set(cacheKey, articles);
                return articles;
            })
            .catch((e) => {
                throw new ExceptionHandler('SocialServices - articles', e);
            });
    }

    static articleById(id) {
        const cacheKey = `socialarticle-${id}`;

        if (CacheManager.has(cacheKey)) {
            return new Promise((resolve, rej) => {
                resolve(CacheManager.get(cacheKey));
            });
        }

        return Client.setUrl(this.endpoint + `/articles/${id}`)
            .get()
            .then(({ data }) => {
                const modeled = new Blog(data, 'article');
                CacheManager.set(cacheKey, modeled);

                return modeled;
            })
            .catch((e) => {
                throw new ExceptionHandler('SocialServices - articleById', e);
            });
    }

    static getRelated(id) {
        return Client.setUrl(this.endpoint + `/other/${id}`)
            .get()
            .then(({ data }) => {
                return (data.other || []).map((blog) => {
                    let type = null;
                    if (blog.link) {
                        type = 'external-link';
                    }

                    if (blog.content) {
                        type = 'article';
                    }

                    return new Blog(blog, type);
                });
            })
            .catch((e) => {
                throw new ExceptionHandler('SocialServices - articleById', e);
            });
    }
}

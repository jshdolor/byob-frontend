import Http from '~/clients/Http';

export default class ApiClient {
    static url = '';
    static API_BASE = `${process.env.NEXT_PUBLIC_BYOB_HOST}/api/v1`;

    static setUrl(url) {
        this.url = this.API_BASE + url;
        return ApiClient;
    }

    static post(data, options = {}, ctx = null) {
        let http = new Http(ctx);
        return http.post(this.url, data, options);
    }

    static put(data, options = {}, ctx = null) {
        let http = new Http(ctx);
        return http.put(this.url, data, options);
    }

    static get(params, options = {}, ctx = null) {
        let http = new Http(ctx);
        return http.get(this.url, params, options);
    }
}

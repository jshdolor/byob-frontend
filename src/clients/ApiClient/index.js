import Http from '~/clients/Http';

export default class ApiClient {
    static url = '';
    static API_BASE = 'http://localhost:3001/api/v1';

    static setUrl(url) {
        this.url = this.API_BASE + url;
        return ApiClient;
    }

    static post(data, options = {}) {
        let http = new Http();
        return http.post(this.url, data);
    }

    static put(data, options = {}) {
        let http = new Http();
        return http.put(this.url, data, options);
    }

    static get(params, options = {}) {
        let http = new Http();
        return http.get(this.url, params, options);
    }
}

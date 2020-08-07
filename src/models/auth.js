export default class AuthModel {
    constructor(data) {
        this._accessToken = data['access-token'] || '';
    }

    get access_token() {
        return this._accessToken;
    }
}

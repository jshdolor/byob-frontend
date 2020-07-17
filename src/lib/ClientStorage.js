import Cookie from 'js-cookie';

class ClientStorage {
    static storage = Cookie;

    static get(key = '') {
        const value = this.storage.get(key) || null;
        return JSON.parse(value);
    }

    static set(key, value) {
        this.storage.set(key, JSON.stringify(value));
    }

    //array
    static add(key, value) {
        const oldValue = this.get(key);
        this.set(key, [...new Set([...oldValue, value])]);
    }
}

export default ClientStorage;

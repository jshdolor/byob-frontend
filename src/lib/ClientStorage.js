class ClientStorage {
    static storage = process.browser
        ? sessionStorage
        : { getItem: () => '', setItem: () => '' };

    static get(key = '') {
        const value = this.storage.getItem(key) || null;
        return JSON.parse(value);
    }

    static set(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    }

    //array
    static add(key, value) {
        const oldValue = this.get(key);
        this.set(key, [...new Set([...oldValue, value])]);
    }
}

export default ClientStorage;

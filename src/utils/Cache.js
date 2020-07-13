export default class Cache {
    static storage = {};

    static set(name, value) {
        this.storage[name] = value;
    }

    static get(name) {
        return this.storage[name] || null;
    }

    static has(name) {
        return this.storage[name] ? true : false;
    }
}

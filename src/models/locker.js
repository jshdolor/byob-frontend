export default class LockerModel {
    constructor(data) {
        this._date = data.date;
        this._time = data.time;
    }

    get date() {
        return this._date;
    }

    get time() {
        return {
            ...this._time,
            enabled: this._time?.locker_availability === 'enabled',
        };
    }
}

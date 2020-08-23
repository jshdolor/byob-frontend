export default class BoothModel {
    constructor(data) {
        this._date = data.date;
        this._time = (data.time || []).map((sched) => {
            sched.locker_availability = 'enabled';
            return sched;
        });
    }

    get date() {
        return this._date;
    }

    get time() {
        return this._time;
    }
}

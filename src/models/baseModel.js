export default class BaseModel {
    toJSON() {
        let formData = {};

        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                formData[key.startsWith('_') ? key.substr(1) : key] = this[key];
            }
        }

        return formData;
    }
}

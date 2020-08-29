export default class Blog {
    constructor(data, type = 'video') {
        this._id = data.id;
        this._title = data.title;
        this._video = data.embed || null;
        this._thumbnail = data.thumbnail || null;
        this._link = data.link;

        this._type = type;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get video() {
        let div = document.createElement('div');
        div.innerHTML = this._video;
        const videoSrc = div.querySelector('iframe')?.getAttribute('src');
        return videoSrc.split('/').reverse()[0];
    }

    get type() {
        return this._type;
    }

    get link() {
        return this._link;
    }

    get image() {
        return this._thumbnail || null;
    }
}

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
        if (this._thumbnail && this.type !== 'video') {
            return this._thumbnail;
        }

        let div = document.createElement('div');

        div.innerHTML = this._video;
        let videoSrc = div.querySelector('iframe')?.getAttribute('src');
        const videoId = videoSrc.split('/').reverse()[0];
        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/0.jpg`;
        }

        return ``;
    }
}

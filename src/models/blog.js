import { format } from 'date-fns';

export default class Blog {
    constructor(data, type = 'video') {
        this._id = data.id;
        this._title = data.title;
        this._video = data.embed || null;
        this._thumbnail = data.thumbnail || null;
        this._link = data.link;
        this._content = data.content;
        this._publishedAt = data.published_at;

        this._type = type;
    }

    get publishedAt() {
        try {
            return format(new Date(this._publishedAt), 'MMM d, yyyy HH:mm');
        } catch (e) {
            console.log(e);
            return '';
        }
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
        if (this._type === 'article') {
            return `/blogs/${this._id}`;
        }

        return this._link;
    }

    get image() {
        return this._thumbnail || null;
    }

    get content() {
        return this._content || '';
    }
}

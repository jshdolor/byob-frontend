export default class ArticleModel {
    constructor(data) {
        this._id = data.id;
        this._title = data.title;
        this._content = data.content;
        this._thumbnail = data.thumbnail;
        this._publishedAt = data.published_at;
    }

    get publishedAt() {
        return this._publishedAt;
    }

    get id() {
        return this._id;
    }

    get content() {
        return this._content;
    }

    get title() {
        return this._title;
    }

    get thumbnail() {
        return this._thumbnail;
    }
}

import FormData from '~/lib/FormData';

export default class PostReviewRequest extends FormData {
    constructor(data = {}) {
        super();
        this._message = data.message;
        this._ratings = data.ratings;
        this._name = data.name;
    }
}

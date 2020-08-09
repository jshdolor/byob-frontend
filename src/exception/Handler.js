class ExceptionHandler {
    constructor(type, exception) {
        this._type = type;
        this._exception = exception;
    }

    get type() {
        return this._type;
    }

    get exception() {
        return this._exception;
    }

    getErrors() {
        return [this._exception?.response?.data?.message];
    }
}

export default ExceptionHandler;

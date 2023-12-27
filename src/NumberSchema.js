export default class NumberSchema {
    constructor(validator = [(item) => typeof item === 'number']) {
        this.validators = [...validator];
    }

    number() {
        return this;
    }

    isValid(item) {
        return this.validators.every((validator) => validator(item) === true);
    }
}

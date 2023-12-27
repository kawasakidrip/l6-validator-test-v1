export default class ArraySchema {
    constructor(validators = [(item) => Array.isArray(item)]) {
        this.validators = [...validators];
    }

    array() {
        return this;
    }

    allIntegers() {
        this.validators.push((arr) => arr.every((item) => Number.isInteger(item)));
        return this;
    }

    custom(validator) {
        this.validators.push((arr) => arr.every((item) => validator(item)));
        return this;
    }

    isValid(data) {
        return this.validators.every((validator) => validator(data) === true);
    }
}

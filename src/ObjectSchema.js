export default class ObjectSchema {
    constructor(validators = [(item) => typeof item === 'object' && item !== null]) {
        this.validators = [...validators];
        this.fieldValidators = {};
    }

    object() {
        return this;
    }

    shape(fields) {
        Object.entries(fields).forEach(([fieldName, fieldValidator]) => {
            if (fieldValidator instanceof ObjectSchema || typeof fieldValidator.isValid === 'function') {
                this.fieldValidators[fieldName] = fieldValidator;
            } else {
                throw new Error('Invalid field validator');
            }
        });
        return this;
    }

    isValid(data) {
        if (!this.validators.every((validator) => validator(data) === true)) {
            return false;
        }

        const fieldNames = Object.keys(this.fieldValidators);

        if (fieldNames.length === 0) {
            // No specific fields to validate, so the object is considered valid
            return true;
        }

        return fieldNames.every((fieldName) => {
            const fieldValidator = this.fieldValidators[fieldName];
            const fieldValue = data[fieldName];
            return fieldValidator.isValid(fieldValue);
        });
    }
}

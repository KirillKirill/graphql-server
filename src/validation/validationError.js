const { GraphQLError } = require('graphql');

class ValidationError extends GraphQLError {
    constructor(errors) {
        super(errors);
        this.state = errors.reduce((result, error) => {
            if (result.hasOwnProperty(error.key)) {
                result[error.key].push(error.message);
            } else {
                result[error.key] = [error.message];
            }
            return result;
        }, {});
    }
}

module.exports = {
    ValidationError
}
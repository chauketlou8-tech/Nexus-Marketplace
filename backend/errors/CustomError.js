class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super();
        this.statusCode = statusCode;
    }
}

const createCustomAPIError = (message, statusCode) => {
    return new CustomAPIError(message, statusCode);
}

module.exports = {
    createCustomAPIError,
    CustomAPIError,
}
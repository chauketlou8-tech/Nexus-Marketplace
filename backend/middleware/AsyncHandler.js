const asyncHandler = (fn) => {
    return async () => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            console.error(error);
        }
    }
}

module.exports = asyncHandler;
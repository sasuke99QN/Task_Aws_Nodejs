module.exports = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            let {
                code: status,
                message
            } = appman.responseHttpStatus[422];
            if (error.details && Array.isArray(error.details)) {
                message = error.details.map(i => i.message).join(',');
            }
            res.status(status).json({
                error: {
                    code: status,
                    message
                }
            });
        }
    }
};
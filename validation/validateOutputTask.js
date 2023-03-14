
const Joi = require('joi');

const validateEditTask = Joi.object({
    task: Joi
        .string()
        .required(),
});
module.exports = {
    validateEditTask
};
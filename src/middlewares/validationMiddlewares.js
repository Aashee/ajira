const Joi = require('@hapi/joi');

// Helper functions
const responseHandler = require('../responseHandler');
const constants = require('../utils/constants');

module.exports = {
    // Validation Functions

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);

            if (result.error) {
                return res.status(400).json(responseHandler.handleJOIError(result.error, 400));
            } else {
                if (!req.value) { req.value = {}; }

                if (!req.value.body) { req.value.body = {}; }

                req.value.body = result.value;
                next();
            }
        };
    },

    schemas: {

        moveSchema: Joi.object().keys({
            direction: Joi.string().required().valid(constants.direction.up, constants.direction.down, constants.direction.right, constants.direction.left )
        }),

        updateEnvironmentSchema: Joi.object().keys({
            temperature: Joi.number(),
            storm: Joi.boolean()
        }),

        environmentConfigureSchema: Joi.object().keys({
            temperature: Joi.number().required(),
            humidity: Joi.number().required(),
            'solar-flare': Joi.boolean().required(),
            storm: Joi.boolean().required(),
            'area-map': Joi.array().items(
                Joi.array().items(Joi.string().valid(constants.terrain.dirt, constants.terrain.water, constants.terrain.rock, constants.terrain.sand))
            ).required()
        }),


    }
};

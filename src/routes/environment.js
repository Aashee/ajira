const express = require('express');
const router = express.Router();
const environmentController = require('../controllers/environment');
const {
    validateBody,
    schemas } = require('../middlewares/validationMiddlewares');

router.route('/')
    .patch(
        validateBody(schemas.updateEnvironmentSchema),
        environmentController.update);

router.route('/configure')
    .post(
        validateBody(schemas.environmentConfigureSchema),
        environmentController.configure);

module.exports = router;
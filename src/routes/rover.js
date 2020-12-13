const express = require('express');
const router = express.Router();
const roverController = require('../controllers/rover');

router.route('/move')
    .post(
        validateBody(schemas.moveSchema),
        roverController.move);

router.route('/configure')
    .post(
        roverController.configure);

router.route('/status')
    .get(roverController.status);

module.exports = router;

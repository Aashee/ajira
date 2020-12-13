const express = require('express');
const bodyParser = require('body-parser');
const responseHandler = require('./src/responseHandler');

/**
 * Get instance of app.
 */
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// validations
// const { checkToken } = require('./src/middlewares/validationMiddlewares');
// // validation middleware
// app.use(checkToken());

// routes
var environmentRouter = require('./src/routes/environment');
var roverRouter = require('./src/routes/rover');

// route middlewares
app.use('/api/environment', environmentRouter);
app.use('/api/rover', roverRouter);

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    err.message = 'Not found';
    next(err);
});

// error handlers
// development error handler (prints stacktraces)
app.use((err, req, res, next) => {
    console.log(err);
    if (err.status) {
        res.status(err.status);
        res.json(responseHandler.handleError(err.message || err.error, err.status));
    } else {
        res.status(500);
        res.json(responseHandler.handleError(err.message, 500)
        );
    }
});

/**
 * Read port from environment file if present.
 */
var port = 3000;

app.listen(port, () => console.log(`Rover app listening on port ${port}`));

module.exports = app;
